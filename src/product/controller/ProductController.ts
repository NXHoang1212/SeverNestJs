import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query } from "@nestjs/common";
import { Response, Request } from "express";
import { ProductService } from "../service/ProductService";
import { GetProductRespon } from "../dto/res/GetResponProduct";
import { GetProductRequest } from "../dto/req/GetRequestProduct";
import { AddProductRequest } from "../dto/req/AddRequestProduct";



@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    //url: localhost:3000/product
    @Get()
    async get(@Query() query: GetProductRequest, @Res() res: Response) {
        try {
            const response = await this.productService.get(query);
            console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    //url: localhost:3000/product/create
    @Post('create')
    async create(@Body() body: AddProductRequest, @Res() res: Response) {
        try {
            const response = await this.productService.create(body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/update/:id
    @Post('update/:id')
    async update(@Param('id') id: string, @Body() body: AddProductRequest, @Res() res: Response) {
        try {
            const response = await this.productService.update(id, body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}
