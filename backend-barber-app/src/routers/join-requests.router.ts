import { FastifyInstance } from "fastify";
import { JoinRequestController } from "../controllers/join-requests.controller";
import { createJoinRequestParamsSchema, updateJoinRequestBodySchema, updateJoinRequestParamsSchema } from "../schemas/join-requests.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { UserRole } from "../entity/User";

export async function joinRequestsRouter(fastify: FastifyInstance) {
  fastify.post(
    "/barbershops/:barbershopId/join-requests",
    {
      preHandler: [authMiddleware, roleMiddleware([UserRole.BARBER])],
      schema: {
        params: createJoinRequestParamsSchema,
      },
    },
    JoinRequestController.createJoinRequest
  );

  fastify.get(
    "/barbershops/:barbershopId/join-requests",
    {
      preHandler: [authMiddleware, roleMiddleware([UserRole.ADMIN])],
    },
    JoinRequestController.getJoinRequests
  );

  fastify.put(
    "/barbershops/:barbershopId/join-requests/:userId",
    {
      preHandler: [authMiddleware, roleMiddleware([UserRole.ADMIN])],
      schema: {
        params: updateJoinRequestParamsSchema,
        body: updateJoinRequestBodySchema,
      },
    },
    JoinRequestController.updateJoinRequest
  );
}
