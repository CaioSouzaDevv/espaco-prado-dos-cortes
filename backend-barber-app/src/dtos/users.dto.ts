import { UserRole } from "../entity/User";

export interface userCreateDTO {
  name: string,
  email: string,
  password: string
  role?: UserRole,
  barbershopId?: string
}

export interface userLoginDTO extends Pick<userCreateDTO, "email" | "password"> { }

export interface forgotPasswordDTO extends Pick<userCreateDTO, "email"> { }

export interface resetPasswordParamsDTO {
  token: string,
}

export interface resetPasswordBodyDTO {
  password: string
}
