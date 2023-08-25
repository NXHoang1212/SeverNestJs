import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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