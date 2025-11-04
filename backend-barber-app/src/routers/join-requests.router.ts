import { FastifyInstance } from "fastify";
import { JoinRequestController } from "../controllers/join-requests.controller";
import { createJoinRequestParamsSchema, updateJoinRequestBodySchema, updateJoinRequestParamsSchema } from "../schemas/join-requests.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function joinRequestsRouter(fastify: FastifyInstance) {
  fastify.post(
    "/barbershops/:barbershopId/join-requests",
    {
      preHandler: [authMiddleware],
      schema: {
        params: createJoinRequestParamsSchema,
      },
    },
    JoinRequestController.createJoinRequest
  );

  fastify.get(
    "/barbershops/:barbershopId/join-requests",
    {
      preHandler: [authMiddleware],
    },
    JoinRequestController.getJoinRequests
  );

  fastify.put(
    "/barbershops/:barbershopId/join-requests/:userId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: updateJoinRequestParamsSchema,
        body: updateJoinRequestBodySchema,
      },
    },
    JoinRequestController.updateJoinRequest
  );
}
