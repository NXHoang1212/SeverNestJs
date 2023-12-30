import { BannerEntity } from '../entity/Banner.Entity';

export class AddBannerRequest extends BannerEntity {}

export class GetBannerRequest {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
