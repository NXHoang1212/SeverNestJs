import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GrauthAuthen implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //lấy token từ header
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      /*giải mã token và lấy dữ liệu từ payload nếu giải mã thành công thì sẽ trả về payload nếu không sẽ bắn lỗi  
            throw new */
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'hello',
      });
      //gán payload vào request
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  // là một hàm để lấy token từ header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
