import joi from "joi";

const taskSchema = joi.object({
  name: joi.string().required(),
  descricao: joi.string().required(),
  status: joi.string().required(),
});

export default taskSchema;
