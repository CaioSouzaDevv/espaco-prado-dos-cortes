import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/users.service";
import { userCreateDTO, userLoginDTO } from "../dtos/users.dto";

const userService = new UserService();

export class UserController {
  static async userCreate(req: FastifyRequest<{ Body: userCreateDTO }>, res: FastifyReply) {
    try {
      const user = await userService.userCreate(req.body);
      return res.status(201).send({ user });
    } catch (err) {
      const status = err.status || 400;
      return res.status(status).send({ error: err.message });
    }
  }

  static async userLogin(req: FastifyRequest<{ Body: userLoginDTO }>, res: FastifyReply) {
    try {
      const token = await userService.userLogin(req.body);
      return res.status(200).send({ token })
    } catch (err) {
      const status = err.status || 400;
      return res.status(status).send({ error: err.message });
    }
  }
}

