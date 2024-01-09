// Import placeholderJobs from placeholder-data file
const { placeholderJobs } = require("./placeholder-data");

// Import PrismaClient from @prisma/client
const { PrismaClient } = require("@prisma/client");

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Define an async function main
async function main() {
  // Use Promise.all to execute multiple promises in parallel
  // For each job in placeholderJobs, upsert (update or insert) it into the database
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await prisma.job.upsert({
        where: {
          slug: job.slug,
        },
        // If the job exists, update it
        update: job,
        // If the job doesn't exist, create it
        create: job,
      });
    }),
  );
}

// Call the main function
main()
  .then(async () => {
    // If the main function is successful, disconnect from the Prisma Client
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // If there's an error, log the error, disconnect from the Prisma Client, and exit the process with a failure status code
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
