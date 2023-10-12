import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './Roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  //là dùng để kiểm tra xem user có quyền hay không nếu có thì trả về true còn không thì trả về false và báo lỗi
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => role === roles);
    console.log("🚀 ~ file: Roles.Guard.ts ~ line 113 ~ RolesGuard ~ canActivate ~ hasRole", hasRole)
    console.log("🚀 ~ file: Roles.Guard.ts ~ line 113 ~ RolesGuard ~ canActivate ~ user", user)
    console.log("🚀 ~ file: Roles.Guard.ts ~ line 113 ~ RolesGuard ~ canActivate ~ roles", roles)
    console.log("🚀 ~ file: Roles.Guard.ts ~ line 113 ~ RolesGuard ~ canActivate ~ request", request)
    console.log("🚀 ~ file: Roles.Guard.ts ~ line 113 ~ RolesGuard ~ canActivate ~ context", context)
    console.log("🚀 ~ file: Roles.Guard.ts ~ line 113 ~ RolesGuard ~ canActivate ~ context.getHandler()", context.getHandler())
    return user && user.roles && hasRole();
  }
}