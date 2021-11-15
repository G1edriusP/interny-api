import User from "../../data/User.js";
import * as Messages from "../constants/messages.js";
import { jwtr } from "../../app.js";

export const jwtMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const tokenPayload = await jwtr.verify(token, process.env.SECRET_KEY);
      User.find(tokenPayload.sub, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else if (data) {
          req.user = data;
          next();
        } else {
          res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
        }
      });
    } catch (e) {
      res.status(403).send({ success: false, message: Messages.FORBIDDEN });
    }
  } else {
    res.status(401).send({ success: false, message: Messages.MISSING_ACCESS_TOKEN });
  }
};
