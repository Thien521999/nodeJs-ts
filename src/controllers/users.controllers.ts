import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'martin.tran@legato.co' && password === 'aA123456') {
    return res.status(200).json({
      message: 'Login Success!'
    })
  }
  return res.status(400).json({
    message: 'Login failed!'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)

  return res.status(200).json({
    message: 'Register Success',
    result
  })
}
