import { config } from "dotenv";
import express, { json } from "express";

// Routes
import AdvertRoutes from "./routes/Advert.js";
import OrganizationRoutes from "./routes/Organization.js";
import ApplicationRoutes from "./routes/Application.js";
import OtherRoutes from "./routes/Other.js";

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

// API routes for different objects
app.use("/", AdvertRoutes);
app.use("/", OrganizationRoutes);
app.use("/", ApplicationRoutes);
app.use("/", OtherRoutes);

// Select on which port the server will run
let port = process.env.PORT || 5000;

// Run server command
app.listen(port, () => {
  console.log(`Server running (PORT: ${port})`);
});
