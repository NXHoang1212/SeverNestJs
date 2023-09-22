import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../model/Product.Schema";
import { GetProductRequest } from "../dto/req/GetProduct.Request";
import { GetProductResponse } from "../dto/res/GetProduct.Response";
import { AddProductRequest } from "../dto/req/AddProduct.Request";
import { AddProductResponse } from "../dto/res/AddProduct.Response";
import { UpdateProductRequest } from "../dto/req/UpdateProduct.Request";
import { UpdateProductResponse } from "../dto/res/UpdateProduct.Response";
import { DeleteProductResponse } from "../dto/res/DeleteProduct.Response";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>) { }

    async get(queries: GetProductRequest): Promise<GetProductResponse> {
        try {
            const { name, price, image, category } = queries;
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
            if (category) {
                query = { ...query, category: category };
            }
            const result = await this.productModel.find(query).populate('category', '_id name');
            const reponseProduct: GetProductResponse = {
                status: true,
                message: "Get product success",
                data: result,
            };
            return reponseProduct;
        } catch (error: any) {
            console.log("🚀 ~ file: ProductService.ts ~ line 48 ~ ProductService ~ get ~ error", error)
            const reponseProduct: GetProductResponse = {
                status: false,
                message: "Get product fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm create trả về một đối tượng ProductEntity
    async create(request: AddProductRequest, image: String): Promise<AddProductResponse> {
        try {
            const { name, price, description, category, size, topping } = request;
            const product = new this.productModel({
                name: name,
                price: price,
                description: description,
                image: image, // Sử dụng URL hình ảnh từ Cloudinary
                category: category,
                size: size,
                topping: topping
            });
            const result = await product.save();
            const responseProduct: AddProductResponse = {
                status: true,
                message: "Create product success",
                data: result,
            };
            console.log("🚀 ~ file: ProductService.ts ~ line 80 ~ ProductService ~ create ~ responseProduct", responseProduct);
            return responseProduct;
        } catch (error: any) {
            console.log("Error while creating product:", error);
            const responseProduct: AddProductResponse = {
                status: false,
                message: "Create product fail",
                data: null,
            };
            return responseProduct;
        }
    }


    //hàm detail trả về một đối tượng ProductEntity
    async detail(id: String): Promise<GetProductResponse> {
        try {
            const product = await this.productModel.findById(id).populate('category', '_id name');
            if (!product) {
                throw new Error("Product not found");
            }
            const reponseProduct: GetProductResponse = {
                status: true,
                message: "Get product success",
                //data là một mảng các đối tượng ProductEntity nên ta phải truyền vào một mảng
                data: [product]
            };
            console.log("🚀 ~ file: ProductService.ts ~ line 101 ~ ProductService ~ detail ~ reponseProduct", reponseProduct)
            return reponseProduct;
        } catch (error: any) {
            console.log("🚀 ~ file: ProductService.ts ~ line 105 ~ ProductService ~ detail ~ error", error)
            const reponseProduct: GetProductResponse = {
                status: false,
                message: "Get product fail",
                data: null,
            };
            return reponseProduct;
        }
    }

    //hàm update trả về một đối tượng ProductEntity
    async update(id: String, request: UpdateProductRequest, image: string): Promise<UpdateProductResponse> {
        try {
            const { name, price, description, category, size, topping } = request;
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new Error("Product not found");
            }
            // Cập nhật mảng size bên trong mảng
            if (Array.isArray(size) && size.length > 0) {
                size.forEach((item, index) => {
                    product.size[index] = {
                        ...product.size[index],
                        ...item
                    };
                });
            }
            // Cập nhật mảng topping bên trong mảng
            if (Array.isArray(topping) && topping.length > 0) {
                topping.forEach((item, index) => {
                    product.topping[index] = {
                        ...product.topping[index],
                        ...item
                    };
                });
            }
            // Các trường khác vẫn được cập nhật như trước
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            product.description = description ? description : product.description;
            product.image = image ? image : product.image;
            product.category = category ? category : product.category;
            const result = await product.save();
            const responseProduct: UpdateProductResponse = {
                status: true,
                message: "Update product success",
                data: result,
            };
            return responseProduct;
        } catch (error: any) {
            console.log("Error:", error);
            const responseProduct: UpdateProductResponse = {
                status: false,
                message: "Update product fail",
                data: null,
            };
            return responseProduct;
        }
    }

    //hàm delete trả về một đối tượng ProductEntity
    async delete(id: String): Promise<DeleteProductResponse> {
        try {
            const product = await this.productModel.findByIdAndDelete(id);
            if (!product) {
                throw new Error("Product not found");
            };
            const reponseProduct: DeleteProductResponse = {
                status: true,
                message: "Delete product success",
                data: product,
            };
            return reponseProduct;
        } catch (error: any) {
            console.log("🚀 ~ file: ProductService.ts ~ line 148 ~ ProductService ~ delete ~ error", error)
            const reponseProduct: DeleteProductResponse = {
                status: false,
                message: "Delete product fail",
                data: null,
            };
            return reponseProduct;
        }
    }
}