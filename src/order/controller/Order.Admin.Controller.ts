import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Put, Render, Req } from '@nestjs/common';
import { Response, Request } from "express";
import { OrderAdminService } from '../service/Order.Admin.Service';
import { OrderEntity } from '../entity/Order.Entity';


@Controller('api/admin')
export class OrderAdminController {
    constructor(private readonly orderAdminService: OrderAdminService) { }

    @Get('Order')
    @Render('web/ManagerOrder')
    async renderOrder(@Req() req: Request, @Res() res: Response) {
        try {
            const response = await this.orderAdminService.getOrderByStatus();
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}
