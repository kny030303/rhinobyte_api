import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  mypage(): string {
    // TODO: user email로 생성했던 제안서 정보를 가져온다.
    return 'hello';
  }
}
