import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { CategoryService } from "../service/CategoryService";


@Controller('list')
export class CategoryController {
    constructor(private readonly productService: CategoryService) { }


}

