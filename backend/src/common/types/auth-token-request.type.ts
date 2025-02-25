import { type UserDto } from "@/modules/users/dto/dto";

interface AuthTokenRequest extends Request {
  headers: Request["headers"] & {
    authorization: string;
  };
  user: UserDto;
}

export { type AuthTokenRequest };
