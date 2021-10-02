import express, { json } from "express";

// Mock data
import { ADVERTS } from "./data/Advert.js";

const app = express();
app.use(json());

// -----
// GET adverts
app.get("/adverts", (req, res, next) => {
  res.status(200).send(ADVERTS);
});

// GET advert
app.get("/adverts/:id", (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const advert = ADVERTS.find((ad) => ad.id === id);
  res.status(200).send(advert);
});

// POST advert
app.post("/adverts", (req, res, next) => {
  const data = req.body;
  res.status(201).send(data);
});

// PATCH advert
app.patch("/adverts/:id", (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const advert = ADVERTS.find((ad) => ad.id === id);
  const updatedAdvert = { ...advert, ...data };
  res.status(200).send(updatedAdvert);
});

// DELETE advert
// app.post("/adverts/:id", (req, res, next) => {
//   const data = req.body;
//   res.status(201).send(data);
// });
// -----

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`Server is running`);
});
