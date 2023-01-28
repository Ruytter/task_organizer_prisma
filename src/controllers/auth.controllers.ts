import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Responsavel } from "../protocols.js";
import { selectResp } from "../repository/signup.repositories.js";
import { selectToken, activeSession, createSession, lockSession } from "../repository/signin.reposituries.js";
import { LoginResp } from "../protocols.js";

export async function signin(req : Request, res : Response) {
  const newLoginResp = req.body as LoginResp;
  let token:string;
  
  const  responsavel  = await selectResp(newLoginResp.email) 
  
  if (responsavel===null) {
    return res.sendStatus(401);
  }
  const  Token  = await selectToken(responsavel.id)
  console.log(Token)
  if (Token!==null) {
    token = uuid();
    await activeSession(token, responsavel.id)
  }else if(bcrypt.compareSync(newLoginResp.password, responsavel.password)) {
    token = uuid();
    await createSession(token, responsavel.id)
  }else{
    return res.sendStatus(401)
  }
  const { name } = responsavel;
  const data = {
    token,
     name
  };
  return res.status(200).send(data);
}

export async function logout(req: Request, res: Response) {
  const resp = res.locals.responsavel as Responsavel
  try {
    await lockSession(resp.id)
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}