import { FastifyInstance } from "fastify"
import { createClientDTO } from "../dtos/clients.dto"
import { ClientCreateResponseSchema, ClientCreateSchema } from "../schemas/clients.schema";
import { clientController } from "../controllers/clients.controller";

export async function clientRouter(fastify: FastifyInstance) {
  fastify.post<{ Body: createClientDTO }>("/clients", {
    schema: {
      body: ClientCreateSchema,
      response: {
        200: ClientCreateResponseSchema,
      }
    }
  }, clientController.createClient);
}
