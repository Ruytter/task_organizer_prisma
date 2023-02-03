import { response } from "express";
import supertest from "supertest";
import server from "../src/app";
import prisma from "../src/database/database";

const api = supertest(server);

beforeAll(async () => {
  await prisma.tarefa.deleteMany();
  await prisma.sessions.deleteMany();
  await prisma.responsavel.deleteMany();
});

describe("Testando a api", () => {
  let token;
  
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
      const result = await api.post("/creattask").send({
        name: "Limpar a cozinha",
        descricao:
          "Lavar a louça, varrer e passar pano no chão limpar os armarios",
        status: "Em espera",
      });
      expect(result.statusCode).toBe(401);
    });

    it("POST: /createtask respond with status 201 if token", async () => {
      const result = await api.post("/creattask").send({
        name: "Limpar a cozinha",
        descricao:
          "Lavar a louça, varrer e passar pano no chão limpar os armarios",
        status: "Em espera",
      }).set("authorization", `Bearer ${token}`);
      expect(result.statusCode).toBe(201);
    });

    it("POST: /1 respond with status 201 if token", async () => {
      const result = await api.put("/1").send({
        status: "Em execução",
      }).set("authorization", `Bearer ${token}`);
      expect(result.statusCode).toBe(201);
    });
  });
});
