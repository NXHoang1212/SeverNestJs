import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart, CartDocument } from "../model/Cart.Model";
import { AddCartRequest } from "../dto/req/AddCart.Request";
import { AddCartResponse } from "../dto/res/AddCart.Response";
import { GetCartRequest } from "../dto/req/GetCart.Request";
import { GetCartResponse } from "../dto/res/GetCart.Response";

@Injectable()
export class CartSerivce {
    constructor(@InjectModel(Cart.name)
    private readonly CartModel: Model<CartDocument>) { }

    async createCart(request: AddCartRequest): Promise<AddCartResponse> {
        try {
            const { NameProduct, PriceProduct, SizeProduct, ToppingProduct, QuantityProduct, NoteProduct, AmountShipping, UserId } = request;
            const cart = new this.CartModel({
                NameProduct: NameProduct,
                PriceProduct: PriceProduct,
                SizeProduct: SizeProduct,
                ToppingProduct: ToppingProduct,
                QuantityProduct: QuantityProduct,
                NoteProduct: NoteProduct,
                AmountShipping: AmountShipping,
                UserId: UserId,
            });
            const result = await cart.save();
            const responseCart: AddCartResponse = {
                status: true,
                message: "Create cart success",
                data: result,
            };
            return responseCart;
        } catch (error: any) {
            console.log("🚀 ~ file: Cart.Service.ts ~ line 48 ~ CartSerivce ~ createCart ~ error", error)
            const responseCart: AddCartResponse = {
                status: false,
                message: "Create cart fail",
                data: null,
            };
            return responseCart;
        }
    }

    async getCartId(id: string): Promise<GetCartResponse> {
        try {
            const result = await this.CartModel.find({ UserId: id })
            const responseCart: GetCartResponse = {
                status: true,
                message: "Get cart success",
                data: result,
            };
            return responseCart;
        } catch (error: any) {
            const responseCart: GetCartResponse = {
                status: false,
                message: "Get cart fail",
                data: null,
            };
            return responseCart;
        }
    }

    async updateCart(id: string, request: AddCartRequest): Promise<AddCartResponse> {
        try {
            const { NameProduct, PriceProduct, SizeProduct, ToppingProduct, QuantityProduct, NoteProduct, AmountShipping, UserId } = request;
            const cart = new this.CartModel({
                NameProduct: NameProduct,
                PriceProduct: PriceProduct,
                SizeProduct: SizeProduct,
                ToppingProduct: ToppingProduct,
                QuantityProduct: QuantityProduct,
                NoteProduct: NoteProduct,
                AmountShipping: AmountShipping,
                UserId: UserId,
            });
            const result = this.CartModel.findByIdAndUpdate(id, cart);
            const responseCart: AddCartResponse = {
                status: true,
                message: "Update cart success",
                data: result,
            };
            return responseCart;
        } catch (error: any) {

        }
    }

    async deleteCart(id: string): Promise<AddCartResponse> {
        try {
            const result = await this.CartModel.findByIdAndDelete(id);
            const responseCart: AddCartResponse = {
                status: true,
                message: "Delete cart success",
                data: result,
            };
            return responseCart;
        } catch (error: any) {
            const responseCart: AddCartResponse = {
                status: false,
                message: "Delete cart fail",
                data: null,
            };
            return responseCart;
        }
    }

}