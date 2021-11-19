// JWT stuff
import { jwtr } from "../app.js";

// Database
import User, { requiredKeys, allKeys } from "../data/User.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

import { checkRequired } from "../utils/helpers/other.js";

const getAllUsers = async (req, res) => {
  User.getAll(["id", "email", "name", "surname", "role"], (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

const postUser = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    const params = checkRequired(requiredKeys, allKeys, data, res);
    if (params) {
      const user = new User(params);
      User.create(user, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    }
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  User.getAll(["id", "email", "name", "surname", "password"], async (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const user = users.find((u) => u.email === email);
      if (user) {
        // TODO: NORMAL passwords check, then generate an access token
        if (user.password === password) {
          const accessToken = await jwtr.sign(
            {
              sub: user.id,
              name: `${user.name} ${user.surname}`,
            },
            process.env.SECRET_KEY,
            { expiresIn: "2h" }
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
    try {
      const tokenPayload = await jwtr.verify(token, process.env.SECRET_KEY);
      const isDestroyed = await jwtr.destroy(tokenPayload.jti);
      res.status(200).send({ success: true });
    } catch (e) {
      res.status(401).send({ success: false, message: Messages.EXPIRED });
    }
  } else {
    res.status(401).send({ success: false, message: Messages.MISSING_ACCESS_TOKEN });
  }
};

export default {
  postLogin,
  postUser,
  getAllUsers,
  postLogout,
};
