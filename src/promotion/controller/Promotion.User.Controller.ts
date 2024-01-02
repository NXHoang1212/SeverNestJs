import { Controller, Get, HttpStatus, Res, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { PromotionUserService } from '../service/Promotion.User.Service';

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
