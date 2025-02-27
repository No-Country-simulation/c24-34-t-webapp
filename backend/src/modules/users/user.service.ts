import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

import { DbService } from "@/database/db.service";
import { type UserSignUpDto } from "@/modules/auth/dto/dto";

import { FindUserRoutinesDto, UserDto } from "./dto/dto";

@Injectable()
class UserService {
  private readonly saltRounds: number;
  constructor(
    private dbService: DbService,
    private configService: ConfigService,
  ) {
    const saltRounds = this.configService.get<string>("SALT_ROUNDS");
    if (!saltRounds) {
      throw new Error("SALT_ROUNDS not defined");
    }
    this.saltRounds = Number.parseInt(saltRounds, 10);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.dbService.user.findUnique({
      where: { email },
      select: { id: true, username: true, email: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findById(id: string): Promise<FindUserRoutinesDto> {
    const user = await this.dbService.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        routines: {
          select: {
            id: true,
            title: true,
            description: true,
            userId: true,
            activities: {
              select: {
                id: true,
                title: true,
                description: true,
                time: true,
                timeRange: true,
                goals: {
                  select: {
                    id: true,
                    unit: true,
                    period: true,
                    value: true,
                  },
                },
                subcategory: {
                  select: {
                    id: true,
                    name: true,
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { routines, ...userData } = user;

    const routinesDto = routines.map(routine => {
      const activitiesDto = routine.activities.map(activity => {
        return {
          id: activity.id,
          title: activity.title,
          description: activity.description,
          time: activity.time,
          timeRange: activity.timeRange,
          category: activity.subcategory.category.name,
          subcategory: activity.subcategory.name,
          goal: {
            id: activity.goals[0]?.id,
            unit: activity.goals[0]?.unit.name,
            period: activity.goals[0]?.period,
            value: activity.goals[0]?.value,
          },
        };
      });

      return {
        id: routine.id,
        title: routine.title,
        description: routine.description,
        userId: routine.userId,
        activities: activitiesDto,
      };
    });

    return { ...userData, routines: routinesDto };
  }

  async createUser({
    userData,
  }: {
    userData: UserSignUpDto;
  }): Promise<UserDto> {
    const userExists = await this.dbService.user.findUnique({
      where: { email: userData.email },
      select: {
        email: true,
      },
    });

    if (userExists) {
      throw new ConflictException("An user with this email already exists");
    }

    const hashedPassword = await this.hash(userData.password);
    const user = await this.dbService.user.create({
      data: { ...userData, password: hashedPassword },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return user;
  }

  async comparePassword(payload: {
    email: string;
    password: string;
  }): Promise<UserDto> {
    const user = await this.dbService.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid username or password");
    }

    const { password, ...userData } = user;
    const isPassword = await this.compare(payload.password, password);

    if (!isPassword) {
      throw new UnauthorizedException("Invalid username or password");
    }

    return userData;
  }

  private async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  private async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export { UserService };
