import { Request, Response } from "express";
import { Tarefa, Responsavel } from "../protocols.js";
import { insertTask, selectRespTasks, updateTasks, deleteTaskById, selectrespIdTask } from "../repository/task.repositories.js"

export async function createTask(req: Request, res: Response) {
  const newTask = req.body as Tarefa
  const resp = res.locals.responsavel as Responsavel

  try {
    await insertTask(newTask, resp)
    return res.status(201).send("Tarefa agendada com sucesso!")
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

export async function selectTasks(req: Request, res: Response) {
    const resp = res.locals.responsavel as Responsavel
    try {
     const tasks = await selectRespTasks(resp.id)
      return res.status(200).send(tasks)
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  export async function updateTaskStatus(req: Request, res: Response) {
    const resp = res.locals.responsavel as Responsavel
    const  { id } = req.params
    const { status } = req.body
    console.log(status)
    try {
      const task = await selectrespIdTask(Number(id))
      if (task === null){
        return res.status(406).send("Tarefa não encontrada")
      }
      if(resp.id !== task.responsavelId){
        return res.status(403).send("Esta tarefa não é de sua responsabilidade")
      }
      await updateTasks(status, Number(id))
      return res.status(201).send("Status da tarefa atualizado com sucesso")
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  export async function deleteTask(req: Request, res: Response) {
    const resp = res.locals.responsavel as Responsavel
    const  { id } = req.params
    try {
      const task = await selectrespIdTask(Number(id))
      if (task === null){
        return res.status(406).send("Você está tentando deletar uma tarefa inesistente")
      }
      if(resp.id !== task.responsavelId){
        return res.status(403).send("Esta tarefa não é de sua responsabilidade")
      }
      await deleteTaskById(Number(id))
      res.status(200).send("Tarefa excluida")
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }