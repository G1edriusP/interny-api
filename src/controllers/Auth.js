import { createRequire } from "module";

// JWT stuff
import jwt from "jsonwebtoken";

// Database
import User, { requiredKeys, allKeys } from "../data/User.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId, checkRequired } from "../utils/helpers/other.js";

const getAllUsers = async (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  User.getAll((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const user = users.find((u) => u.email === email);
      if (user) {
        // TODO: NORMAL passwords check, then generate an access token
        if (user.password === password) {
          const accessToken = jwt.sign(
            {
              sub: user.id,
              name: `${user.name} ${user.surname}`,
              iat: Math.floor(Date.now() / 1000),
            },
            process.env.SECRET_KEY
          );
          res.status(200).send({ accessToken });
        } else {
          res.status(401).send({ success: false, message: Messages.PASSWORDS_DONT_MATCH });
        }
      } else {
        res.status(404).send({ success: false, message: Messages.USER_NOT_FOUND });
      }
    }
  });
};

const postLogout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Somehow handle token deletion");
  } else {
    res.status(401).send({ success: false, message: Messages.MISSING_ACCESS_TOKEN });
  }
};

export default {
  postLogin,
  getAllUsers,
  postLogout,
};
