import jwt from "jsonwebtoken";
import User from "../../data/User.js";
import * as Messages from "../constants/messages.js";

export const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send({ success: false, message: Messages.FORBIDDEN });
      }
      User.find(user.sub, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else if (data) {
          req.user = data;
          next();
        } else {
          res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
        }
      });
    });
  } else {
    res.status(401).send({ success: false, message: Messages.MISSING_ACCESS_TOKEN });
  }
};
