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

  uploadJpgFile(file: fileDto): Promise<string> {
    const contentType = 'image/jpeg';
    const extension = '.jpeg';

    return this.uploadS3File(file, contentType, extension);
  }

  async uploadPdfFile(file: fileDto): Promise<string> {
    const contentType = 'application/pdf';
    const extension = '.pdf';

    return this.uploadS3File(file, contentType, extension);
  }

  async uploadS3File(
    file: fileDto,
    contentType: string,
    extension: string,
  ): Promise<string> {
    const { file_name, buffer } = file;

    const command = new PutObjectCommand({
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: `${file_name}${extension}`,
      Body: buffer.buffer,
      ContentType: contentType,
    });

    await this.s3Client.send(command);

    return `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${this.configService.get<string>('AWS_BUCKET_NAME')}/${file_name}${extension}`;
  }
}
