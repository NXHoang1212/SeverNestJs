import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../model/ProductSchema";
import { GetProductRequest } from "../dto/req/GetRequestProduct";
import { GetProductRespon } from "../dto/res/GetResponProduct";
import { AddProductRequest } from "../dto/req/AddRequestProduct";
import { AddProductRespon } from "../dto/res/AddResponProduct";
import { UpdateProductRequest } from "../dto/req/UpdateRequestProduct";
import { UpdateProductRespon } from "../dto/res/UpdateResponProduct";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>) { }
    //hàm get trả về một mảng các đối tượng ProductEntity
    async get(queries: GetProductRequest): Promise<GetProductRespon> {
        try {
            const { name, price, image, description, category, quantity } = queries;
            let query = {};
            if (name) {
                query = { ...query, name: name };
            }
            if (price) {
                query = { ...query, price: price };
            }
            if (image) {
                query = { ...query, image: image };
            }
            if (description) {
                query = { ...query, description: description };
            }
            if (category) {
                query = { ...query, category: category };
            }
            if (quantity) {
                query = { ...query, quantity: quantity };
            }
            const result = await this.productModel.find(query);
            const reponseProduct: GetProductRespon = {
                status: true,
                message: "Get product success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            console.log("🚀 ~ file: ProductService.ts ~ line 48 ~ ProductService ~ get ~ error", error)
            const reponseProduct: GetProductRespon = {
                status: false,
                message: "Get product fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm create trả về một đối tượng ProductEntity
    async create(request: AddProductRequest): Promise<AddProductRespon> {
        try {
            const { name, price, image, description, category, quantity } = request;
            const product = new this.productModel({
                name: name,
                price: price,
                image: image,
                description: description,
                category: category,
                quantity: quantity,
            });
            const result = await product.save();
            const reponseProduct: AddProductRespon = {
                status: true,
                message: "Create product success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            console.log("🚀 ~ file: ProductService.ts ~ line 80 ~ ProductService ~ create ~ error", error)
            const reponseProduct: AddProductRespon = {
                status: false,
                message: "Create product fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm update trả về một đối tượng ProductEntity
    async update(id: string, request: UpdateProductRequest): Promise<UpdateProductRespon> {
        try {
            
        } catch (error: any) {
            
        }
    }
}