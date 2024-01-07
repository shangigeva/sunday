import { Schema, ValidationResult } from "joi";

const validation = <T>(
  schema: Schema,
  userInput: T
): Record<string, string> | null => {
  const { error }: ValidationResult<T> = schema.validate(userInput, {
    abortEarly: false,
  });

  if (!error) {
    return null;
  }

  const errorObj: Record<string, string> = {};
  const { details } = error;

  for (let item of details) {
    const key = item.path[item.path.length - 1] as string;
    const { message } = item;
    errorObj[key] = message;
  }

  return errorObj;
};

export default validation;
