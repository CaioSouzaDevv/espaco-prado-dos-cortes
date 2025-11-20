import { FastifyReply, FastifyRequest } from "fastify";
import { JoinRequestService } from "../services/join-requests.service";
import { CreateJoinRequestParamsDTO, UpdateJoinRequestBodyDTO, UpdateJoinRequestParamsDTO } from "../dtos/join-requests.dto";

const joinRequestService = new JoinRequestService();

export class JoinRequestController {
  static async createJoinRequest(req: FastifyRequest<{ Params: CreateJoinRequestParamsDTO, User: { id: string } }>, res: FastifyReply) {
    try {
      const user = await joinRequestService.createJoinRequest(req.user.id, req.params);
      return res.status(201).send(user);
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }
  static async getJoinRequests(req: FastifyRequest<{ Params: { barbershopId: string } }>, res: FastifyReply) {
    try {
      const requests = await joinRequestService.getJoinRequests(req.user.id, req.params.barbershopId);
      return res.status(200).send(requests);
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }
  static async updateJoinRequest(req: FastifyRequest<{ Params: UpdateJoinRequestParamsDTO, Body: UpdateJoinRequestBodyDTO, User: { id: string } }>, res: FastifyReply) {
    try {
      const user = await joinRequestService.updateJoinRequest(req.user.id, req.params, req.body);
      return res.status(200).send(user);
    } catch (err) {
      if (err && typeof err === "object" && "status" in err && "message" in err) {
        const status = (err as any).status || 400;
        return res.status(status).send({ error: (err as any).message });
      }
    }
  }
}
