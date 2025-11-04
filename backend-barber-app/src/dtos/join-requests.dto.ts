export interface CreateJoinRequestParamsDTO {
  barbershopId: string;
}

export interface UpdateJoinRequestParamsDTO {
  barbershopId: string;
  userId: string;
}

export interface UpdateJoinRequestBodyDTO {
  action: "approve" | "reject";
}
