import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI as string);
const db = client.db('kenlivo-web-app');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
});