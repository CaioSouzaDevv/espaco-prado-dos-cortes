export interface userCreateDTO {
  name: string,
  email: string,
  password: string
}

export interface userLoginDTO extends Pick<userCreateDTO, "email" | "password"> { }

export interface forgotPasswordDTO extends Pick<userCreateDTO, "email"> { }
