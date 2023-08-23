import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerUser implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.path == '/api/users/login') {
            const { mobile, googleId, facebookId } = req.body;
            //nếu không có mobile hoặc googleId hoặc facebookId thì trả về lỗi
            if (!mobile && !googleId && !facebookId) {
                return res.status(400).json({
                    status: false,
                    message: 'mobile hoặc googleId hoặc facebookId không được để trống',
                    data: null
                });
            }
        }
        next();
    }
}