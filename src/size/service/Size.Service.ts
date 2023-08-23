import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Size, SizeDocument } from "../model/Size.Model";
import { AddSizeRequest } from "../dto/req/AddSize.Request";
import { AddSizeResponse } from "../dto/res/AddSize.Response";
import { GetSizeRequest } from "../dto/req/GetSize.Request";
import { GetSizeResponse } from "../dto/res/GetSize.Response";

@Injectable()
export class SizeService {
    constructor(@InjectModel(Size.name)
    private readonly SizeModel: Model<SizeDocument>) { }

    //thêm mới 1 category
    async create(request: AddSizeRequest): Promise<AddSizeResponse> {
        try {
            const { name, price } = request;
            const newCategory = new this.SizeModel({
                name: name, price: price
            });
            const result = await newCategory.save();
            const reponseProduct: AddSizeResponse = {
                status: true,
                message: "Add category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddSizeResponse = {
                status: false,
                message: 'Add category fail',
                data: null,
            };
            return reponseProduct;
        }
    }

    //lấy ra tất cả category
    async get(queries: GetSizeRequest): Promise<GetSizeResponse> {
        try {
            const { name, price } = queries;
            let query = {};
            if (name) {
                query = { ...query, name: name };
            }
            if (price) {
                query = { ...query, price: price };
            }
            const result = await this.SizeModel.find(query);
            const reponseProduct: GetSizeResponse = {
                status: true,
                message: "Get category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: GetSizeResponse = {
                status: false,
                message: "Get category fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm cập nhật 
    async update(id: string, request: AddSizeRequest): Promise<AddSizeResponse> {
        try {
            const size = await this.SizeModel.findById(id);
            if (!size) {
                throw new Error('Size not found');
            }
            const { name, price } = request;
            //nếu có thì mới cập nhật lại còn không thì giữ nguyên
            size.name = name ? name : size.name;
            size.price = price ? price : size.price;
            const result = await size.save();
            const reponseSize: AddSizeResponse = {
                status: true,
                message: "Update category success",
                data: result,
            };
            return reponseSize;
        } catch (error: any) {
            const reponseProduct: AddSizeResponse = {
                status: false,
                message: "Update category fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm xóa
    async delete(id: string): Promise<AddSizeResponse> {
        try {
            const result = await this.SizeModel.findByIdAndDelete(id);
            const reponseProduct: AddSizeResponse = {
                status: true,
                message: "Delete category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddSizeResponse = {
                status: false,
                message: "Delete category fail",
                data: null,
            };
            return reponseProduct;
        }
    }
}

