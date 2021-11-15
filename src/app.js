import { config } from "dotenv";
import express, { json } from "express";

import redis from "redis";
import JWTRedis from "jwt-redis";

// Routes
import AdvertRoutes from "./routes/Advert.js";
import OrganizationRoutes from "./routes/Organization.js";
import ApplicationRoutes from "./routes/Application.js";
import AuthRoutes from "./routes/Auth.js";

config();

const app = express();

// Libraries
app.use(json());

// Default route
app.get("/", (_, res) => {
  res.status(200);
});
// Default error handling
app.use((err, _, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).send({ success: false, message: err.message }); // Bad request
  }
});

// Db for JWT
const redisClient = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
redisClient.on("error", (err) => console.log(err));
export const jwtr = new JWTRedis.default(redisClient);

// API routes for different objects
app.use("/", AdvertRoutes);
app.use("/", OrganizationRoutes);
app.use("/", ApplicationRoutes);
app.use("/auth", AuthRoutes);

// Select on which port the server will run
let port = process.env.PORT || 5000;

// Run server command
app.listen(port, () => {
  console.log(`Server running (PORT: ${port})`);
});
