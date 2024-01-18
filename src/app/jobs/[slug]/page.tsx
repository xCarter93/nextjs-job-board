// Importing necessary libraries and components
import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";

// Defining the props for the Page component
interface PageProps {
  params: { slug: string };
}

// Function to get a job from the database using its slug
const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  // If the job is not found, return a 404 error
  if (!job) notFound();

  return job;
});

// Function to generate static params for all approved jobs
export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

// Function to generate metadata for a job page
export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

// The main Page component
export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  // Extracting applicationEmail and applicationUrl from the job
  const { applicationEmail, applicationUrl } = job;

  // Creating the application link
  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  // If there is no application link or email, return a 404 error
  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  // Rendering the main component
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
