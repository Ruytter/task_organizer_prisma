import { Request, Response } from "express";
import { Responsavel } from "../protocols";
import { selectResp, insertResp } from "../repository/signup.repositories"
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  const newResponsavel = req.body as Responsavel
  try {
    const existingResponsaveis = await selectResp(newResponsavel.email)
    if (existingResponsaveis!==null) {
      return res.status(409).send("E_mail já cadastrado");
    }

    const passwordHash = bcrypt.hashSync(newResponsavel.password, 10);
    newResponsavel.password = passwordHash;
    await insertResp(newResponsavel)
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
