import { Controller, Post, Body, Res, HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { Response, Request } from 'express';
import { FavouritesService } from '../service/Favourites.service';
import { FavouritesRequest } from '../dto/Favourites.Request';

@Controller('api/users/favourites')
export class FavouritesController {
  constructor(private readonly favouriteService: FavouritesService) { }

  @Post('/create')
  async createFavourites(
    @Body() request: FavouritesRequest,
    @Res() res: Response,
  ) {
    try {
      const result = await this.favouriteService.createFavourites(request);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('/get/:id')
  async getFavourites(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.favouriteService.getFavourites(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('/delete/:id')
  async deleteFavourites(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.favouriteService.deleteFavourites(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
