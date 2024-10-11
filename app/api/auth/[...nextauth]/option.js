import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; 
import { connectDB } from "@/lib/mongo";
import { User } from "@/lib/mongo/model/user";
import bcrypt from 'bcryptjs';
import Github from "next-auth/providers/github";

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                
                if (!user) {
                    const np=await bcrypt.hash(credentials.password,10);
                  const add=await User.create({
                    email: credentials.email,
                    password: np,

                  });
                  return add;
                }
              
                if (!credentials.password || typeof credentials.password !== 'string') {
                  throw new Error("Invalid password provided");
                }
              
                if (!user.password || typeof user.password !== 'string') {
                  throw new Error("User has no password set");
                }
              
                const isValid = await bcrypt.compare(credentials.password, user.password);
              
                if (isValid) {
                  return user;
                } else {
                  throw new Error("Invalid credentials");
                }
            }  
        }),
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL       
        })
    ] ,

    // if you want to use default next js signin page then comment out the pages object
    pages:{
        signIn:"/auth/signin"
    },
    secret:process.env.NEXTAUTH_SECRET,
    
    callbacks:{
        signIn:async({user,account})=>{
            if(user.email==="rahul@gmail.com"){
                return false;
            }

            if (account && account.provider === "github") {
                await connectDB();
                if (user && user.email) {
                    const existingUser = await User.findOne({ email: user.email });
                    if (existingUser) {
                        return true;
                    } else {
                        const newUser = await User.create({
                            email: user.email,
                            profileImg: user.image,
                        });
                        return !!newUser;
                    }
                }
            }
            return true;
        },
        jwt:async(token,user)=>{

            // if(user){
            //     token.id = user._id;
            // }
            return token;
        },
        session:async(session,token)=>{
            // if(token){
            //     session.id = token.id;
            // }
            return session;
        }
    }

}