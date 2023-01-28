import prisma from "../database/database.js";
import { Tarefa, Responsavel } from "../protocols.js"; 

export function insertTask( task: Tarefa, resp: Responsavel ){
    return prisma.tarefa.create({
      data:{...task, responsavelId: resp.id,}
    })
 }

 export function selectRespTasks( id:number ){
    const data = prisma.responsavel.findFirst({
      where: { id },
      select: {
        name: true,
        tarefa: {
          select: {
            name: true,
            descricao: true,
            dia: true,
            status: true,
          }
        }
      }
    })
    return data;
 }

 export function selectrespIdTask(id: number ){
  return prisma.tarefa.findFirst({
    where: {id},
    select:{
      responsavelId: true,
    }

  })
}

 export function updateTasks(status: string, id: number){
  return prisma.tarefa.update({
    where:{
       id,
    },
    data:{
       status,
       dia: new Date,
    },
  })
  }

  export function deleteTaskById(id: number){
    return prisma.tarefa.delete({
      where:{id}
    })  
    }