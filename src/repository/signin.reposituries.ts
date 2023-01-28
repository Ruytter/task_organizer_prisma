import {connection} from "../database/database.js";

export function selectToken(userId: number){
   return connection.query(
    `SELECT token FROM sessions WHERE "responsavelId" = $1`,
    [userId]
  );
}

export function activeSession(token: string, respId: number){
    return connection.query(
        `UPDATE sessions SET "active" = true, "token" = $1 WHERE "responsavelId" = $2`,
        [token, respId]
      );
 }

 export function createSession(token: string, respId: number){
    return connection.query(  `
     INSERT INTO sessions (token, "responsavelId") VALUES ($1, $2)`,
        [token, respId]
      );
 }

 export function lockSession(respId: number){
  return connection.query(
      `UPDATE sessions SET "active" = false WHERE "responsavelId" = $1`,
      [respId]
    );
}


 