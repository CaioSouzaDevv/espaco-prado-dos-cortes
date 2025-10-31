import { AppDataSource } from "../data-source";
import { userCreateDTO, userLoginDTO } from "../dtos/users.dto";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

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

  async userLogin(data: userLoginDTO) {
    const { email, password } = data;

    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw { status: 404, message: "Invalid credentials" };
    }

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isMatchPassword) {
      throw { status: 404, message: "Invalid credentials" };
    }

    const payload = {
      id: user.id,
      name: user.name
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
    return token;
  }
}
