import dbConnect from "../../../src/utils/mongoDb";
export default async function handler(req, res) {
  try {
    const dbConnection = await dbConnect();
    const db = dbConnection.db("ChatApp");
    const userCollection = db.collection("users");
    if (req.method === "POST") {
      try {
        const createUser = await userCollection.insertOne(req.body);
        res.status(200).json({
          ...createUser,
        });
      } catch (error) {
        res.status(500).json({ ...error });
      }
    }
  } catch (e) {
    console.error(e);
  }

  //   if (
  //     req.headers["sec-fetch-site"] === "none" ||
  //     req.headers["sec-fetch-site"] === "cross-site" ||
  //     req.headers["postman-token"]
  //   ) {
  //     res.json({
  //       message: "Unauthorized",
  //     });
  //   }
  //   if ((req.method = "GET" && req.query.id)) {
  //     const data = await getCustomer(req.query.id);
  //     res.status(200).json({
  //       ...data,
  //     });
  //   }
}
