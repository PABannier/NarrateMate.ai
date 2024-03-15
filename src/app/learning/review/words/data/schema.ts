import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const wordSchema = z.object({
  word: z.string(),
  translation: z.string(),
  definition: z.string(),
});

export type Word = z.infer<typeof wordSchema>;
