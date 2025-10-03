import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto, LoginResponseDto, RefreshResponseDto } from './dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IJwtPayload } from '../user/interfaces';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import { IReqPayload } from '../user/interfaces/req-payload.interface';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  private readonly COOKIE_NAME = 'no-cookies';

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async login(res: Response, dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new ConflictException('Неверная почта или пароль');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ConflictException('Неверная почта или пароль');
    }

    if (!user.userInfo?.role) {
      throw new ConflictException('Неизвестная роль');
    }

    const payload: IJwtPayload = {
      id: user.id,
    };

    return {
      surname: user.userInfo.surname,
      name: user.userInfo.name,
      role: user.userInfo.role.name,
      accessToken: await this.generateJwtTokens(res, payload),
    };
  }

  async refreshToken(req: Request): Promise<RefreshResponseDto> {
    const refreshToken = req.cookies[this.COOKIE_NAME] as string;

    if (!refreshToken)
      throw new UnauthorizedException('Недействительный refresh-токен');

    let payload: IJwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Проблемы с payload');
    }

    const user = await this.userService.getById(payload.id);

    if (!user) throw new NotFoundException('Пользователь не найден');
    const accessToken = await this.signJwtToken(
      { id: user.id },
      this.JWT_ACCESS_TOKEN_TTL,
    );

    return { accessToken };
  }

  logout(res: Response) {
    this.setCookie(res, this.COOKIE_NAME, '', 0);
  }

  private async generateJwtTokens(
    res: Response,
    payload: IJwtPayload,
  ): Promise<string> {
    const accessToken = await this.signJwtToken(
      payload,
      this.JWT_ACCESS_TOKEN_TTL,
    );
    const refreshToken = await this.signJwtToken(
      payload,
      this.JWT_REFRESH_TOKEN_TTL,
    );

    this.setCookie(
      res,
      this.COOKIE_NAME,
      refreshToken,
      ms(this.JWT_REFRESH_TOKEN_TTL as ms.StringValue),
    );
    return accessToken;
  }

  private async signJwtToken(payload: IJwtPayload, expiresIn: string) {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  private setCookie(
    res: Response,
    cookieName: string,
    token: string,
    age: number,
  ) {
    res.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      domain: this.COOKIE_DOMAIN,
      maxAge: age,
    });
  }

  async validate(payload: IJwtPayload): Promise<IReqPayload> {
    const user = await this.userService.getById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Неизвестный пользователь');
    }

    if (!user.userInfo?.role) {
      throw new UnauthorizedException('Неизвестная роль');
    }

    return { id: user.id, role: user.userInfo.role.name };
  }
}
