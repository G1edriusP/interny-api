// Response messages
import * as Messages from "../../utils/constants/messages.js";

export const checkId = (req, res, idName = "id") => {
  let id = req.params[idName];
  if (isNaN(id)) {
    res.status(400).send({ success: false, message: Messages.ID_NOT_SET });
    return undefined;
  } else {
    return JSON.parse(id);
  }
};
