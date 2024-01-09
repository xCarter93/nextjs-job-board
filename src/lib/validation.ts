// Importing zod library for schema validation
import { z } from "zod";

// Defining a schema for job filter using zod. This schema will be used to validate the job filter data.
// The schema includes four optional fields: q, type, location, and remote.
export const jobFilterSchema = z.object({
  // q: optional string, can be used for search queries
  q: z.string().optional(),
  // type: optional string, can be used to filter jobs by type
  type: z.string().optional(),
  // location: optional string, can be used to filter jobs by location
  location: z.string().optional(),
  // remote: optional boolean, can be used to filter jobs by remote availability
  remote: z.coerce.boolean().optional(),
});

// Defining a type JobFilterValues based on the jobFilterSchema.
// This type will be inferred from the jobFilterSchema and can be used wherever we need to refer to the type of job filter data.
export type JobFilterValues = z.infer<typeof jobFilterSchema>;
