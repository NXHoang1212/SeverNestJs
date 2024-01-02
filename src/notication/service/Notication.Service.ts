import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notication, NoticationDocument } from '../model/NoticationSchema';
import { NoticationResponse } from '../dto/Notication.Response';
import { NoticationRequest } from '../dto/Notication.Request';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../src/json/Admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Injectable()
export class NoticationService {
  constructor(@InjectModel(Notication.name)
  private readonly orderModel: Model<NoticationDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async createNotication(body: NoticationRequest): Promise<NoticationResponse> {
    try {
      const { ...data } = body;
      const response = await this.orderModel.create(data);
      const result: NoticationResponse = {
        status: true,
        message: 'Create Notication Success',
        data: response,
      };
      return result;
    } catch (error: any) {
      const response: NoticationResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async getNoticationById(id: string): Promise<NoticationResponse> {
    try {
      const response = await this.orderModel.findOne({ userId: id });
      const result: NoticationResponse = {
        status: true,
        message: 'Get Notication Success',
        data: response,
      };
      return result;
    } catch (error: any) {
      const response: NoticationResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }

  async sendNotificationFirebase(request: any): Promise<NoticationResponse> {
    try {
      const response = await admin.messaging().send({
        notification: {
          title: request.title,
          body: request.body,
        },
        topic: 'all',
      });
      const result: NoticationResponse = {
        status: true,
        message: 'Send Notification Success',
        data: response,
      };
      return result;
    } catch (error: any) {
      const response: NoticationResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return response;
    }
  }
}
