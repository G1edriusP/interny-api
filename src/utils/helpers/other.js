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

export const checkRequired = (requiredKeys, allKeys, body, res) => {
  const valid = requiredKeys.every((key) => {
    if (Object.keys(body).includes(key)) {
      return true;
    } else {
      res
        .status(400)
        .send({ success: false, message: Messages.REQUIRED_KEY(key) });
      return false;
    }
  });

  // if (valid) {
  //   const res = {};
  //   allKeys.forEach((key) => {
  //     if (Object.keys(body).includes(key)) {
  //       res[key] = body[key];
  //     } else {
  //       res[key] = null;
  //     }
  //   });
  //   return res;
  // }

  return valid ? body : undefined;
};
