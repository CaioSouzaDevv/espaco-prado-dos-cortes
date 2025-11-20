import { AppDataSource } from "../data-source";
import { Barbershop } from "../entity/Barbershop";
import { User, UserRole, JoinRequestStatus } from "../entity/User";
import { CreateJoinRequestParamsDTO, UpdateJoinRequestBodyDTO, UpdateJoinRequestParamsDTO } from "../dtos/join-requests.dto";

export class JoinRequestService {
  private userRepo = AppDataSource.getRepository(User);
  private barbershopRepo = AppDataSource.getRepository(Barbershop);

  async createJoinRequest(userId: string, params: CreateJoinRequestParamsDTO): Promise<Pick<User, "name" | "email">> {
    const { barbershopId } = params;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    if (user.role !== UserRole.BARBER) {
      throw { status: 403, message: "Only barbers can request to join a barbershop" };
    }

    if (user.barbershop) {
      throw { status: 409, message: "User is already in a barbershop" };
    }

    if (user.joinRequestStatus === JoinRequestStatus.PENDING) {
      throw { status: 409, message: "User already has a pending join request" };
    }

    const barbershop = await this.barbershopRepo.findOneBy({ id: barbershopId });
    if (!barbershop) {
      throw { status: 404, message: "Barbershop not found" };
    }

    user.requestedBarbershop = barbershop;
    user.joinRequestStatus = JoinRequestStatus.PENDING;

    await this.userRepo.save(user);

    return {
      name: user.name,
      email: user.email
    } satisfies Pick<User, "name" | "email">;
  }

  async getJoinRequests(userId: string, barbershopId: string): Promise<Pick<User, "name" | "email" | "role">[]> {
    const admin = await this.userRepo.findOne({ where: { id: userId }, relations: ["barbershop"] });
    if (!admin || admin.role !== UserRole.ADMIN || admin.barbershop?.id !== barbershopId) {
      throw { status: 403, message: "You are not authorized to view join requests for this barbershop" };
    }

    const requests = await this.userRepo.find({
      where: {
        requestedBarbershop: { id: barbershopId },
        joinRequestStatus: JoinRequestStatus.PENDING,
      },
    });

    return requests.map(request => ({
      name: request.name,
      email: request.email,
      role: request.role
    } satisfies Pick<User, "name" | "email" | "role">));
  }

  async updateJoinRequest(adminId: string, params: UpdateJoinRequestParamsDTO, body: UpdateJoinRequestBodyDTO): Promise<Pick<User, "name" | "email">> {
    const { barbershopId, userId } = params;
    const { action } = body;

    const admin = await this.userRepo.findOne({ where: { id: adminId }, relations: ["barbershop"] });
    if (!admin || admin.role !== UserRole.ADMIN || admin.barbershop?.id !== barbershopId) {
      throw { status: 403, message: "You are not authorized to manage join requests for this barbershop" };
    }

    const user = await this.userRepo.findOne({
      where: { id: userId, requestedBarbershop: { id: barbershopId } },
      relations: ["requestedBarbershop"],
    });

    if (!user || user.joinRequestStatus !== JoinRequestStatus.PENDING) {
      throw { status: 404, message: "No pending join request found for this user and barbershop" };
    }

    if (action === "approve") {
      user.barbershop = user.requestedBarbershop;
      user.joinRequestStatus = JoinRequestStatus.APPROVED;
    } else {
      user.joinRequestStatus = JoinRequestStatus.REJECTED;
    }

    user.requestedBarbershop = null;

    await this.userRepo.save(user);

    return {
      name: user.name,
      email: user.email
    } satisfies Pick<User, "name" | "email">;
  }
}
