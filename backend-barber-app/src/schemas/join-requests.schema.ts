export const createJoinRequestParamsSchema = {
  type: "object",
  required: ["barbershopId"],
  properties: {
    barbershopId: { type: "string", format: "uuid" },
  },
} as const;

export const updateJoinRequestParamsSchema = {
  type: "object",
  required: ["barbershopId", "userId"],
  properties: {
    barbershopId: { type: "string", format: "uuid" },
    userId: { type: "string", format: "uuid" },
  },
} as const;

export const updateJoinRequestBodySchema = {
  type: "object",
  required: ["action"],
  properties: {
    action: { type: "string", enum: ["approve", "reject"] },
  },
} as const;
