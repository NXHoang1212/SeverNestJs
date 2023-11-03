import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Promotion, PromotionDocument } from "../model/PromotionSchema";
import { PromotionRequest } from "../dto/Promotion.Request";
import { PromotionResponse } from "../dto/Promotion.Response";
import { generateQrCode } from "src/utils/QrCode";
import { CloudinaryUploader } from "src/middleware/upload/UploadMulter";

@Injectable()
export class PromotionAdminService {
    constructor(@InjectModel(Promotion.name)
    private readonly promotionModel: Model<PromotionDocument>) { }

    async createPromotion(request: PromotionRequest, file: Express.Multer.File): Promise<PromotionResponse> {
        try {
            const { UserId, Tilte, name, nameQR, description, price, start, end, status } = request;
            const qrCode = await generateQrCode(nameQR.toString());
            const image = await CloudinaryUploader.uploadPromotion(file.path);
            const promotion = new this.promotionModel({
                UserId, Tilte, name, nameQR, description, price, start, end, status, qrCode, image: image.url
            });
            const result = await promotion.save();
            const reponse: PromotionResponse = {
                status: true,
                message: 'Create Promotion Success',
                data: result
            }
            return reponse;
        } catch (error: any) {
            const reponse: PromotionResponse = {
                status: false,
                message: 'Create Promotion Fail',
                data: null
            }
            return reponse;
        }
    }

    async getPromotion(): Promise<PromotionResponse> {
        try {
            const result = await this.promotionModel.find();
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

    async deletePromotion(id: string): Promise<PromotionResponse> {
        try {
            const result = await this.promotionModel.findByIdAndDelete(id);
            const reponse: PromotionResponse = {
                status: true,
                message: 'Delete Promotion Success',
                data: result
            }
            return reponse;
        } catch (error: any) {
            const reponse: PromotionResponse = {
                status: false,
                message: 'Delete Promotion Fail',
                data: null
            }
            return reponse;
        }
    }


    async deletePromotionExpired(): Promise<PromotionResponse> {
        try {
            const result = await this.promotionModel.find({ end: { $lt: new Date() } });
            console.log("🚀 ~ file: Promotion.Admin.Service.ts:82 ~ PromotionAdminService ~ deletePromotionExpired ~ result:", result)
            if (result.length > 0) {
                result.forEach(async (element) => {
                    const id = element._id;
                    const deletePromotion = await this.deletePromotion(id);
                    console.log("🚀 ~ file: Promotion.Admin.Service.ts:86 ~ PromotionAdminService ~ deletePromotionExpired ~ deletePromotion", deletePromotion)
                });
                const reponse: PromotionResponse = {
                    status: true,
                    message: 'Delete Promotion Expired Success',
                    data: result
                }
                return reponse;
            } else {
                const reponse: PromotionResponse = {
                    status: false,
                    message: 'Delete Promotion Expired Fail',
                    data: null
                }
                return reponse;
            }
        } catch (error: any) {
            const reponse: PromotionResponse = {
                status: false,
                message: 'Delete Promotion Expired Fail',
                data: null
            }
            return reponse;
        }
    }
}

