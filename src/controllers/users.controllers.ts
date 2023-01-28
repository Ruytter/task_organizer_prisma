import { connection } from "../database/database.js";
import { Request, Response } from "express";
import { Responsavel } from "../protocols.js";
import { selectResp, insertResp } from "../repository/signup.repositories.js"
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  const newResponsavel = req.body as Responsavel
  try {
    const existingResponsaveis = await selectResp(newResponsavel.email)
    if (existingResponsaveis.rowCount > 0) {
      return res.status(409).send("E_mail já cadastrado");
    }

    const passwordHash = bcrypt.hashSync(newResponsavel.password, 10);
    await insertResp(newResponsavel.name, newResponsavel.email, passwordHash)
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
