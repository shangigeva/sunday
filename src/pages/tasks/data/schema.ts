import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  status: z.string(),
  priority: z.string(),
  label: z.string(),
  owner: z.string(),
  TaskNumb: z.number(),
  Status: z.string(),
  __v: z.number(),
  createTime: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
