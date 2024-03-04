import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  async profile(profile) {
    return {
      id: profile.sub,
      name: profile.given_name ? profile.given_name : profile.name,
      email: profile.email,
      image: profile.picture,
      createdAt: new Date(),
    };
  },
});

const emailProvider = EmailProvider({
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
  async sendVerificationRequest(params) {
    console.log(params);
  },
});

export const authOptions: NextAuthOptions = {
  providers: [googleProvider],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      return `${baseUrl}/`;
    },
  },
  session: { strategy: "jwt" },
};
