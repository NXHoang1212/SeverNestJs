import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/model/User.Schema';

export type NoticationDocument = Notication & Document;

@Schema()
export class Notication {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: String })
    token: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    Tittle: string;

    @Prop({ type: String })
    Description: string;

    @Prop({ type: String })
    Image: string;
    
    @Prop({ type: String })
    Status: string;

    @Prop({ type: Date })
    CreateAt: Date;

    @Prop({ type: Date })
    UpdateAt: Date;
    
}


export const NoticationSchema = SchemaFactory.createForClass(Notication);