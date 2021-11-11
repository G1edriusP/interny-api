import env from "dotenv";
env.config({ debug: process.env.DEBUG });

import express from "express";
const auth = express();

// Select on which port the server will run
let port = process.env.AUTH_PORT;
if (port == null || port == "") {
  port = 8006;
}

auth.listen(port, () => {
  console.log(`Auth service running (PORT: ${port})`);
});
