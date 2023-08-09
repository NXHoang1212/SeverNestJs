import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { CategoryService } from "../service/Category.Service";
import { AddCategoryRequest } from "../dto/req/AddCatgory.Request";
import { GetCategoryRequest } from "../dto/req/GetCategory.Request";


@Controller('list')
export class CategoryController {
    constructor(private readonly productService: CategoryService) { }

    //url: localhost:3000/list
    @Get()
    async get(@Query() query: GetCategoryRequest, @Res() res: Response) {
        try {
            const response = await this.productService.get(query);
            console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: http://localhost:3000/list/create
    @Post('create')
    async create(@Body() body: AddCategoryRequest, @Res() res: Response) {
        try {
            const response = await this.productService.create(body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }


    //url localhost:3000/list/update/60f9b0b0b3b0b71f0c8f0b1f
    @Post('update/:id')
    async update(@Param('id') id: string, @Body() body: AddCategoryRequest, @Res() res: Response) {
        try {
            const response = await this.productService.update(id, body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url locahost:3000/delete/:id
    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.productService.delete(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:51 ~ ProductController ~ delete ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

