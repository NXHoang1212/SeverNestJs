import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req, Render } from "@nestjs/common";
import { Response, Request } from "express";
import { CategoryService } from "../service/Category.Service";
import { AddCategoryRequest } from "../dto/req/AddCatgory.Request";
import { GetCategoryRequest } from "../dto/req/GetCategory.Request";


@Controller('cpanel/admin')
export class CategoryController {
    constructor(private readonly categorySerivce: CategoryService) { }

    @Get('AddCategory')
    @Render('web/FormAddCategory')
    renderAddProduct() {
        return {};
    }

    @Get('Category')
    @Render('web/ManagerCategory')
    async get(@Query() query: GetCategoryRequest, @Res() res: Response) {
        try {
            const response = await this.categorySerivce.get(query);
            return { data: response.data };
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: http://localhost:3000/list/create
    @Post('CreateCategory')
    async create(@Body() body: AddCategoryRequest, @Res() res: Response) {
        try {
            const response = await this.categorySerivce.create(body);
            if (response.status) {
                console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ response", response)
                return res.redirect('/cpanel/admin/Category');
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }


    //url: http://localhost:3000/list/update/60f9b0b0b3b0b71f0c8f0b1f
    @Get('updateCategory/:id')
    @Render('web/EditCategory')
    async updateRender(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.categorySerivce.getOne(id);
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ response", response)
            return { data: response.data };
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }


    //url localhost:3000/list/update/60f9b0b0b3b0b71f0c8f0b1f
    @Post('updateCategory/:id')
    async update(@Param('id') id: string, @Body() body: AddCategoryRequest, @Res() res: Response) {
        try {
            const response = await this.categorySerivce.update(id, body);
            if (response.status) {
                console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ response", response)
                return res.redirect('/cpanel/admin/Category');
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url locahost:3000/delete/:id
    @Delete('deleteCategory/:id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            const response = await this.categorySerivce.delete(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:51 ~ ProductController ~ delete ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}

