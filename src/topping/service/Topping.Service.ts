import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Topping, ToppingDocument } from "../model/Topping.Model";
import { AddToppingRequest } from "../dto/req/AddTopping.Request";
import { AddToppingResponse } from "../dto/res/AddTopping.Response";
import { GetToppingRequest } from "../dto/req/GetTopping.Request";
import { GetToppingResponse } from "../dto/res/GetTopping.Response";

@Injectable()
export class ToppingService {
    constructor(@InjectModel(Topping.name)
    private readonly toppingModel: Model<ToppingDocument>) { }

    //thêm mới 1 category
    async create(request: AddToppingRequest): Promise<AddToppingResponse> {
        try {
            const { name, price } = request;
            const newCategory = new this.toppingModel({
                name: name, price: price
            });
            const result = await newCategory.save();
            const reponseProduct: AddToppingResponse = {
                status: true,
                message: "Add category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddToppingResponse = {
                status: false,
                message: 'Add category fail',
                data: null,
            };
            return reponseProduct;
        }
    }

    //lấy ra tất cả category
    async get(queries: GetToppingRequest): Promise<GetToppingResponse> {
        try {
            const { name, price } = queries;
            let query = {};
            if (name) {
                query = { ...query, name: name };
            }
            if (price) {
                query = { ...query, price: price };
            }
            const result = await this.toppingModel.find(query);
            const reponseProduct: GetToppingResponse = {
                status: true,
                message: "Get category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: GetToppingResponse = {
                status: false,
                message: "Get category fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm cập nhật 
    async update(id: string, request: AddToppingRequest): Promise<AddToppingResponse> {
        try {
            const size = await this.toppingModel.findById(id);
            if (!size) {
                throw new Error('Size not found');
            }
            const { name, price } = request;
            //nếu có thì mới cập nhật lại còn không thì giữ nguyên
            size.name = name ? name : size.name;
            size.price = price ? price : size.price;
            const result = await size.save();
            const reponseSize: AddToppingResponse = {
                status: true,
                message: "Update category success",
                data: result,
            };
            return reponseSize;
        } catch (error: any) {
            const reponseProduct: AddToppingResponse = {
                status: false,
                message: "Update category fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm xóa
    async delete(id: string): Promise<AddToppingResponse> {
        try {
            const result = await this.toppingModel.findByIdAndDelete(id);
            const reponseProduct: AddToppingResponse = {
                status: true,
                message: "Delete category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddToppingResponse = {
                status: false,
                message: "Delete category fail",
                data: null,
            };
            return reponseProduct;
        }
    }
}

