import { JwtAuthenticationService } from '@app/jwt-authentication';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly JwtAuthenticationService: JwtAuthenticationService) {}
  async login() {
    return this.JwtAuthenticationService.generateAccessToken({})
  }
}
