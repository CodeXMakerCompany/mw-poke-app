import express from "express";

import getRoutes from "./infra/routes/index";

const app = express();

let appSetup = null;

appSetup = getRoutes(app);

appSetup.listen(8000, () => {
  console.log("Server started on port 8000");
});
