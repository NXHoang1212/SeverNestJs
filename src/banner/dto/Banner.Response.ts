import { BannerEntity } from './../entity/Banner.Entity';

export class AddBannerResponse {
  status: boolean;
  message: string;
  data: any;
}

export class GetBannerResponse {
  status: boolean;
  message: string;
  data: BannerEntity[];
}
