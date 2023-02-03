import { Responsavel } from './../protocols';
import prisma from "../database/database"

export function selectResp(email: string){
   return prisma.responsavel.findFirst({
    where:{
      email
    }
   })
}

export function insertResp(resp: Responsavel){
   return prisma.responsavel.create({
    data:resp,
   })
}