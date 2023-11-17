import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const { username } = body;
    const user = await this.userService.findOneUsername(username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isMatch = await compare(body.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.sign(payload);

    const data = {
      user: user,
      token: token,
    };

    return data;
  }
}
