import { connectDb } from "../../../src/mongodb/mongoDb";
import User from "../../../src/mongodb/schemas/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // checking the request is valid or spam
  if (
    req.headers["sec-fetch-site"] === "none" ||
    req.headers["sec-fetch-site"] === "cross-site" ||
    req.headers["postman-token"]
  ) {
    res.json({
      message: "Unauthorized",
    });
  }
  try {
    //connect database
    await connectDb();

    //checking the method
    if (req.method === "POST") {
      try {
        //Checking that user is already exist or not

        const email = req.body.email;
        const findUser = await User.findOne({ email });
        if (findUser?._id) {
          res.status(409).json({ message: "Email already exist" });
        } else {
          // inserting new user to database
          const user = new User(req.body);
          const createUser = await user.save({
            writeConcern: { w: "majority" },
          });
          if (createUser?._id) {
            // creating user token
            const token = jwt.sign(
              { userId: createUser._id },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            res.status(200).json({ token });
          } else {
            res.status(404).json({ message: "Something went wrong" });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ ...error });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (e) {
    console.error(e);
  }
}
