import { Client, Account, ID, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6873ee3f000887f687eb");
export const account = new Account(client);
export const DATABASE = new Databases(client);
console.log("DATABASE: ", DATABASE);
export const UNIQUE_ID = ID.unique();
