import serverlessExpress from '@vendia/serverless-express';
import express from "express";
import getRoutes from "./infra/routes/index";

const app = express();
const appSetup = getRoutes(app);

export const handler = serverlessExpress({ app: appSetup });
