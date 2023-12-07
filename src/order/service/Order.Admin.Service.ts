import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "../model/OrderSchema";
import { OrderResponse } from "../dto/Order.Response";
import { OrderRequest } from "../dto/Order.Request";
import { EnumAdmin } from "src/utils/EnumAdmin";

@Injectable()
export class OrderAdminService {
    constructor(@InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>) { }

    async getOrderByStatus(): Promise<OrderResponse> {
        try {
            const order = await this.orderModel.find({ status: { $in: [EnumAdmin.CONFIRM, EnumAdmin.CANCEL] } }).populate('user', 'name mobile');
            const response: OrderResponse = {
                status: true,
                message: 'Get Order Success',
                data: order
            };
            return response;
        } catch (error: any) {
            const response: OrderResponse = {
                status: false,
                message: error.message,
                data: null,
            };

            return response;
        }
    }

    
}