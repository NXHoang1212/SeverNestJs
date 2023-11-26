import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "../model/OrderSchema";
import { OrderResponse } from "../dto/Order.Response";
import { OrderRequest } from "../dto/Order.Request";
import { GenerateTransactionId } from "src/utils/TransactionId";

@Injectable()
export class OrderUserService {
    constructor(@InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>) { }

    async createOrder(request: OrderRequest): Promise<OrderResponse> {
        const { OrderCart, user, address, note, promo, date, payment, status, TransactionId, statusPayment } = request;
        const transactionId = GenerateTransactionId();
        try {
            const newOrder = new this.orderModel({
                OrderCart: OrderCart,
                user: user,
                address: address,
                note: note,
                promo: promo,
                date: date,
                payment: payment,
                TransactionId: transactionId,
                status: status,
                statusPayment: statusPayment
            });
            const result = await newOrder.save();
            const response: OrderResponse = {
                status: true,
                message: 'Create Order Success',
                data: result
            }
            return response;
        } catch (error: any) {
            const response: OrderResponse = {
                status: false,
                message: error.message,
                data: null
            }
            return response;
        }
    }

    async getOrderById(id: string): Promise<OrderResponse> {
        try {
            const order = await this.orderModel.findById(id).populate('user', 'name mobile');
            const response: OrderResponse = {
                status: true,
                message: 'Get Order Success',
                data: [order]
            };
            return response;
        } catch (error: any) {
            const response: OrderResponse = {
                status: false,
                message: 'Get Order Fail',
                data: null,
            };
            return response;
        }
    }

    async getOrderUser(userId: string): Promise<OrderResponse> {
        try {
            const order = await this.orderModel.find({ user: userId }).populate('user', 'name mobile');
            const response: OrderResponse = {
                status: true,
                message: 'Get Order Success',
                data: order
            };
            return response;
        } catch (error: any) {
            const response: OrderResponse = {
                status: false,
                message: 'Get Order Fail',
                data: null,
            };
            return response;
        }
    }

    async updateOrder(orderId: string, body: OrderRequest): Promise<OrderResponse> {
        try {
            const order = await this.orderModel.findById(orderId);
            order.status = body.status;
            order.reason = body.reason;
            order.date = body.date;
            await order.save();
            const response: OrderResponse = {
                status: true,
                message: 'Update Order Success',
                data: order
            }
            return response;
        } catch (error: any) {
            const response: OrderResponse = {
                status: false,
                message: error.message,
                data: null
            }
            return response;
        }
    }
}

