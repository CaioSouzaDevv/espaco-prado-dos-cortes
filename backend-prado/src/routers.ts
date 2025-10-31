import { FastifyInstance } from "fastify";
import { UserController } from "./controllers/users.controller"
import { userCreateDTO } from "./dtos/users.dto";
import { UserCreateSchema, UserResponseSchema } from "./schemas/users.schema";

export async function Routers(fastify: FastifyInstance) {
  fastify.post<{ Body: userCreateDTO }>("/auth/register", {
    schema: {
      body: UserCreateSchema,
      response: {
        201: UserResponseSchema,
      }
    }
  }, UserController.userCreate)
}
