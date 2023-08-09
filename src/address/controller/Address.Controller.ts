import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { AddressService } from "../service/Address.Service";


@Controller('list')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }
}

