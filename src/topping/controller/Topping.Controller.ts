import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { ToppingService } from "../service/Topping.Service";
import { AddToppingRequest } from "../dto/req/AddTopping.Request";
import { GetToppingRequest } from "../dto/req/GetTopping.Request";


@Controller('listTopping')
export class ToppingController {
    constructor(private readonly toppingService: ToppingService) { }

    //url: localhost:3000/listTopping
    @Get()
    async get(@Query() query: GetToppingRequest, @Res() res: Response) {
        try {
            const response = await this.toppingService.get(query);
            console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: http://localhost:3000/listTopping/create
    @Post('create')
    async create(@Body() body: AddToppingRequest, @Res() res: Response) {
        try {
            const response = await this.toppingService.create(body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }


    //url localhost:3000/listTopping/update/60f9b0b0b3b0b71f0c8f0b1f
    @Post('update/:id')
    async update(@Param('id') id: string, @Body() body: AddToppingRequest, @Res() res: Response) {
        try {
            const response = await this.toppingService.update(id, body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url locahost:3000/listTopping/delete/:id
    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.toppingService.delete(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:51 ~ ProductController ~ delete ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

