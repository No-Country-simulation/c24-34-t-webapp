import { Injectable, NotFoundException } from "@nestjs/common";

import { DbService } from "@/database/db.service";

import { UserDto } from "./dto/dto";

@Injectable()
class UserService {
  constructor(private dbService: DbService) {}

  async findById(id: string): Promise<UserDto> {
    const user = await this.dbService.user.findUnique({
      where: { id },
      select: { id: true, username: true, email: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}

export { UserService };
