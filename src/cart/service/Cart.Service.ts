import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "../model/Cart.Model";
import { AddCategoryRequest } from "../dto/req/AddCart.Request";
import { AddCategoryRespon } from "../dto/res/AddCart.Response";
import { GetCategoryRequest } from "../dto/req/GetCart.Request";
import { GetCategoryRespon } from "../dto/res/GetCart.Response";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name)
    private readonly productModel: Model<CategoryDocument>) { }
}

