import { FastifyInstance } from "fastify";
import { UserController } from "./controllers/users.controller"
import { userCreateDTO, userLoginDTO } from "./dtos/users.dto";
import { UserCreateSchema, UserLoginResponseSchema, UserLoginSchema, UserResponseSchema } from "./schemas/users.schema";

export async function Routers(fastify: FastifyInstance) {
  fastify.post<{ Body: userCreateDTO }>("/auth/register", {
    schema: {
      body: UserCreateSchema,
      response: {
        201: UserResponseSchema,
      }
    }
  }, UserController.userCreate);

  fastify.post<{ Body: userLoginDTO }>("/auth/login", {
    schema: {
      body: UserLoginSchema,
      response: {
        200: UserLoginResponseSchema,
      }
    }
  }, UserController.userLogin)
}
