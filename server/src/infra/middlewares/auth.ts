import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log("Token Access Validated");
  return next();
};

export default auth;
