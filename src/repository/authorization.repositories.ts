import {connection} from "../database/database.js";

export function selectSession(token: string){
   return connection.query(
    `SELECT *  FROM sessions WHERE token = $1`,
    [token]
  );
}

export function selectRespBySessionRespId(responsavelId: number){
    return connection.query(
        `SELECT * FROM responsavel WHERE id = $1 `,
        [responsavelId]
      );
 }





