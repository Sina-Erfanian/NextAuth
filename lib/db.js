import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://sina:sina.er1381@cluster0.m5gsl2i.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}
