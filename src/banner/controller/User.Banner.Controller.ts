import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { GetBannerRequest, AddBannerRequest } from '../dto/Banner.Request';
import { BannerUsersService } from '../service/Banner.Users.Service';

@Controller('api/users')
export class BannerUsersController {
  constructor(private readonly bannerAdminSerivce: BannerUsersService) {}

  @Get('GetBanner')
  async get(@Query() query: GetBannerRequest, @Res() res: Response) {
    try {
      const response = await this.bannerAdminSerivce.get(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
