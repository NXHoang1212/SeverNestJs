import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../model/Category.Schema';
import { AddCategoryRequest } from '../dto/req/AddCatgory.Request';
import { AddCategoryRespon } from '../dto/res/AddCategory.Response';
import { GetCategoryRequest } from '../dto/req/GetCategory.Request';
import { GetCategoryRespon } from '../dto/res/GetCategory.Response';
import { CloudinaryUploader } from 'src/middleware/upload/UploadMulter';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(request: AddCategoryRequest): Promise<AddCategoryRespon> {
    try {
      const { name, image } = request;
      const newCategory = new this.categoryModel({
        name: name,
        image: image,
      });
      const result = await newCategory.save();
      const reponseProduct: AddCategoryRespon = {
        status: true,
        message: 'Add category success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: AddCategoryRespon = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  async get(queries: GetCategoryRequest): Promise<GetCategoryRespon> {
    try {
      const { name, image } = queries;
      let query = {};
      if (name) {
        query = { ...query, name: name };
      }
      if (image) {
        query = { ...query, image: image };
      }
      const result = await this.categoryModel.find(query);
      const data = result.map((item, index) => {
        return { ...item.toJSON(), index: index + 1 };
      });
      const reponseProduct: GetCategoryRespon = {
        status: true,
        message: 'Get category success',
        data: data,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: GetCategoryRespon = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  async getOne(id: string): Promise<GetCategoryRespon> {
    try {
      const result = await this.categoryModel.findById(id);
      const reponseProduct: GetCategoryRespon = {
        status: true,
        message: 'Get category success',
        data: [result],
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: GetCategoryRespon = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  async update(
    id: string,
    request: AddCategoryRequest,
    imageFile?: Express.Multer.File,
  ): Promise<AddCategoryRespon> {
    try {
      const uploadedImage = await CloudinaryUploader.uploadCategory(
        imageFile.path,
      );
      const { name } = request;
      if (uploadedImage) {
        const result = await this.categoryModel.findByIdAndUpdate(id, {
          name: name,
          image: uploadedImage.url,
        });
        const reponseProduct: AddCategoryRespon = {
          status: true,
          message: 'Update category success',
          data: result,
        };
        return reponseProduct;
      } else {
        const result = await this.categoryModel.findByIdAndUpdate(id, {
          name: name,
        });
        const reponseProduct: AddCategoryRespon = {
          status: true,
          message: 'Update category success',
          data: result,
        };
        return reponseProduct;
      }
    } catch (error: any) {
      const reponseProduct: AddCategoryRespon = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }

  async delete(id: string): Promise<AddCategoryRespon> {
    try {
      const result = await this.categoryModel.findByIdAndDelete(id);
      const reponseProduct: AddCategoryRespon = {
        status: true,
        message: 'Delete category success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: AddCategoryRespon = {
        status: false,
        message: error.message,
        data: null,
      };
      return reponseProduct;
    }
  }
}
