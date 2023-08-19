import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: 'dy6dehxix',
  api_key: '259595632546778',
  api_secret: 'O9tfHJyz5clrMAVBYNmY35XDb98',
});

app.post('/image', async (req: Request, res: Response) => {
  console.log(req.body.file);
  const result = await cloudinary.uploader.upload(
    req.body.file
  );

  console.log(123, result);
  res.status(200).json({
    url: result.url,
    name: result.original_filename,
  });
  res.status(200);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

