import { AppDataSource } from "../data-source";
import { createClientDTO } from "../dtos/clients.dto";
import { Client } from "../entity/Client";
import { User, UserRole } from "../entity/User";

export class ClientService {
  private clientRepo = AppDataSource.getRepository(Client);
  private userRepo = AppDataSource.getRepository(User);

  async createClient(data: createClientDTO, barberId: string): Promise<void> {
    const { name, phone } = data;

    const barber = await this.userRepo.findOneBy({ id: barberId });
    if (!barber) {
      throw { status: 404, message: "Barber not found" };
    }

    if (barber.role !== UserRole.BARBER) {
      throw { status: 403, message: "User is not a barber" };
    }

    const client = this.clientRepo.create({ name, phone, barber });
    await this.clientRepo.save(client);

    return;
  }
}
