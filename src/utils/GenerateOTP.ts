//tạo mã otp chứa 4 chữ số 


// generateOTP.ts
export class GenerateOTP {
    //khai báo hàm tạo mã otp
    //hàm tạo mã otp
    generateOTP() {
        const digits = '0123456789';
        let otp = '';
        //ở đây mình sẽ tạo mã otp có 4 chữ số và mỗi lần lặp sẽ lấy ngẫu nhiên 1 chữ số
        //trong chuỗi digits nên sẽ có 4 chữ số ngẫu nhiên
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            otp += digits[randomIndex];
        }
        return otp;
    }
}
