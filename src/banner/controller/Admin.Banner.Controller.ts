import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
  Render,
  Put,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { GetBannerRequest, AddBannerRequest } from '../dto/Banner.Request';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/middleware/upload/UploadMulter';
import { BannerAdminService } from '../service/Banner.Admin.Service';

@Controller('api/admin')
export class BannerAdminController {
  constructor(private readonly bannerAdminSerivce: BannerAdminService) {}

  @Get('Banner')
  async get(@Query() query: GetBannerRequest, @Res() res: Response) {
    try {
      const response = await this.bannerAdminSerivce.get(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('CreateBanner')
  @UseInterceptors(FileInterceptor('image', MulterConfig))
  async create(
    @Body() body: AddBannerRequest,
    @Res() res: Response,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    try {
      const response = await this.bannerAdminSerivce.create(body, imageFile);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Put('UpdateBaner/:id')
  @UseInterceptors(FileInterceptor('image', MulterConfig))
  async update(
    @Param('id') id: string,
    @Body() body: AddBannerRequest,
    @UploadedFile() imageFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const response = await this.bannerAdminSerivce.update(
        id,
        body,
        imageFile,
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('DeleteBanner/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.bannerAdminSerivce.delete(id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
