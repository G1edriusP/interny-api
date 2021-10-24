// Response messages
import * as Messages from "../../utils/constants/messages.js";

export const checkId = (req, res, idName = "id") => {
  let id = req.params[idName];
  if (!Number(id) || isNaN(id)) {
    res.status(400).send({ success: false, message: Messages.ID_NOT_SET });
    return undefined;
  } else {
    return JSON.parse(id);
  }
};

export const checkRequired = (keys, body, res) => {
  const valid = keys.every((key) => {
    if (Object.keys(body).includes(key)) {
      return true;
    } else {
      res
        .status(400)
        .send({ success: false, message: Messages.REQUIRED_KEY(key) });
      return false;
    }
  });

  return valid ? body : undefined;
};
