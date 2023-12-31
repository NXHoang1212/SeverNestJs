import { UserRoles } from "../model/User.Schema";

//entity là một class có chứa các thuộc tính của một đối tượng
//entity là một class đại diện cho một bảng trong database

export class UserEntity {
    role: UserRoles;
    googleId: string;
    facebookId: string;
    name: string;
    holder: string;
    email: string;
    password: string;
    avatar: string;
    mobile: string;
    gender: string;
    birthday: string;
}



// nickname: string;
// fullname: string;
// password: string;
// resetOTP: string;
// createdAt: Date;
// updatedAt: Date; 