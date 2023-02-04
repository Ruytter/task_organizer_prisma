import { response } from "express";
import supertest from "supertest";
import server from "../src/app";
import prisma from "../src/database/database";
import { Tarefa, Responsavel } from "../src/protocols"; 
import { sessions, responsavel } from "@prisma/client";
import { v4 as uuid } from "uuid";

const api = supertest(server);

beforeAll(async () => {
  await prisma.tarefa.deleteMany();
  await prisma.sessions.deleteMany();
  await prisma.responsavel.deleteMany();
});

describe("Testando a api", () => {
  let token;
  let id;

  it("Testando POST: /signup respond with status 422 if invalid body", async () => {
    const result = await api.post("/signup").send({
      email: "rejane@gmail.com",
      password: "123456",
    });
    expect(result.statusCode).toBe(422);
  });

  it("Testando POST: /signup", async () => {
    const result = await api.post("/signup").send({
      name: "Rejane",
      email: "rejane@gmail.com",
      password: "123456",
    });
    expect(result.statusCode).toBe(201);
  });

  it("Testando POST: /signin", async () => {
    const result = await api.post("/signin").send({
      email: "rejane@gmail.com",
      password: "123456",
    });
    token = result.body.token;
    expect(result.statusCode).toBe(200);
  });

  describe("Tasks routers", () => {
    it("POST: /createtask respond with status 401 if no token", async () => {
      const result = await api.post("/createtask").send({
        name: "Limpar a cozinha",
        descricao:
          "Lavar a louça, varrer e passar pano no chão limpar os armarios",
        status: "Em espera",
      });
      expect(result.statusCode).toBe(401);
    });

    it("POST: /createtask respond with status 201 if token", async () => {
      const result = await api
        .post("/createtask")
        .send({
          name: "Limpar a cozinha",
          descricao:
            "Lavar a louça, varrer e passar pano no chão limpar os armarios",
          status: "Em espera",
        })
        .set("authorization", `Bearer ${token}`);
      expect(result.statusCode).toBe(201);
    });

    it("POST: /:id respond with status 201 if token", async () => {
      const task = await prisma.tarefa.findFirst();
      id = task.id;
      const result = await api
        .put(`/${id}`)
        .send({
          status: "Em execução",
        })
        .set("authorization", `Bearer ${token}`);
      expect(result.statusCode).toBe(201);
    });

    it("DELETE: /:id respond with status 403 if the task is someone else's responsibility", async () => {
      await api.post("/signup").send({
        name: "Joana",
        email: "joana@gmail.com",
        password: "654321",
      });
      const token2 = await api.post("/signin").send({
        email: "joana@gmail.com",
        password: "654321",
      });
      const task = await prisma.tarefa.findFirst();
      id = task.id
      console.log(task)
      const result = await api
        .delete(`/${id}`)
        .set("authorization", `Bearer ${token2.body.token}`);
      expect(result.statusCode).toBe(403);
    });

    it("DELETE: /:id respond with status 200 if token", async () => {
      const result = await api
        .delete(`/${id}`)
        .set("authorization", `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
  });
});
