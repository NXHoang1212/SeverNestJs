import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address, AddressDocument } from "../model/Address.Model";

@Injectable()
export class AddressService {
    constructor(@InjectModel(Address.name)
    private readonly productModel: Model<AddressDocument>) { }
}

