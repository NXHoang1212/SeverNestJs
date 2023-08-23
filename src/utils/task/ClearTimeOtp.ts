import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/user/model/User.Schema';


@Injectable()
export class ClearExpiredOTPService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }
    // Chạy vào 10s
    @Cron('*/10 * * * * *')
    async clearExpiredOTP() {
        const currentTime = new Date();
        const usersWithExpiredOTP = await this.userModel.find({
            //$ne là not equal so sánh với undefined để lấy những user có OTP hết hạn
            resetOTP: { $ne: undefined },
            // So sánh thời điểm gửi OTP với thời điểm hiện tại trừ đi 2phut
            // Nếu thời điểm gửi OTP cách thời điểm hiện tại trừ đi 2 phút thì sẽ lấy ra
            updatedAt: { $lte: new Date(currentTime.getTime() - 2 * 60 * 1000) }
        });
        console.log("🚀 ~ file: ClearTimeOtp.ts ~ line 58 ~ ClearExpiredOTPService ~ clearExpiredOTP ~ usersWithExpiredOTP", usersWithExpiredOTP)
        // Xóa OTP của những user có OTP hết hạn nên chúng ta dùng vòng lặp để duyệt qua từng user
        for (const user of usersWithExpiredOTP) {
            // user.resetOTP = undefined;
            await user.save();
        }
    }
}
