import { AppDataSource } from "../data-source";
import { userCreateDTO } from "../dtos/users.dto";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt"

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async userCreate(data: userCreateDTO) {
    const { name, email, password } = data;

    const existingEmail = await this.userRepo.findOneBy({ email });
    if (existingEmail) {
      throw { status: 409, message: "email is already is use" }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({ name, email, passwordHash });
    await this.userRepo.save(user);

    return user
  }
}
