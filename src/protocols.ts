export type Responsavel = {
  id: number,
  name: string,
  email: string,
  password: string,
  createdAt: Date
}

export type LoginResp = {
  email: string,
  password: string
}

export type Sessions = {
 id?: number,
 responsavelId: number,
 token: string,
 createdAt?: Date
}

export type Tarefa = {
 id: number,
 responsavelId: number,
 name: string,
 descricao: string, 
 dia: Date,
 status: string,
 createdAt: Date
 }
