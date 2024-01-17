import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

const filterJobs = async (formData: FormData) => {
  "use server";

  // Convert the form data into an object
  const values = Object.fromEntries(formData.entries());

  // Parse the values using the jobFilterSchema to ensure they are in the correct format
  const { q, type, location, remote } = jobFilterSchema.parse(values);

  // Create a new URLSearchParams instance with the parsed values
  // If a value is present, it is added to the search parameters
  // If the 'remote' value is present, it is set to 'true'
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  // Redirect the user to a new URL that includes the search parameters
  redirect(`/?${searchParams.toString()}`);
};

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  // The distinctLocations function is an asynchronous operation that fetches all unique job locations from the database.
  // It uses Prisma's findMany method to retrieve all jobs where 'approved' is true.
  // It then selects only the 'location' field from the retrieved data.
  // The 'distinct' option is used to ensure that only unique locations are returned.
  // The result is then transformed into an array of strings, where each string is a unique location.
  // Any null or undefined locations are filtered out using the Boolean constructor as a filter function.
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              name="q"
              placeholder="Title, Company, etc."
              id="q"
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All Locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter Jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
