import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { SizeService } from "../service/Size.Service";
import { AddSizeRequest } from "../dto/req/AddSize.Request";
import { GetSizeRequest } from "../dto/req/GetSize.Request";


@Controller('listSize')
export class SizeController {
    constructor(private readonly SizeSerivce: SizeService) { }

    //url: localhost:3000/listSize
    @Get()
    async get(@Query() query: GetSizeRequest, @Res() res: Response) {
        try {
            const response = await this.SizeSerivce.get(query);
            console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: http://localhost:3000/listSize/create
    @Post('create')
    async create(@Body() body: AddSizeRequest, @Res() res: Response) {
        try {
            const response = await this.SizeSerivce.create(body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }


    //url localhost:3000/list/update/60f9b0b0b3b0b71f0c8f0b1f
    @Post('update/:id')
    async update(@Param('id') id: string, @Body() body: AddSizeRequest, @Res() res: Response) {
        try {
            const response = await this.SizeSerivce.update(id, body);
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
            const response = await this.SizeSerivce.delete(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:51 ~ ProductController ~ delete ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

