import AWS from 'aws-sdk';
import fs from "fs";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const textract = new AWS.Textract();

const s3 = new AWS.S3();

export const s3Upload = async (bucket, file) => {
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: bucket,
    Key: file.name,
    Body: fileStream,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};


export default textract