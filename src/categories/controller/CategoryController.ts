import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { CategoryService } from "../service/CategoryService";
import { AddCategoryRequest } from "../dto/req/AddCatgoryRequest";
import { GetCategoryRequest } from "../dto/req/GetCategoryRequest";


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

}

