import { AppDataSource } from "../data-source";
import { createClientDTO } from "../dtos/clients.dto";
import { Client } from "../entity/Client";

export class ClientService {
  private clientRepo = AppDataSource.getRepository(Client);

  async createClient(data: createClientDTO) {
    const { name, phone } = data;

    const client = this.clientRepo.create({ name, phone });
    await this.clientRepo.save(client);

    return;
  }
}
