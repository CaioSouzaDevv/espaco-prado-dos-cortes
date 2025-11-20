import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { UserRole } from "../entity/User";

export function roleMiddleware(allowedRoles: UserRole[]) {
  return (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(401).send({ error: "User not authenticated" });
    }

    const userRole = req.user.role as UserRole;

    if (allowedRoles.includes(userRole)) {
      done();
    } else {
      res.status(403).send({ error: "Forbidden: You don't have permission to access this resource" });
    }
  };
}
