import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { CategoryService } from "../service/Cart.Service";
import { AddCategoryRequest } from "../dto/req/AddCart.Request";
import { GetCategoryRequest } from "../dto/req/GetCart.Request";


@Controller('list')
export class CategoryController {
    constructor(private readonly productService: CategoryService) { }
}

