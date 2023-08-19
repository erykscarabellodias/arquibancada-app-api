import { User } from "../entities/User";
import { CreateUserDto } from "../useCases/createUser/dto/CreateUserDto";

export interface IUserRepository {
  createUser({ name, email, password }: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
