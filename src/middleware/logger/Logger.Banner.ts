import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerBanner implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...', req.path);
        // || req.path == '/product/create' 
        // if (req.path == '/product' || req.path == '/product/detail/:id' || req.path == '/product/update/:id') {
        //     const { name, price, image, description, category, quantity } = req.query;
        //     //bắt lỗi
        //     //nếu không có name hoặc price hoặc image hoặc description hoặc category hoặc quantity thì trả về lỗi
        //     if (!name || !price) {
        //         return res.status(400).json({
        //             status: false,
        //             message: "Bad request",
        //             data: null,
        //         });
        //     }
        // }
        next();
    }
}

