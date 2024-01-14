import Joi from "joi";
import validation from "./validation";
interface CreateInput {
  title: string;
}
const createTaskSchema = Joi.object({
  title: Joi.string()
    .messages({
      "string.pattern.base": "the title should be...",
      "string.empty": "title must be filled",
    })
    .min(2)
    .max(200)
    .required(),
});

const CreateTaskValidation = (inputToCheck: CreateInput) =>
  validation(createTaskSchema, inputToCheck);

export { CreateTaskValidation };
