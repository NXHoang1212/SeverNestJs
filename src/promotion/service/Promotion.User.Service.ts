import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Promotion, PromotionDocument } from "../model/PromotionSchema";
import { PromotionRequest } from "../dto/Promotion.Request";
import { PromotionResponse } from "../dto/Promotion.Response";


@Injectable()
export class PromotionUserService {
    constructor(@InjectModel(Promotion.name)
    private readonly promotionModel: Model<PromotionDocument>) { }

    async getPromotion(id: string): Promise<PromotionResponse> {
        try {
            const result = await this.promotionModel.findById(id);
            const reponse: PromotionResponse = {
                status: true,
                message: 'Get Promotion Success',
                data: result
            }
            return reponse;
        } catch (error: any) {
            const reponse: PromotionResponse = {
                status: false,
                message: 'Get Promotion Fail',
                data: null
            }
            return reponse;
        }
    }
}

