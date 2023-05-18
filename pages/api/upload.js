import multiparty from "multiparty";
import {PutObjectAclCommand, S3Client} from "@aws-sdk/client-s3";
const bucketName = "fofos-ecommerce"

export default async function handle(req, res) {
    const form = new multiparty.Form();
    const {fields, files} = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({fields,files});
    });
});

const client = new S3Client({
    region:"sa-east-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
});

for (const file of files.file) {
    await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: ""
    }));    
}

    return res.json("ok");
};

export const config = {
    api: {bodyParser: false},
};