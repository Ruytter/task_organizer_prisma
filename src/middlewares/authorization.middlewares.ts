import { selectSession, selectRespBySessionRespId } from "../repository/authorization.repositories.js"
import { Request, Response, NextFunction } from "express";

export async function authValidation(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token.");
  }

  try {
    const sessions = await selectSession(token)

    if (!sessions) {
      return res.status(401).send("Session not found");
    }

    if(!sessions.active){
      return res.status(401).send("Nescessário fazer login no sistema");
    }

    const responsavel = await selectRespBySessionRespId(sessions.responsavelId) 

    if (!responsavel) {
      return res.status(401).send("Responsavel not found.");
    }

    res.locals.responsavel = responsavel;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
