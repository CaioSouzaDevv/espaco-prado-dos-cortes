
export const ClientCreateSchema = {
  type: "object",
  required: ["name", "phone"],
  properties: {
    name: { type: "string" },
    phone: {
      type: "string",
      pattern: "^\\d{2}9?\\d{8}$"
    },
  }
} as const;

export const ClientCreateResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
} as const;
