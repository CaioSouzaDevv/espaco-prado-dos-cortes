import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/users.service";
import { forgotPasswordDTO, resetPasswordBodyDTO, resetPasswordParamsDTO, userCreateDTO, userLoginDTO } from "../dtos/users.dto";

const userService = new UserService();

export class UserController {
  static async userCreate(req: FastifyRequest<{ Body: userCreateDTO }>, res: FastifyReply) {
    try {
      const user = await userService.userCreate(req.body);
      return res.status(200).send({ user });
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }

  static async userLogin(req: FastifyRequest<{ Body: userLoginDTO }>, res: FastifyReply) {
    try {
      const token = await userService.userLogin(req.body);
      return res.status(200).send({ token })
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }

  static async forgotPassword(req: FastifyRequest<{ Body: forgotPasswordDTO }>, res: FastifyReply) {
    try {
      await userService.forgotPassword(req.body);
      return res.status(200).send({ message: "If an account with this email exists, a password reset link will be sent." })
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }

  static async resetPassword(req: FastifyRequest<{ Params: resetPasswordParamsDTO, Body: resetPasswordBodyDTO }>, res: FastifyReply) {
    try {
      await userService.resetPassword(req.params, req.body);
      return res.status(200).send({ message: "Your password has been reset successfully." })
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }
}

