import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, UseInterceptors, UploadedFile, Req, Render } from "@nestjs/common";
import { Response, Request } from "express";
import { GetProductRequest } from "../dto/req/GetProduct.Request";
import { AddProductRequest } from "../dto/req/AddProduct.Request";
import { UpdateProductRequest } from "../dto/req/UpdateProduct.Request";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterConfig, CloudinaryUploader } from "src/middleware/upload/UploadMulter";
import { ProductAdminService } from "../service/ProductAdmin.Service";

@Controller('cpanel/admin')
export class ProductAdminController {
    constructor(private readonly productAdminService: ProductAdminService) { }
    //url: http://localhost:3000/cpanel/admin/HomePage
    @Get('HomePage')
    @Render('web/HomePage')
    renderHomePage() {
        return {};
    }
    @Get('Customer')
    @Render('web/ManagerCustomer')
    renderProduct() {
        return {};
    }
    @Get('Product')
    @Render('web/ManagerProducts')
    renderCustomer() {
        return {};
    }

    @Get('AddProduct')
    @Render('web/FormAddProducts')
    renderAddProduct() {
        return {};
    }

    //url: localhost:3000/product
    @Get()
    async get(@Query() query: GetProductRequest, @Res() res: Response) {
        try {
            const response = await this.productAdminService.get(query);
            console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    //url: localhost:3000/product/create
    @Post('create')
    @UseInterceptors(FileInterceptor('image', MulterConfig),)
    async create(@Body() body: AddProductRequest, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            const uploadedImage = await CloudinaryUploader.upload(file.path);
            const response = await this.productAdminService.create(body, uploadedImage.url);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/detail/:id
    @Get('detail/:id')
    async detail(@Param('id') id: String, @Res() res: Response) {
        try {
            const response = await this.productAdminService.detail(id);
            console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/update/:id 
    @Post('update/:id')
    @UseInterceptors(FileInterceptor('image', MulterConfig),)
    async update(@Param('id') id: String, @Body() body: UpdateProductRequest, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            const uploadedImage = await CloudinaryUploader.upload(file.path);
            const response = await this.productAdminService.update(id, body, uploadedImage.url);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/delete/:id
    @Delete('delete/:id')
    async delete(@Param('id') id: String, @Res() res: Response) {
        try {
            const response = await this.productAdminService.delete(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:51 ~ ProductController ~ delete ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}

