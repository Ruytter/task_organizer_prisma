import {connection} from "../database/database.js";
import { Tarefa, Responsavel } from "../protocols.js";
 import dayjs from "dayjs";
 

export function insertTask( task: Tarefa, resp: Responsavel ){
    const { name, descricao, status} = task
    return connection.query(
         `INSERT INTO tarefa ("responsavelId", name, descricao, status) VALUES ($1, $2, $3, $4)`,
         [resp.id, name, descricao, status]
       );
 }

 export function selectRespTasks(resp: Responsavel ){
    const { id } = resp
    return connection.query(
         `SELECT r.name AS responsavel, t.name as tarefa, t.descricao, t.dia, t.status FROM responsavel r JOIN tarefa t  ON r.id = t."responsavelId" WHERE r.id = $1`,
         [id]
       );
 }

 export function selectrespIdTask(id: number ){
  return connection.query(
       `SELECT "responsavelId" FROM tarefa  WHERE id = $1`,
       [id]
     );
}

 export function updateTasks(status: string, id: number){
  return connection.query(
       `UPDATE "tarefa" SET status = $1, dia = $2 WHERE id = $3`,
       [status, dayjs().format('DD/MM/YYYYTHH:mm:ss'), id]
     );

  }

  export function deleteTaskById(id: number){
    return connection.query(
         `DELETE FROM tarefa WHERE id = $1`,
         [id]
       );
  
    }