import * as path from 'path';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import * as sharp from 'sharp';

export const downloadImageAsPng = async (
  url: string,
  fullPath: boolean = false,
) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Download image was not possible.');
  }

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${v4()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());
  const completePath = path.join(folderPath, imageNamePng);

  await sharp(buffer).png().ensureAlpha().toFile(completePath);

  return fullPath ? completePath : imageNamePng;
};
