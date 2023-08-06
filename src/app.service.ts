import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() { }
  getHello(): string {
    return 'Hello World!';
  }
  // async uploadImageToCloudinary(file: Express.Multer.File) {
  //   return await this.cloudinary.uploadImage(file).catch(() => {
  //     console.log('Invalid image file');
  //     throw new BadRequestException('Invalid image file');
  //   });
  // }
}
