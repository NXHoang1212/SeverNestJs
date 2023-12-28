import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddBannerRequest, GetBannerRequest } from "../dto/Banner.Request";
import { GetBannerResponse, AddBannerResponse } from "../dto/Banner.Response";
import { CloudinaryUploader } from "src/middleware/upload/UploadMulter";
import { Banner, BannerDocument } from "../model/Banner.Schema";

@Injectable()
export class BannerUsersService {
    constructor(@InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>) { }

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
                message: "Get banner success",
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
}

