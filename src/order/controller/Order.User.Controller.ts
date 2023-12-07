import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Put } from '@nestjs/common';
import { Response, Request } from "express";
import { OrderUserService } from '../service/Order.User.Service';
import { OrderRequest } from '../dto/Order.Request';

@Controller('api/users/orders')
export class OrderUserController {
    constructor(private readonly orderUserService: OrderUserService) { }

    @Post('CreateOrder')
    async createOrder(@Body() body: OrderRequest, @Res() res: Response) {
        try {
            const response = await this.orderUserService.createOrder(body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('GetOrder/:id')
    async getOrderById(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.orderUserService.getOrderById(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('GetAllOrderUser/:id')
    async getAllOrder(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.orderUserService.getOrderUser(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Put('UpdateOrder/:id')
    async updateOrder(@Param('id') id: string, @Body() body: OrderRequest, @Res() res: Response) {
        try {
            const response = await this.orderUserService.updateOrder(id, body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Put('confirm/:id')
    async confirmOrder(@Param('id') id: string, @Body() body: OrderRequest, @Res() res: Response) {
        try {
            const response = await this.orderUserService.confirmPayment(id, body);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

