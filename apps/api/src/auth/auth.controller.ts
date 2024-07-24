import { ClientControllers } from '@app/core/decorator/controller-customer.decorator';
import { Public } from '@app/jwt-authentication/public-api.decorator';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@ClientControllers('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  // @ApiResponse(LoginCmsResponseSchema)
  login() {
    return this.authService.login();
  }
}
