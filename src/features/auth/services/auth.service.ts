import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {
    login(email: string, _password: string) { return { accessToken: `fake-token-for:${email}` }; }
}
