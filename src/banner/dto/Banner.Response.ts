import { BannerEntity } from './../entity/Banner.Entity';

export class AddBannerResponse {
    status: Boolean;
    message: String;
    data: any;
}


export class GetBannerResponse {
    status: Boolean;
    message: String;
    data: BannerEntity[];
}