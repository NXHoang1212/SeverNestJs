import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, UseInterceptors, UploadedFile, Req, Render } from "@nestjs/common";
import { Response, Request, query } from "express";
import { GetProductRequest } from "../dto/req/GetProduct.Request";
import { AddProductRequest } from "../dto/req/AddProduct.Request";
import { UpdateProductRequest } from "../dto/req/UpdateProduct.Request";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterConfig, CloudinaryUploader } from "src/middleware/upload/UploadMulter";
import { ProductAdminService } from "../service/ProductAdmin.Service";
import { CategoryService } from '../../categories/service/Category.Service';
import { formatPrice } from "src/utils/FormatPrice";

@Controller('api/admin')
export class ProductAdminController {
    constructor(private readonly productAdminService: ProductAdminService,
        private readonly categoryService: CategoryService) { }


    @Get('AddProduct')
    async getCategories(@Query() query: any, @Res() res: Response) {
        try {
            const response = await this.categoryService.get(query);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('Product')
    async get(@Query() query: GetProductRequest, @Res() res: Response) {
        try {
            const response = await this.productAdminService.get(query);
            response.data.forEach((product: any) => {
                product.price = formatPrice(product.price);
            });
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/cpanel/admin/create
    @Post('createProduct')
    @UseInterceptors(FileInterceptor('image', MulterConfig))
    async create(@Body() body: AddProductRequest, @UploadedFile() imageFile: Express.Multer.File, @Res() res: Response) {
        try {
            const response = await this.productAdminService.createWithImage(body, imageFile);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('updateProduct/:id')
    async detail(@Param('id') id: String, @Query() query: any, @Res() res: Response) {
        try {
            const response = await this.productAdminService.detail(id);
            let categories = await this.categoryService.get(query);
            return res.status(HttpStatus.OK).json({ data: response, categories: categories });
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('updateProduct/:id')
    @UseInterceptors(FileInterceptor('image', MulterConfig))
    async update(@Param('id') id: string, @Body() body: UpdateProductRequest, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            const response = await this.productAdminService.updateWithImage(id, body, file);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/delete/:id
    @Delete('deleteProduct/:id')
    async delete(@Param('id') id: String, @Res() res: Response) {
        try {
            const response = await this.productAdminService.delete(id);
            return res.status(HttpStatus.OK).json(response);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}

// async get(@Query() query: GetProductRequest, @Res() res: Response) {
//     try {
//         const response = await this.productAdminService.get(query);
//         console.log("🚀 ~ file: ProductController.ts:17 ~ ProductController ~ get ~ result:", response)
//         return res.status(HttpStatus.OK).json(response);
//     } catch (error: any) {
//         console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
//         return res.status(HttpStatus.BAD_REQUEST).json(error);
//     }
// }