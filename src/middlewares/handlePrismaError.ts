import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import HttpError from "http-errors";

// * Middleware for handling all the prisma known errors and validation errors
// * as a BadRequest
export default function handlePrismaError(
  error: any,
  req: Request,
  res: Response<never>,
  next: NextFunction
) {
  console.log("prisma error");
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    throw new HttpError.BadRequest(error.message);
  }

  return next(error);
}
