import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return new Promise<UploadApiErrorResponse | UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'zenlyft' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result as UploadApiResponse);
          },
        );

        uploadStream.end(file.buffer);
      },
    );
  }
}
