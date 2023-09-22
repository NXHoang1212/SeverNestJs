import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response } from "express";
import { CartSerivce } from "../service/Cart.Service";
import { AddCartRequest } from "../dto/req/AddCart.Request";
import { GetCartRequest } from "../dto/req/GetCart.Request";


@Controller('api/cart')
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

    @Get('getCard/:id')
    async getCartId(@Param('id') id: string, @Body() request: GetCartRequest, @Res() res: Response) {
        try {
            const result = await this.cartService.getCartId(id);
            return res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('UpdateCart/:id')
    async updateCart(@Param('id') id: string, @Body() request: AddCartRequest, @Res() res: Response) {
        try {
            const result = await this.cartService.updateCart(id, request);
            return res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

