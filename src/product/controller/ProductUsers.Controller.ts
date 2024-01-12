import { Controller, Get, Res, HttpStatus, Query, Param, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductService } from '../service/Product.Service';
import { GetProductRequest } from '../dto/req/GetProduct.Request';

@Controller('api/users/product')
export class ProductUserController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async get(@Query() query: GetProductRequest, @Res() res: Response) {
    try {
      const response = await this.productService.get(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.productService.detail(id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
