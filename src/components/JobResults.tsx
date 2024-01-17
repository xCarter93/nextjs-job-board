// Importing necessary modules and components
import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Defining the props for the JobResults component
interface JobResultsProps {
  filterValues: JobFilterValues;
}

// The JobResults component
export default async function JobResults({
  filterValues: { q, type, location, remote },
}: JobResultsProps) {
  // Creating a search string from the query
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  // Defining the search filter for the Prisma query
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
          { type: { search: searchString } },
        ],
      }
    : {};

  // Defining the where clause for the Prisma query
  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  // Fetching jobs from the database using Prisma
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Rendering the jobs or a message if no jobs were found
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => {
        return <JobListItem key={job.id} job={job} />;
      })}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
