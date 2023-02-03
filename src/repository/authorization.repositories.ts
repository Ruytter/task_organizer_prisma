import prisma from "../database/database";

export function selectSession(token: string){
   return prisma.sessions.findFirst({
    where:{
      token
    }
   })
}

export function selectRespBySessionRespId(id: number){
    return prisma.responsavel.findFirst({
      where:{
        id
      }
    })
 }





