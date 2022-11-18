import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    if (!email || !password || password.trim().length < 7) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db("Auth");

    const existingUser = await db.collection("Users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exist already!" });
      client.close();
      return;
    }

    const result = await db.collection("Users").insertOne({
      email: email,
      password: password,
    });

    res.status(201).json({ message: "Created User!" });
    client.close();
  }
}

export default handler;
