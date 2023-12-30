import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from '../model/Address.Model';
import { GetAddressResponse } from '../dto/res/GetAddress.Request';
import { AddRessRequest } from '../dto/req/AddRess.Request';
import { AddressResponse } from '../dto/res/AddRess.Response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addRessModel: Model<AddressDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async getAddress(id: string): Promise<GetAddressResponse> {
    try {
      const result = await this.addRessModel.find({ userId: id });
      if (!result) {
        throw new Error('Get address fail');
      }
      const reponseProduct: GetAddressResponse = {
        status: true,
        message: 'Get address success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: GetAddressResponse = {
        status: false,
        message: 'Get address fail',
        data: null,
      };
      return reponseProduct;
    }
  }

  async create(request: AddRessRequest): Promise<AddressResponse> {
    try {
      const {
        name,
        DescribeAddRess,
        Other,
        Gate,
        NoteOrther,
        userId,
        username,
        phone,
      } = request;
      const newAddress = new this.addRessModel({
        name: name,
        DescribeAddRess: DescribeAddRess,
        Other: Other,
        Gate: Gate,
        NoteOrther: NoteOrther,
        userId: userId,
        username: username,
        phone: phone,
      });
      const result = await newAddress.save();
      const reponseProduct: AddressResponse = {
        status: true,
        message: 'Add address success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: AddressResponse = {
        status: false,
        message: 'Add address fail',
        data: null,
      };
      return reponseProduct;
    }
  }

  async delete(id: string): Promise<AddressResponse> {
    try {
      const result = await this.addRessModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Delete address fail');
      }
      const reponseProduct: AddressResponse = {
        status: true,
        message: 'Delete address success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: AddressResponse = {
        status: false,
        message: 'Delete address fail',
        data: null,
      };
      return reponseProduct;
    }
  }

  async update(id: string, request: AddRessRequest): Promise<AddressResponse> {
    try {
      const {
        name,
        DescribeAddRess,
        Other,
        Gate,
        NoteOrther,
        username,
        phone,
      } = request;
      const result = await this.addRessModel.findByIdAndUpdate(id, {
        name: name,
        DescribeAddRess: DescribeAddRess,
        Other: Other,
        Gate: Gate,
        NoteOrther: NoteOrther,
        username: username,
        phone: phone,
      });
      const reponseProduct: AddressResponse = {
        status: true,
        message: 'Update address success',
        data: result,
      };
      return reponseProduct;
    } catch (error: any) {
      const reponseProduct: AddressResponse = {
        status: false,
        message: 'Update address fail',
        data: null,
      };
      return reponseProduct;
    }
  }
}
