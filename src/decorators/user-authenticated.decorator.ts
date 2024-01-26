import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserAuthenticated {
  userId: number;
  username: string;
}
export const UserAuthenticated = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUserAuthenticated;
  },
);
