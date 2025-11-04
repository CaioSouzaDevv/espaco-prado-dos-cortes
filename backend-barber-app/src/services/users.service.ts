import { AppDataSource } from "../data-source";
import { forgotPasswordDTO, resetPasswordBodyDTO, resetPasswordParamsDTO, userCreateDTO, userLoginDTO } from "../dtos/users.dto";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";
import { Barbershop } from "../entity/Barbershop";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private barbershopRepo = AppDataSource.getRepository(Barbershop);

  async userCreate(data: userCreateDTO): Promise<User> {
    const { name, email, password, role, barbershopId } = data;

    const existingEmail = await this.userRepo.findOneBy({ email });
    if (existingEmail) {
      throw { status: 409, message: "email is already is use" }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let barbershop = null;
    if (barbershopId) {
      barbershop = await this.barbershopRepo.findOneBy({ id: barbershopId });
      if (!barbershop) {
        throw { status: 404, message: "Barbershop not found" };
      }
    }

    const user = this.userRepo.create({ name, email, passwordHash, role, barbershop });
    await this.userRepo.save(user);

    return user
  }

  async userLogin(data: userLoginDTO): Promise<string> {
    const { email, password } = data;

    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw { status: 404, message: "Invalid credentials" };
    }

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isMatchPassword) {
      throw { status: 404, message: "Invalid credentials" };
    }

    const payload = {
      id: user.id,
      name: user.name
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
    return token;
  }

  async forgotPassword(data: forgotPasswordDTO): Promise<void> {
    const { email } = data;
    console.log(email);

    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await this.userRepo.save(user);

    const resetLink = `http://localhost:8000/auth/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Espaço Prado" < ${process.env.SMTP_USER}> `,
        to: email,
        subject: "Recuperação de Senha",
        html: `
      <h1> Recuperação de Senha </h1>
      <p> Você solicitou a recuperação de senha.</p>
      <p> Clique no link abaixo para redefinir sua senha: </p>
      <a href = "${resetLink}" > Redefinir Senha </a>
      <p> Este link expira em 1 hora.</p>
      <p> Se você não solicitou isso, ignore este email.</p>
      `,
      });

      return;
    } catch (err) {
      throw { error: 500, message: "Error sending code. Please try again later." }
    }
  }

  async resetPassword(dataParams: resetPasswordParamsDTO, dataBody: resetPasswordBodyDTO): Promise<void> {
    const { token } = dataParams;
    const { password } = dataBody;

    const user = await this.userRepo.findOne({ where: { resetToken: token } });

    if (!user || !user.expiresAt || user.expiresAt < new Date()) {
      throw { status: 400, message: "Token is invalid or has expired." };
    }

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);
    if (isMatchPassword) {
      throw { status: 409, message: "The new password cannot be the same as the current password." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.passwordHash = passwordHash;
    user.resetToken = null;
    user.expiresAt = null;
    await this.userRepo.save(user);

    return;
  }
} 
