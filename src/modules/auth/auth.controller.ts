import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../users/entity';
import { EnterDto } from './dto/enter.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() body: LoginDto) {
    return this.authService.signin(body);
  }

  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post('enter')
  enter(@Body() body: EnterDto) {
    return this.authService.enter(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('check-username-exist')
  checkUsernameExist(@Body() body: Pick<UserEntity, 'username'>) {
    return this.authService.checkUsernameExist(body);
  }
}
