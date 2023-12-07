import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Put, Render, Req } from '@nestjs/common';
import { Response, Request } from "express";
import { OrderAdminService } from '../service/Order.Admin.Service';
import { OrderEntity } from '../entity/Order.Entity';


@Controller('cpanel/admin')
export class OrderAdminController {
    constructor(private readonly orderAdminService: OrderAdminService) { }

    @Get('Order')
    @Render('web/ManagerOrder')
    async renderOrder(@Req() req: Request, @Res() res: Response) {
        const response = await this.orderAdminService.getOrderByStatus();
        const total = response.data.map((item) =>
            item.OrderCart.reduce((acc, product) => acc + product.PriceProduct * product.QuantityProduct, 0)
        );
        const totalQuantity = response.data.map((item) =>
            item.OrderCart.reduce((acc, product) => acc + product.QuantityProduct, 0)
        );

       return {
            data: response.data,
            total: total,
            totalQuantity: totalQuantity,
            layout: 'web/ManagerOrder',
        };
        // return {
        //     data: orderWithTotals,
        //     layout: 'web/ManagerOrder',
        // };
    }

}
