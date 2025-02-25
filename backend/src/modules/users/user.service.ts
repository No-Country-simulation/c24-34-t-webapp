import { Injectable } from "@nestjs/common";

import { DbService } from "@/database/db.service";

@Injectable()
class UserService {
  constructor(private dbService: DbService) {}

  findById(id: string): string {
    return `User ${id}`;
  }
}

export { UserService };
