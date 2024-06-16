import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";


export const sqlClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(sqlClient, {schema, logger:true});


