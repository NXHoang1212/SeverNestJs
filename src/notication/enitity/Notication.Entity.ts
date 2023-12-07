import { User } from "src/user/model/User.Schema";


export class NoticationEntity {
    UserId: User;
    Name: string;
    Tittle: string;
    Description: string;
    Image: string;
    Status: string;
    CreateAt: Date;
    UpdateAt: Date;
}