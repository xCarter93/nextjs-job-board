// Importing zod library for schema validation
import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "Image must be smaller than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Must provide an email or url",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid Location Type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100, "Must be 100 characters or less"),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid Job Type",
    ),
    companyName: requiredString.max(100, "Must be 100 characters or less"),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(9, "Must be 9 digits or less"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

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
