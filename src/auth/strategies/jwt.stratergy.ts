import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtStrategyPayload } from "../interfaces/jwt-strategy.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../auth.service";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UsersService, configService: ConfigService) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        })
    }

    async validate(payload: JwtStrategyPayload): Promise<User> {
        console.log("Hola??")
        const { email, exp, iat, sub } = payload;
        console.log({ payload })
        const user = await this.userService.findOneByEmailOrAuth0Id(email, sub);

        if (!user) throw new UnauthorizedException("Token not valid");

        return user;
    }
}