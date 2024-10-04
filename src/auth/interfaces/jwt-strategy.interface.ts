
export interface JwtStrategyPayload {
    email: string;
    exp: number;
    iat: number;
    sub: string;
}