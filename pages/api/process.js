import formidable from 'formidable-serverless';
import textract, {s3Upload} from "@/aws-services";
import Visitor from "@/models/visitor";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	// 1. check if method is a POST call
	if (req.method === 'POST') {
		try {
			// 2. parse the form
			const form = new formidable.IncomingForm();
			form.parse(req, async (err, fields, files) => {
				if (err) {
					console.error('Error parsing form:', err);
					return res.status(500).json({error: 'Error parsing form'});
				}

				const file = files.file;

				// Check if the file object exists
				if (!file) {
					return res.status(400).json({error: 'No file uploaded'});
				}

				// Check if the necessary file properties are available
				if (!file.name || !file.path || !file.type) {
					return res.status(400).json({error: 'Invalid file data'});
				}

				// 4. upload the file to s3
				let data = await s3Upload(process.env.S3_BUCKET, file)

				// 5. Prepare the params for the Textract service
				const params = {
					Document: {
						S3Object: {
							Bucket: data.Bucket,
							Name: data.Key,
						}
					},
					FeatureTypes: ["TABLES", "SIGNATURES"],  // we need to identify tables and signatures
				}

				// analyze the document
				const response = await textract.analyzeDocument(params).promise()

				// process the document to identify the cells and words
				const processedData = processTextractResponse(response)

				// build rows of data
				const tableData = prepareData(processedData)

				// prepare data for inserting into database
				const visitors = prepareDataToInsert(tableData)

				// bulk insert to table
				await Visitor.bulkCreate(visitors)

				// return the data
				return res.status(200).json({tableData})
			});
		} catch (error) {
			console.error('Error:', error.message);
			res.status(500).json({message: error.message});
		}
	} else {
		// method not allowed
		res.status(405).json({error: 'Method not allowed'});
	}
}

const processTextractResponse = (response) => {
	const blocks = response.Blocks

	let maxRow = 0
	let maxCol = 0

	const cellsData = {}
	const wordsData = {}
	const signData = []

	blocks.forEach(block => {

		// identify all the BlockType of CELL and put in the cellsData object
		if (block.BlockType === "CELL" && block.Relationships) {
			const row = block.RowIndex
			const col = block.ColumnIndex

			const key = `${row}${col}`  // each key is a concatenation of row and column indices
			cellsData[key] = block.Relationships[0].Ids  // each value is an array of ids of words in that cell

			maxRow = row > maxRow ? row : maxRow
			maxCol = col > maxCol ? col : maxCol
		}

		// identify all the BlockType of WORD and put in the wordsData object
		if (block.BlockType === "WORD") {
			wordsData[block.Id] = block.Text
		}

		// identify all the BlockType of SIGNATURE and push in the signData Array
		if (block.BlockType === "SIGNATURE") {
			signData.push(block.Id)
		}

	})

	return {
		maxRow,
		maxCol,
		cellsData,
		wordsData,
		signData,
	}
}


const prepareData = ({maxRow, maxCol, cellsData, wordsData, signData}) => {
	// prepare a multidimensional array, with each item an array of each row data
	let rows = []
	for (let i = 1; i < maxRow + 1; i++) {
		let cols = []
		for (let j = 1; j < maxCol + 1; j++) {
			const key = `${i}${j}`  // prepare key to extract value from cellsData
			const cellDataIds = cellsData[key]

			// check if any of the cellDataIds are in signData, then return true
			const isCellASign = cellDataIds.some(id => signData.includes(id))

			if (isCellASign) {
				cols[j - 1] = true
			} else {
				cols[j - 1] = cellDataIds.map(id => wordsData[id]).join(" ")
			}
		}
		rows.push(cols)
	}
	return rows
}

const prepareDataToInsert = (data) => {
	const [_, ...rows] = data;
	const tableKeys = ["sno", "name", "idNo", "phone", "inTime", "outTime", "sign"]

	return rows.map(row =>
		Object.fromEntries(
			row.map((value, index) => [tableKeys[index], value])
		)
	);

}