//entity là một class đại diện cho một bảng trong database
//entity này sẽ được sử dụng để tương tác với database

import { User } from 'src/user/model/User.Schema';

export class AddressEntity {
  userId: User;
  name: string;
  DescribeAddRess: string;
  Other: string;
  Gate: string;
  NoteOrther: string;
  username: string;
  phone: string;
}
