import { Controller, Post, Body, Res, HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { Response } from 'express';
import { CartSerivce } from '../service/Cart.Service';
import { AddCartRequest } from '../dto/req/AddCart.Request';
import { GetCartRequest } from '../dto/req/GetCart.Request';

@Controller('api/users/cart')
export class CartController {
  constructor(private readonly cartService: CartSerivce) { }

  @Post('create')
  async createCart(@Body() request: AddCartRequest, @Res() res: Response) {
    try {
      const result = await this.cartService.createCart(request);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('getCart/:id')
  async getCartId(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.cartService.getCartId(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('updateStatus/:UserId')
  async updateStatus(
    @Param('UserId') UserId: string,
    @Body() request: GetCartRequest,
    @Res() res: Response,
  ) {
    try {
      const result = await this.cartService.updateStatusProductInCart(
        UserId,
        request,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('detailCart/:id/:idProduct')
  async getDetailCart(
    @Param('id') id: string,
    @Param('idProduct') idProduct: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.cartService.getProductDetailInCart(
        id,
        idProduct,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('update/:id/:idProduct')
  async updateCart(
    @Param('id') id: string,
    @Param('idProduct') idProduct: string,
    @Body() request: AddCartRequest,
    @Res() res: Response,
  ) {
    try {
      const result = await this.cartService.updateProductInCart(
        id,
        idProduct,
        request,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('delete/:id/:idProduct')
  async deleteCart(
    @Param('id') id: string,
    @Param('idProduct') idProduct: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.cartService.deleteProductInCart(id, idProduct);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('deleteAll/:id')
  async deleteAllCart(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.cartService.deleteCart(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
