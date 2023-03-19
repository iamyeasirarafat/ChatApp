import { connectDb } from "../../../src/mongodb/mongoDb";
import User from "../../../src/mongodb/schemas/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        //Checking that user is  exist or not
        const email = req.body.email;
        const password = req.body.password;
        const findUser = await User.findOne({ email });
        if (findUser?._id) {
          //varifying user password
          // Verify the user's password
          if (await bcrypt.compare(password, findUser?.password)) {
            // creating user token
            const token = jwt.sign(
              { userId: findUser._id },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            res.status(200).json({ message: "Login successful", token });
          } else {
            res.status(401).json({ message: "Invalid  password" });
          }
        } else {
          res.status(401).json({ message: "User not found" });
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
