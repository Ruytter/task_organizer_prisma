import prisma from "../database/database.js";
export function selectToken(responsavelId: number){
   return prisma.sessions.findFirst({
      select:{
         token: true,
      },
      where:{
         responsavelId
      }
   })
}

export function activeSession(token: string, responsavelId: number){
    return prisma.sessions.update({
      where:{
         responsavelId,
      },
      data:{
         active: true,
         token,
      },
    })
 }

 export function createSession(token: string, responsavelId: number){
    return prisma.sessions.create({
      data:({
         token,
         responsavelId
      })
    })
 }

 export function lockSession(responsavelId: number){
  return prisma.sessions.update({
   where:{
      responsavelId,
   },
   data:{
      active: false,
   },
 })
}


 