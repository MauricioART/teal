import NextAuth, { NextAuthConfig, Session, User } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"
import { createUser } from "./app/lib/actions";
import { use } from "react";
import { getUser } from "./app/lib/data";


interface CustomToken extends JWT {
    id?: string;
  }
  
  interface CustomSession extends Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

//import PostgresAdapter from "@auth/pg-adapter"

//import { Pool } from "pg"

export const BASE_PATH = "api/auth";

/*const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})
 */

const authConfig: NextAuthConfig = {
    providers:[Google, GitHub],
    callbacks: {
        async jwt({ token, user }): Promise<CustomToken> {
          if (user) { // User is available during sign-in
            token.id = user.id as string;
            const fetchedUser = await getUser(user.email as string);
            if (fetchedUser == null){
              const newUserId = await createUser(user.name as string, user.email as string, user.image as string);  
              token.id = newUserId;
            }
            else
              token.id = fetchedUser.user_id;

          }
          return token;
        },
        async session({ session, token }): Promise<CustomSession> {
          session.user.id = token.id as string;
          return session;
        },
      },
    
} 


//basePath: BASE_PATH,
    //secret: process.env.AUTH_SECRET,
    //adapter: PostgresAdapter(pool),

export const { handlers, signIn, signOut, auth} = NextAuth(authConfig)