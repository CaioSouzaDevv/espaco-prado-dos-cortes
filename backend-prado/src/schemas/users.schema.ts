export const UserCreateSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    name: { type: "string" },
  },
} as const;

export const UserResponseSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    name: { type: "string" },
  },
} as const;
