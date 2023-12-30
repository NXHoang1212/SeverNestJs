import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './Cloudinary.provider';
import { CloudinaryService } from './Cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
