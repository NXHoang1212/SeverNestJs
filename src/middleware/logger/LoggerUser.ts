import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerUser implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.path == '/api/users/login' || req.path == '/api/users/register') {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'Email hoặc password không được để trống',
                    data: null
                });
            }
        }
        next();
    }
}