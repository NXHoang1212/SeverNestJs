import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { NoticationService } from '../service/Notication.Service';
import { NoticationRequest } from '../dto/Notication.Request';

@Controller('api/users/noties')
export class NoticationController {
  constructor(private readonly noticationService: NoticationService) {}

  @Post('CreateNotication')
  async createNotication(
    @Body() body: NoticationRequest,
    @Res() res: Response,
  ) {
    try {
      const response = await this.noticationService.createNotication(body);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('GetNotication/:id')
  async getNoticationById(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.noticationService.getNoticationById(id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('SendNotication')
  async sendNotication(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this.noticationService.sendNotificationFirebase(
        body,
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
