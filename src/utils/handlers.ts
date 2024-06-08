import { NextFunction, Request, Response, RequestHandler } from 'express'

// type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //cach 1: Promise.resolve(func(req, res, next)).catch(next)

    // Cach 2:
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
