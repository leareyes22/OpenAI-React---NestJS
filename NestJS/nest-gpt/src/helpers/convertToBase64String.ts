import * as fs from 'fs';

export const convertToBase64 = (file: Express.Multer.File) => {
  const data = fs.readFileSync(file.path);
  const base64 = Buffer.from(data).toString('base64');

  return `data:image/${file.mimetype.split('/'[1])};base64,${base64}`;
};
