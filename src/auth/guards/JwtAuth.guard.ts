import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { decode } from 'jsonwebtoken';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private userService: UsersService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authorizationToken = String(req.headers.authorization);

        if (!authorizationToken || !authorizationToken.startsWith("Bearer")) {
            throw new UnauthorizedException("Token not valid");
        }

        try {
            const [_, token] = authorizationToken.split(" ");
            const payload = decode(token, {});
            if (typeof payload === "string") {
                throw new Error("Payload has no correct format")
            }

            const user = await this.userService.findOneByEmailOrAuth0Id(payload.email, payload.sub);
            if (!user) throw new UnauthorizedException("User not exists");

            const currentTime = Date.now();
            const expirationTime = payload.exp * 1000;
            if (currentTime >= expirationTime) {
                throw new UnauthorizedException("Token expired.");
            }

            return true;
        } catch (error) {
            throw new UnauthorizedException("An error has ocurred processing token");
        }
    }
}