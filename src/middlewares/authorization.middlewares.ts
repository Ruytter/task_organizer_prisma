import { selectSession, selectRespBySessionRespId } from "../repository/authorization.repositories.js"
import { Request, Response, NextFunction } from "express";

export async function authValidation(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token.");
  }

  try {
    const { rows: sessions } = await selectSession(token) 
   
    const [session] = sessions;

    if (!session) {
      return res.status(401).send("Session not found");
    }

    if(!session.active){
      return res.status(401).send("Nescessário fazer login no sistema");
    }

    const { rows: responsaveis } = await selectRespBySessionRespId(session.responsavelId) 
    
    const [ responsavel] = responsaveis;

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
