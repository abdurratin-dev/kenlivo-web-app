import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI as string);
const db = client.db("kenlivo-web-app");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: { 
    google: { 
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
});
