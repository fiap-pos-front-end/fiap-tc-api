import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { basename, extname } from 'path';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private readonly client = new S3Client({ region: process.env.AWS_REGION });
  private readonly bucket = process.env.AWS_S3_BUCKET!;

  async uploadAttachment(
    transactionId: number,
    file: Express.Multer.File,
    index: number,
  ): Promise<string> {
    try {
      const extension = extname(file.originalname) || '';
      const key = `Attachments/${transactionId}/${index}${extension}`;
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return key;
    } catch (error) {
      throw new InternalServerErrorException(
        `Não foi possível fazer o upload do(s) arquivo(s)! ${error}`,
      );
    }
  }
  async getAttachments(attachment: string): Promise<any> {
    try {
      const res = await this.client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: attachment }),
      );
      const body = res.Body as Readable;
      const buffer = await this.streamToBuffer(body);

      return {
        filename: basename(attachment),
        contentType: res.ContentType ?? null,
        data: buffer.toString('base64'),
      };
    } catch {
      return {};
    }
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: any[] = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks);
  }
}
