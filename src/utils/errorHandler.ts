import { NextFunction, Request, Response } from 'express'

export const logging = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // tslint:disable-next-line: no-console
  console.log(err)
  next(err)
}

export const clientErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something has gone wrong!' })
  } else {
    next(err)
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ message: err.message })
}
