import { AppDataSource } from "../data-source";
import { forgotPasswordDTO, userCreateDTO, userLoginDTO } from "../dtos/users.dto";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async userCreate(data: userCreateDTO) {
    const { name, email, password } = data;

    const existingEmail = await this.userRepo.findOneBy({ email });
    if (existingEmail) {
      throw { status: 409, message: "email is already is use" }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({ name, email, passwordHash });
    await this.userRepo.save(user);

    return user
  }

  async userLogin(data: userLoginDTO) {
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

  async forgotPassword(data: forgotPasswordDTO) {
    const { email } = data;
    console.log(email);

    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      return;
    }

    user.resetToken = crypto.randomBytes(32).toString("hex");
    user.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await this.userRepo.save(user);

    const resetLink = `http://localhost:8000/reset-password?token=${user.resetToken}`;

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
      const info = await transporter.sendMail({
        from: `"Espaço Prado" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Recuperação de Senha",
        html: `
      <h1>Recuperação de Senha</h1>
      <p>Você solicitou a recuperação de senha.</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}">Redefinir Senha</a>
      <p>Este link expira em 1 hora.</p>
      <p>Se você não solicitou isso, ignore este email.</p>
    `,
      });
      console.log(info);

      return;
    } catch (err) {
      throw { error: 500, message: "Erro ao enviar codigo, tente novamente mais tarde." }
    }
  }
}
