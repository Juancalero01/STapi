import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.paylod';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.userService.findOneUsername(body.username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isMatch = await compare(body.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', 401);
    }
    const token: string = this.jwtService.sign({
      id: user.id,
      fullname: user.fullname,
      role: user.role.name,
    } as JwtPayload);

    return {
      user: { id: user.id, fullname: user.fullname, role: user.role.name },
      token: token,
    };
  }
}
