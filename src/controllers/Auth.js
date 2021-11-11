// JWT stuff
import redis from "redis";
import JWTR from "jwt-redis";

// Database
import User, { requiredKeys, allKeys } from "../data/User.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId, checkRequired } from "../utils/helpers/other.js";

var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

const postLogin = async (_, res) => {};

export default {};
