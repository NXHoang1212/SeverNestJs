import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req, Render, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response, Request } from "express";
import { PromotionAdminService } from "../service/Promotion.Admin.Service";
import { PromotionRequest } from "../dto/Promotion.Request";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterConfig, storage } from '../../middleware/upload/UploadMulter';


@Controller('api/admin')
export class PromotionAdminController {
    constructor(private readonly promotionadminService: PromotionAdminService) { }

    @Get('discounts')
    async getPromotion(@Res() res: Response) {
        try {
            const response = await this.promotionadminService.getPromotion();
            response.data.forEach((element, index) => {
                element.index = index + 1;
            });
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('Promotion')
    @Render('web/FormAddPromotion')
    renderAddPromotion() {
        return {};
    }

    @Post('AddPromotion')
    @UseInterceptors(FileInterceptor('image', MulterConfig))
    async createPromotion(@Body() body: PromotionRequest, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            const response = await this.promotionadminService.createPromotion(body, file);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: Promotion.Admin.Controller.ts:44 ~ PromotionAdminController ~ createPromotion ~ error:", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Delete('deletePromotion/:id')
    async deletePromotion(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.promotionadminService.deletePromotion(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    
    @Delete('deletePromotionExpired')
    async deletePromotionExpired(@Res() res: Response) {
        try {
            const response = await this.promotionadminService.deletePromotionExpired();
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

