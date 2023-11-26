import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req, Render } from '@nestjs/common';
import { Response, Request } from "express";
import { OrderAdminService } from '../service/Order.Admin.Service';
import { OrderRequest } from '../dto/Order.Request';


@Controller('cpanel/admin')
export class OrderAdminController {
    constructor(private readonly orderAdminService: OrderAdminService) { }

    @Get('Order')
    @Render('web/ManagerOrder')
    async renderOrder(@Req() req: Request) {
        const response = await this.orderAdminService.getOrderByStatus();
        return { data: response.data, layout: 'web/ManagerOrder', };
    }

    // @Get('Order/GetOrder')
    // async getOrder(@Res() res: Response) {
    //     try {
    //         const response = await this.orderAdminService.getOrderByStatus();
    //         return res.status(HttpStatus.OK).json(response);
    //     } catch (error: any) {
    //         return res.status(HttpStatus.BAD_REQUEST).json(error);
    //     }
    // }
}

