import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/users.service";
import { userCreateDTO } from "../dtos/users.dto";

const userService = new UserService();

export class UserController {
  static async userCreate(req: FastifyRequest<{ Body: userCreateDTO }>, res: FastifyReply) {
    try {
      const user = await userService.userCreate(req.body);
      return res.status(201).send({ user });
    } catch (err: any) {
      const status = err.status || 400;
      return res.status(status).send({ error: err.message });
    }
  }
}

