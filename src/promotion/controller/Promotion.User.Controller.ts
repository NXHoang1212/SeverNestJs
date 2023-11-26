import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req, Render } from "@nestjs/common";
import { Response, Request } from "express";
import { PromotionUserService } from "../service/Promotion.User.Service";
import { PromotionRequest } from "../dto/Promotion.Request";


@Controller('api/users/discounts')
export class PromotionUserController {
    constructor(private readonly PromotionUserService: PromotionUserService) { }

    @Get('GetPromotion')
    async getPromotion(@Res() res: Response) {
        try {
            const response = await this.PromotionUserService.getPromotion();
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

