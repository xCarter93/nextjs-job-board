// Import PrismaClient from the Prisma package
import { PrismaClient } from "@prisma/client";

// Define a function that creates a new instance of PrismaClient
// This function is used to establish a connection to the database
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global variable 'prisma' that can be either undefined or an instance of PrismaClient
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// If 'prisma' is already defined in the global scope, use it. Otherwise, create a new instance
const prisma = global.prisma ?? prismaClientSingleton();

// Export 'prisma' so it can be used in other parts of the application
export default prisma;

// If the application is not running in production mode, assign the 'prisma' instance to the global scope
// This is done to prevent multiple instances of PrismaClient in development mode
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
