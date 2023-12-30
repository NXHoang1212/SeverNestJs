import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AddressService } from '../service/Address.Service';
import { AddRessRequest } from '../dto/req/AddRess.Request';

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('GetAddress/:id')
  async getAddress(@Param('id') id: string, @Res() res: Response) {
    const result = await this.addressService.getAddress(id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('create')
  async create(@Body() body: any, @Res() res: Response) {
    const result = await this.addressService.create(body);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.addressService.delete(id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: AddRessRequest,
    @Res() res: Response,
  ) {
    const result = await this.addressService.update(id, body);
    return res.status(HttpStatus.OK).json(result);
  }
}
