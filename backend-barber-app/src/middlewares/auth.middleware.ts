import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import * as jwt from "jsonwebtoken";

export function authMiddleware(req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as { id: string; name: string };
    req.user = { id: decoded.id, name: decoded.name };
    done();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
}
