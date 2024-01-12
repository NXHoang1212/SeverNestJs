import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../model/Product.Schema';
import { GetProductRequest } from '../dto/req/GetProduct.Request';
import { GetProductResponse } from '../dto/res/GetProduct.Response';
import { AddProductRequest } from '../dto/req/AddProduct.Request';
import { AddProductResponse } from '../dto/res/AddProduct.Response';
import { UpdateProductRequest } from '../dto/req/UpdateProduct.Request';
import { UpdateProductResponse } from '../dto/res/UpdateProduct.Response';
import { DeleteProductResponse } from '../dto/res/DeleteProduct.Response';
import { ProductGateway } from 'src/event/Event.gateway';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly productGateway: ProductGateway,
  ) { }

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
      const result = await this.productModel
        .find(query)
        .populate('category', '_id name image')
      const reponseProduct: GetProductResponse = {
        status: true,
        message: 'Get product success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: GetProductResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  async create(request: AddProductRequest, image: string): Promise<AddProductResponse> {
    try {
      const { name, price, description, category, size, topping } = request;
      const product = new this.productModel({
        name: name,
        price: price,
        description: description,
        image: image,
        category: category,
        size: size,
        topping: topping,
      });
      const result = await product.save();
      const responseProduct: AddProductResponse = {
        status: true,
        message: 'Create product success',
        data: result,
      };
      return responseProduct;
    } catch (error: any) {
      const responseProduct: AddProductResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return responseProduct;
    }
  }

  async detail(id: string): Promise<GetProductResponse> {
    try {
      const product = await this.productModel
        .findById(id)
        .populate('category', '_id name image');
      if (!product) {
        throw new Error('Product not found');
      }
      const reponseProduct: GetProductResponse = {
        status: true,
        message: 'Get product success',
        data: [product],
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: GetProductResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  async update(id: string, request: UpdateProductRequest, image: string,): Promise<UpdateProductResponse> {
    try {
      const { name, price, description, category, size, topping } = request;
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      if (Array.isArray(size) && size.length > 0) {
        size.forEach((item, index) => {
          product.size[index] = {
            ...product.size[index],
            ...item,
          };
        });
      }
      if (Array.isArray(topping) && topping.length > 0) {
        topping.forEach((item, index) => {
          product.topping[index] = {
            ...product.topping[index],
            ...item,
          };
        });
      }
      product.name = name ? name : product.name;
      product.price = price ? price : product.price;
      product.description = description ? description : product.description;
      product.image = image ? image : product.image;
      product.category = category ? category : product.category;
      const result = await product.save();
      const responseProduct: UpdateProductResponse = {
        status: true,
        message: 'Update product success',
        data: result,
      };
      return responseProduct;
    } catch (error: any) {
      const responseProduct: UpdateProductResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return responseProduct;
    }
  }

  async delete(id: string): Promise<DeleteProductResponse> {
    try {
      const product = await this.productModel.findByIdAndDelete(id);
      if (!product) {
        throw new Error('Product not found');
      }
      const reponseProduct: DeleteProductResponse = {
        status: true,
        message: 'Delete product success',
        data: product,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: DeleteProductResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  // async getRealtimeProduct() {
  //   try {
  //     const products = await this.productModel.find().populate('category', '_id name image');
  //     this.productGateway.sendProductUpdate(products);
  //     console.log('🚀 ~ file: Product.Service.ts ~ line 217 ~ ProductService ~ getRealtimeProduct ~ products', products);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // }
}
