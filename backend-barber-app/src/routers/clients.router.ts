import { FastifyInstance } from "fastify"
import { createClientDTO } from "../dtos/clients.dto"
import { ClientCreateResponseSchema, ClientCreateSchema } from "../schemas/clients.schema";
import { clientController } from "../controllers/clients.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { UserRole } from "../entity/User";

export async function clientRouter(fastify: FastifyInstance) {
  fastify.post<{ Body: createClientDTO }>("/clients", {
    preHandler: [authMiddleware, roleMiddleware([UserRole.ADMIN, UserRole.BARBER])],
    schema: {
      body: ClientCreateSchema,
      response: {
        200: ClientCreateResponseSchema,
      }
    }
  }, clientController.createClient);
}
