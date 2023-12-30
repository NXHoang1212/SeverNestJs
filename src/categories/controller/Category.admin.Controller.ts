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
import { CategoryService } from '../service/Category.Service';
import { AddCategoryRequest } from '../dto/req/AddCatgory.Request';
import { GetCategoryRequest } from '../dto/req/GetCategory.Request';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/middleware/upload/UploadMulter';

@Controller('api/admin')
export class CategoryAdminController {
  constructor(private readonly categorySerivce: CategoryService) {}

  @Get('Category')
  async get(@Query() query: GetCategoryRequest, @Res() res: Response) {
    try {
      const response = await this.categorySerivce.get(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('CreateCategory')
  async create(@Body() body: AddCategoryRequest, @Res() res: Response) {
    try {
      const response = await this.categorySerivce.create(body);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Put('updateCategory/:id')
  @UseInterceptors(FileInterceptor('image', MulterConfig))
  async update(
    @Param('id') id: string,
    @Body() body: AddCategoryRequest,
    @UploadedFile() imageFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const response = await this.categorySerivce.update(id, body, imageFile);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('deleteCategory/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.categorySerivce.delete(id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
