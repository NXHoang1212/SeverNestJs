import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req, Render } from "@nestjs/common";
import { Response, Request } from "express";
import { PromotionUserService } from "../service/Promotion.User.Service";
import { PromotionRequest } from "../dto/Promotion.Request";


@Controller('api/users/discounts')
export class PromotionUserController {
    constructor(private readonly promotionuserService: PromotionUserService) { }

  
}

