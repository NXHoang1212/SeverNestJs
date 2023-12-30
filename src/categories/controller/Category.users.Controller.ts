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
  Req,
  Render,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CategoryService } from '../service/Category.Service';
import { AddCategoryRequest } from '../dto/req/AddCatgory.Request';
import { GetCategoryRequest } from '../dto/req/GetCategory.Request';

@Controller('api/users')
export class CategoryUserController {
  constructor(private readonly categorySerivce: CategoryService) {}

  @Get('GetCategory')
  async get(@Query() query: GetCategoryRequest, @Res() res: Response) {
    try {
      const response = await this.categorySerivce.get(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
