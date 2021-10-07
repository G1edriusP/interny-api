import express, { json } from "express";
import AdvertRoutes from "./src/routes/Advert.js";
import OrganizationRoutes from "./src/routes/Organization.js";
import ApplicationRoutes from "./src/routes/Application.js";

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

// Select on which port the server will run
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// Run server command
app.listen(port, () => {
  console.log(`Server running (PORT: ${port})`);
});
