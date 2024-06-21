import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fileDto } from './dto/file.dto';

@Injectable()
export class S3Service {
  constructor(
    private readonly configService: ConfigService,
    private readonly s3Client: S3Client,
  ) {
    s3Client = new S3Client({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadPdfFile(file: fileDto) {
    const { file_name: name, buffer } = file;
    const uploadParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: file.file_name,
      Body: file.buffer,
    };
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: file.file_name,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: `image/pdf`,
    });

    await this.s3Client.send(command);

    return `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${this.configService.get<string>('AWS_BUCKET_NAME')}/${name}`;
  }
}
