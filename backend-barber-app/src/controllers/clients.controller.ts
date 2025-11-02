import { FastifyReply, FastifyRequest } from "fastify";
import { ClientService } from "../services/clients.service";
import { createClientDTO } from "../dtos/clients.dto";

const clientService = new ClientService();

export class clientController {
  static async createClient(req: FastifyRequest<{ Body: createClientDTO }>, res: FastifyReply) {
    try {
      await clientService.createClient(req.body);
      return res.status(201).send({ message: "Client created successfully." });
    } catch (err) {
      const status = err.status || 400;
      return res.status(status).send({ error: err.message });
    }
  }
}
