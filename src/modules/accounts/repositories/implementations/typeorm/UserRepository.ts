import { Repository } from "typeorm";
import { appDataSource } from "../../../../../config/database/typeorm/data-source";
import { User } from "../../../entities/User";
import { CreateUserDto } from "../../../useCases/createUser/dto/CreateUserDto";
import { IUserRepository } from "../../IUserRepository";
import { v4 as uuidv4 } from "uuid";
import { Team } from "../../../../teams/entities/Team";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  public async createUser({ name, email, password }: CreateUserDto) {
    return await this.repository.save({
      id: uuidv4(),
      name,
      email,
      password,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async chooseTeam(user: User, team: Team): Promise<User> {
    user.team = team;

    this.repository.save(user);

    return user;
  }
}
