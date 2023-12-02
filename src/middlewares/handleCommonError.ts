import { NextFunction, Request, Response } from "express";

export default function handleCommonError(err: any, req: Request, res: Response<string>, next: NextFunction) {
  console.log("commom error");
  
  if (err.status === 500 || err.status === undefined || err.status === null) {
    return next(err);
  }

  return res.status(err.status).send(err.message);
}
