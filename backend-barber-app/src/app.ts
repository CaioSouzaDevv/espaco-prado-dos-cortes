import "reflect-metadata";
import { AppDataSource } from "./data-source";
import fastify from "fastify";
import cors from "@fastify/cors";
import { userRouter } from "./routers/users.router";
import { clientRouter } from "./routers/clients.router";
import { joinRequestsRouter } from "./routers/join-requests.router";

const app = fastify({ logger: true });

AppDataSource.initialize()
  .then(async () => {
    console.log("Conectado ao banco!");

    app.register(cors, {});
    app.register(userRouter);
    app.register(clientRouter);
    app.register(joinRequestsRouter);

    await app.listen({ port: 8000 });
    console.log("Server started at http://localhost:8000");
  })
  .catch((error) => console.error("Erro ao conectar:", error));
