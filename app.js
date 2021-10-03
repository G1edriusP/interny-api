import express, { json } from "express";
import AdvertRoutes from "./routes/Advert.js";

const app = express();
app.use(json());

app.get("/", (req, res, next) => {
  res.status(200);
});

app.use("/", AdvertRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`Server is running`);
});
