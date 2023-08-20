import {useState} from "react";
import FileUpload from "@/components/FileUpload";
import Layout from "@/components/Layout";

const TableHeadData = ({col}) => (
	<th
		className={"border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"}>
		{col}
	</th>
)

const TableBodyData = ({col}) => (
	<td className={"border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"}>
		{typeof col === 'boolean' ? String(col) : col}
	</td>
)


export default function Home() {
	const [processing, setProcessing] = useState(false)
	const [dataArr, setDataArr] = useState([])

	return (
		<Layout>
			<div>
				<FileUpload
					setProcessing={setProcessing}
					processing={processing}
					setDataArr={setDataArr}
				/>
				<div className={"mt-10"}>
					<table className={"border-collapse w-full text-sm"}>
						<thead>
						<tr>
							{dataArr.length > 0 &&
								dataArr[0].map((col, index) => (
									<TableHeadData col={col} key={index}/>
								))}
						</tr>
						</thead>
						<tbody className={"bg-white dark:bg-slate-800"}>
						{dataArr.slice(1).length > 0 &&
							dataArr.slice(1).map((row, index) => (
								<tr key={index}>
									{row.map((col, index) => (
										<TableBodyData col={col} key={index} />
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
}
