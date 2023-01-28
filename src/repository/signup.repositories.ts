import { Responsavel } from './../protocols';
import prisma from "../database/database.js"

export function selectResp(email: string){
   return prisma.responsavel.findFirst({
    where:{
      email
    }
   })
}

export function insertResp(resp: Responsavel){
  console.log(resp)
   return prisma.responsavel.create({
    data:resp,
   })
}