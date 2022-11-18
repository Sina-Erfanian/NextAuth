import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  // check user is authenticated or not
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const userCollection = client.db("Auth").collection("Users");
  const user = userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User Not Found!" });
    client.close();
    return;
  }

  if (!(user.password === oldPassword)) {
    res.status(403).json({ message: "Invalid Password!" });
    client.close();
    return;
  }

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: newPassword } }
  );

  client.close();

  res.status(200).json({ message: "Password Updated!" });
}

export default handler;
