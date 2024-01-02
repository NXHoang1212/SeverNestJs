import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddBannerRequest, GetBannerRequest } from '../dto/Banner.Request';
import { GetBannerResponse, AddBannerResponse } from '../dto/Banner.Response';
import { CloudinaryUploader } from 'src/middleware/upload/UploadMulter';
import { Banner, BannerDocument } from '../model/Banner.Schema';

@Injectable()
export class BannerAdminService {
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>,
  ) { }

  async create(request: AddBannerRequest, imageFile?: Express.Multer.File,): Promise<AddBannerResponse> {
    try {
      const { name } = request;
      const uploadedImage = await CloudinaryUploader.uploadBanner(imageFile.path);
      if (uploadedImage) {
        const banner = new this.bannerModel({
          name: name,
          image: uploadedImage.secure_url,
        });
        const result = await banner.save();
        const reponseBanner: AddBannerResponse = {
          status: true,
          message: 'Create banner success',
          data: result,
        };
        return reponseBanner;
      } else {
        const banner = new this.bannerModel({
          name: name,
        });
        const result = await banner.save();
        const reponseBanner: AddBannerResponse = {
          status: true,
          message: 'Create banner success',
          data: result,
        };
        return reponseBanner;
      }
    } catch (error: any) {
      const reponseBanner: AddBannerResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseBanner;
    }
  }

  async get(queries: GetBannerRequest): Promise<GetBannerResponse> {
    try {
      const { name, image } = queries;
      let query = {};
      if (name) {
        query = { ...query, name: name };
      }
      if (image) {
        query = { ...query, image: image };
      }
      const result = await this.bannerModel.find(query);
      const reponseBanner: GetBannerResponse = {
        status: true,
        message: 'Get banner success',
        data: result,
      };
      return reponseBanner;
    } catch (error: any) {
      const reponseBanner: GetBannerResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseBanner;
    }
  }

  async getOne(id: string): Promise<GetBannerResponse> {
    try {
      const result = await this.bannerModel.findById(id);
      const reponseBanner: GetBannerResponse = {
        status: true,
        message: 'Get banner success',
        data: [result],
      };
      return reponseBanner;
    } catch (error: any) {
      const reponseBanner: GetBannerResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseBanner;
    }
  }

  async update(id: string, request: AddBannerRequest, imageFile?: Express.Multer.File,): Promise<AddBannerResponse> {
    try {
      const { name } = request;
      const uploadedImage = await CloudinaryUploader.uploadBanner(imageFile.path);
      const banner = await this.bannerModel.findById(id);
      if (!banner) {
        throw new Error('Không tìm thấy hình ảnh');
      } else {
        if (uploadedImage) {
          banner.name = name ? name : banner.name;
          banner.image = uploadedImage.secure_url ? uploadedImage.secure_url : banner.image;
          const result = await banner.save();
          const reponseBanner: AddBannerResponse = {
            status: true,
            message: 'Update banner success',
            data: result,
          };
          return reponseBanner;
        } else {
          banner.name = name ? name : banner.name;
          const result = await banner.save();
          const reponseBanner: AddBannerResponse = {
            status: true,
            message: 'Update banner success',
            data: result,
          };
          return reponseBanner;
        }
      }
    } catch (error: any) {
      const reponseBanner: AddBannerResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseBanner;
    }
  }

  async delete(id: string): Promise<AddBannerResponse> {
    try {
      const result = await this.bannerModel.findByIdAndDelete(id);
      const reponseBanner: AddBannerResponse = {
        status: true,
        message: 'Delete banner success',
        data: result,
      };
      return reponseBanner;
    } catch (error: any) {
      const reponseBanner: AddBannerResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseBanner;
    }
  }
}
