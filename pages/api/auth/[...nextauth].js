import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credential) {
        const client = await connectToDatabase();
        const userCollection = client.db("Auth").collection("Users");
        const user = await userCollection.findOne({ email: credential.email });

        if (!user) {
          client.close();
          throw new Error("No User Found!");
        }

        if (!(user.password === credential.password)) {
          client.close();
          throw new Error("Could not log in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
