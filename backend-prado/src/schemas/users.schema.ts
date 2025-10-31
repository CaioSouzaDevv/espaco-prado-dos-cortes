import { format } from "path";

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
