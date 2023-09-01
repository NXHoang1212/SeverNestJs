import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, UseInterceptors, UploadedFile, Req, Render } from "@nestjs/common";
import { Response, Request, query } from "express";
import { GetProductRequest } from "../dto/req/GetProduct.Request";
import { AddProductRequest } from "../dto/req/AddProduct.Request";
import { UpdateProductRequest } from "../dto/req/UpdateProduct.Request";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterConfig, CloudinaryUploader } from "src/middleware/upload/UploadMulter";
import { ProductAdminService } from "../service/ProductAdmin.Service";
import { CategoryService } from '../../categories/service/Category.Service';
import { formatPrice } from "src/utils/function/FormatPrice";

@Controller('cpanel/admin')
export class ProductAdminController {
    constructor(private readonly productAdminService: ProductAdminService,
        private readonly categoryService: CategoryService
    ) { }
    //url: http://localhost:3000/cpanel/admin/HomePage
    @Get('HomePage')
    @Render('web/HomePage')
    renderHomePage() {
        return {};
    }

    @Get('Customer')
    @Render('web/ManagerCustomer')
    renderCustomer() {
        return {};
    }

    @Get('AddProduct')
    @Render('web/FormAddProducts')
    async getCategories(@Query() query: any, @Res() res: Response) {
        try {
            const response = await this.categoryService.get(query);
            return { categories: response.data }
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product
    @Get('Product')
    @Render('web/ManagerProducts')
    async get(@Query() query: GetProductRequest, @Res() res: Response) {
        try {
            const response = await this.productAdminService.get(query);
            response.data.forEach((product: any) => {
                product.price = formatPrice(product.price);
            });
            return { data: response.data }
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:19 ~ ProductController ~ get ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/cpanel/admin/create
    @Post('createProduct')
    @UseInterceptors(FileInterceptor('image', MulterConfig))
    async create(@Body() body: AddProductRequest, @UploadedFile() imageFile: Express.Multer.File, @Res() res: Response) {
        try {
            const response = await this.productAdminService.createWithImage(body, imageFile);
            if (response.status) {
                return res.redirect('/cpanel/admin/Product');
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/detail/:id
    @Get('updateProduct/:id')
    @Render('web/EditProducts')
    async detail(@Param('id') id: String, @Query() query: any, @Res() res: Response) {
        try {
            const response = await this.productAdminService.detail(id);
            let categories = await this.categoryService.get(query);
            return { data: response.data, categories: categories.data };
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:29 ~ ProductController ~ create ~ error", error)
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //url: localhost:3000/product/update/:id 
    @Post('updateProduct/:id')
    @UseInterceptors(FileInterceptor('image', MulterConfig))
    async update(@Param('id') id: string, @Body() body: UpdateProductRequest, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            const response = await this.productAdminService.updateWithImage(id, body, file);
            if (response.status) {
                return res.redirect('/cpanel/admin/Product');
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
        } catch (error: any) {
            console.log("🚀 ~ file: ProductController.ts:40 ~ ProductController ~ update ~ error", error)
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
            console.log("🚀 ~ file: ProductController.ts:51 ~ ProductController ~ delete ~ error", error)
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