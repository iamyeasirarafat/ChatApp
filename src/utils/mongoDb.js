import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};
const dbConnect = async () => {
  const client = new MongoClient(uri, options);
  const clientPromise = await client.connect();

  return clientPromise;
};

export default dbConnect;
