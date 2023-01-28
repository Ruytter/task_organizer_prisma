import {connection} from "../database/database.js";

export function selectResp(email){
   return connection.query(
        `SELECT * FROM responsavel WHERE email = $1 `,
        [email]
      );
}

export function insertResp(name, email, password){
   return connection.query(
        `INSERT INTO responsavel (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, password]
      );
}