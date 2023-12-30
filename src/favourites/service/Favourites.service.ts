import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavouritesDocument, Favourites } from '../model/Favourites.Model';
import { FavouritesRequest } from '../dto/Favourites.Request';
import { FavouritesResponse } from '../dto/Favourites.Response';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(Favourites.name)
    private readonly favouritesModel: Model<FavouritesDocument>,
  ) {}

  async createFavourites(
    request: FavouritesRequest,
  ): Promise<FavouritesResponse> {
    try {
      const { UserId, ProductId, status } = request;
      const newFavourites = new this.favouritesModel({
        UserId: UserId,
        ProductId: ProductId,
        status: status,
      });
      const result = await newFavourites.save();
      const reponseFavourites: FavouritesResponse = {
        message: 'Add favourites success',
        data: result,
      };
      return reponseFavourites;
    } catch (error: any) {
      const reponseFavourites: FavouritesResponse = {
        message: 'Add favourites fail',
        data: null,
      };
      return reponseFavourites;
    }
  }

  async getFavourites(id: string): Promise<FavouritesResponse> {
    try {
      const result = await this.favouritesModel
        .find({ UserId: id })
        .populate('UserId', '_id name mboile')
        .populate(
          'ProductId',
          '_id name price image description category size topping',
        );
      const reponseFavourites: FavouritesResponse = {
        message: 'Get favourites success',
        data: result,
      };
      return reponseFavourites;
    } catch (error: any) {
      const reponseFavourites: FavouritesResponse = {
        message: 'Get favourites fail',
        data: null,
      };
      return reponseFavourites;
    }
  }

  async deleteFavourites(id: string): Promise<FavouritesResponse> {
    try {
      const result = await this.favouritesModel.findOneAndDelete({
        ProductId: id,
      });
      const reponseFavourites: FavouritesResponse = {
        message: 'Delete favourites success',
        data: result,
      };
      return reponseFavourites;
    } catch (error: any) {
      const reponseFavourites: FavouritesResponse = {
        message: 'Delete favourites fail',
        data: null,
      };
      return reponseFavourites;
    }
  }
}
