import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "../model/CategoryModel";
import { AddCategoryRequest } from "../dto/req/AddCatgoryRequest";
import { AddCategoryRespon } from "../dto/res/AddCategoryRespon";
import { GetCategoryRequest } from "../dto/req/GetCategoryRequest";
import { GetCategoryRespon } from "../dto/res/GetCategoryRespon";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name)
    private readonly productModel: Model<CategoryDocument>) { }

    //thêm mới 1 category
    async create(request: AddCategoryRequest): Promise<AddCategoryRespon> {
        try {
            const { name } = request;
            const newCategory = new this.productModel({
                name: name,
            });
            const result = await newCategory.save();
            const reponseProduct: AddCategoryRespon = {
                status: true,
                message: "Add category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddCategoryRespon = {
                status: false,
                message: 'Add category fail',
                data: null,
            };
            return reponseProduct;
        }
    }

    //lấy ra tất cả category
    async get(queries: GetCategoryRequest): Promise<GetCategoryRespon> {
        try {
            const { name } = queries;
            let query = {};
            if (name) {
                query = { ...query, name: name };
            }
            const result = await this.productModel.find(query);
            const reponseProduct: GetCategoryRespon = {
                status: true,
                message: "Get category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: GetCategoryRespon = {
                status: false,
                message: "Get category fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm cập nhật 
    async update(id: string, request: AddCategoryRequest): Promise<AddCategoryRespon> {
        try {
            const { name } = request;
            const result = await this.productModel.findByIdAndUpdate(id, {
                name: name,
            });
            const reponseProduct: AddCategoryRespon = {
                status: true,
                message: "Update category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddCategoryRespon = {
                status: false,
                message: "Update category fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm xóa
    async delete(id: string): Promise<AddCategoryRespon> {
        try {
            const result = await this.productModel.findByIdAndDelete(id);
            const reponseProduct: AddCategoryRespon = {
                status: true,
                message: "Delete category success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            const reponseProduct: AddCategoryRespon = {
                status: false,
                message: "Delete category fail",
                data: null,
            };
            return reponseProduct;
        }
    }
}

