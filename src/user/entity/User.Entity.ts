

//entity là một class có chứa các thuộc tính của một đối tượng
//entity là một class đại diện cho một bảng trong database

export class UserEntity {
    fullname: string;
    email: string;
    password: string;
    avatar: string;
    mobile: string;
    gender: string;
    nickname: string;
    birthday: string;
    resetOTP: string;
    // createdAt: Date;
    // updatedAt: Date; 
}