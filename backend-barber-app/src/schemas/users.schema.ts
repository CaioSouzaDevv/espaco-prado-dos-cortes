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

export const UserLoginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  }
} as const;

export const UserLoginResponseSchema = {
  type: "object",
  properties: {
    token: { type: "string" }
  }
} as const;

export const forgotPasswordSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
  }
} as const;

export const forgotPasswordResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  }
} as const;

export const resetPasswordParamSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"]
} as const;


export const resetPasswordBodySchema = {
  type: "object",
  properties: {
    password: { type: "string", minLength: 8 },
  },
  required: ["password"]
} as const;

export const resetPasswordResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  }
} as const;
