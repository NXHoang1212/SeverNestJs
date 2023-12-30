import { User } from 'src/user/model/User.Schema';

export class PromotionEntity {
  UserId?: User;
  Tilte: string;
  name: string;
  nameQR: Buffer;
  description: string;
  image: string;
  price: number;
  start: string;
  end: string;
  status: string;
}
