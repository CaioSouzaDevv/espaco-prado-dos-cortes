import { FastifyReply, FastifyRequest } from "fastify";
import { ClientService } from "../services/clients.service";
import { createClientDTO } from "../dtos/clients.dto";

const clientService = new ClientService();

interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    id: string;
  };
}

export class clientController {
  static async createClient(req: AuthenticatedRequest, res: FastifyReply) {
    try {
      const barberId = req.user?.id;
      if (!barberId) {
        throw { status: 401, message: "User not authenticated" };
      }
      await clientService.createClient(req.body as createClientDTO, barberId);
      return res.status(201).send({ message: "Client created successfully." });
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }
}
