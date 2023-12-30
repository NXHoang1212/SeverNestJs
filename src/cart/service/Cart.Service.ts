import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../model/Cart.Model';
import { AddCartRequest } from '../dto/req/AddCart.Request';
import { AddCartResponse } from '../dto/res/AddCart.Response';
import { GetCartRequest } from '../dto/req/GetCart.Request';
import { GetCartResponse } from '../dto/res/GetCart.Response';
import { Types } from 'mongoose';

@Injectable()
export class CartSerivce {
  constructor(
    @InjectModel(Cart.name)
    private readonly CartModel: Model<CartDocument>,
  ) {}

  async createCart(request: AddCartRequest): Promise<AddCartResponse> {
    try {
      const { UserId, ProductId } = request;
      const existingCart = await this.CartModel.findOne({ UserId });
      if (existingCart) {
        if (!Array.isArray(existingCart.ProductId)) {
          existingCart.ProductId = [existingCart.ProductId];
        }
        ProductId.forEach((product) => {
          existingCart.ProductId.push({
            _id: new Types.ObjectId(),
            ...product,
          });
        });

        const result = await existingCart.save();
        const response: AddCartResponse = {
          status: true,
          message: 'Add cart success',
          data: result,
        };
        return response;
      } else {
        const newCart = new this.CartModel({
          UserId: UserId,
          ProductId: ProductId.map((product) => ({
            _id: new Types.ObjectId(),
            ...product,
          })),
        });
        const result = await newCart.save();
        const response: AddCartResponse = {
          status: true,
          message: 'Add cart success',
          data: result,
        };
        return response;
      }
    } catch (error: any) {
      const response: AddCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async getCartId(id: string): Promise<GetCartResponse> {
    try {
      const result = await this.CartModel.findOne({ UserId: id })
        .populate('UserId', '_id name mobile')
        .populate({
          path: 'ProductId.ProductId',
          model: 'Product',
          populate: { path: 'category', select: '_id name' },
        });
      const response: GetCartResponse = {
        status: true,
        message: 'Get cart success',
        data: [result],
      };
      return response;
    } catch (error: any) {
      const response: GetCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async getProductDetailInCart(
    userId: string,
    productId: string,
  ): Promise<GetCartResponse> {
    try {
      const result = await this.CartModel.findOne({ UserId: userId });
      if (!result) {
        throw new Error('Cart not found');
      }
      const product = result.ProductId.find(
        (product) => product._id.toString() === productId,
      );
      if (!product) {
        throw new Error('Product not found');
      }
      const response: GetCartResponse = {
        status: true,
        message: 'Get product detail in cart success',
        data: [
          {
            UserId: result.UserId,
            ProductId: [product],
          },
        ],
      };
      return response;
    } catch (error: any) {
      const response: GetCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async updateProductInCart(
    userId: string,
    productIdToUpdate: string,
    updatedProductInfo: any,
  ): Promise<AddCartResponse> {
    try {
      const cart = await this.CartModel.findOne({ UserId: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      // Tìm sản phẩm cần cập nhật bằng productIdToUpdate
      const productIndex = cart.ProductId.findIndex(
        (product) => product._id.toString() === productIdToUpdate,
      );
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      const updatedProduct = {
        _id: productIdToUpdate,
        ...updatedProductInfo,
      };
      cart.ProductId[productIndex] = updatedProduct;
      const updatedCart = await cart.save();
      const response: AddCartResponse = {
        status: true,
        message: 'Update cart success',
        data: updatedCart,
      };
      return response;
    } catch (error: any) {
      const response: AddCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  // Tìm và cập nhật trạng thái cho tất cả các sản phẩm có trạng thái "Đã thêm vào giỏ hàng"
  async updateStatusProductInCart(
    userId: string,
    request: any,
  ): Promise<GetCartResponse> {
    try {
      const cart = await this.CartModel.findOne({ UserId: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      const updatedProduct = cart.ProductId.map((product) => {
        if (product.StatusProduct === 'Đã thêm vào giỏ hàng') {
          return {
            ...product,
            StatusProduct: 'Đơn hàng đã chuyển sang trạng thái đợi thanh toán',
          };
        }
        return product;
      });
      const updatedCart = await this.CartModel.findOneAndUpdate(
        { UserId: userId },
        { ProductId: updatedProduct },
        { new: true },
      );
      const response: GetCartResponse = {
        status: true,
        message: 'Update status product in cart success',
        data: [updatedCart],
      };
      return response;
    } catch (error: any) {
      const response: GetCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async deleteProductInCart(
    userId: string,
    productIdToDelete: string,
  ): Promise<AddCartResponse> {
    try {
      const cart = await this.CartModel.findOne({ UserId: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      // Tìm sản phẩm cần xóa bằng productIdToDelete
      const productIndex = cart.ProductId.findIndex(
        (product) => product._id.toString() === productIdToDelete,
      );
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      cart.ProductId.splice(productIndex, 1);
      const updatedCart = await cart.save();
      const response: AddCartResponse = {
        status: true,
        message: 'Delete cart success',
        data: updatedCart,
      };
      return response;
    } catch (error: any) {
      const response: AddCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async deleteCart(id: string): Promise<AddCartResponse> {
    try {
      const cart = await this.CartModel.findByIdAndDelete(id);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const response: AddCartResponse = {
        status: true,
        message: 'Delete cart success',
        data: null,
      };
      return response;
    } catch (error: any) {
      const response: AddCartResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }
}
