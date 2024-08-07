import { JwtPayload } from 'jsonwebtoken'
import { TokenType, userVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

export interface LoginReqBody {
  email: string
  password: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutReqbody {
  refresh_token: string
}

export interface RefreshTokenReqbody {
  refresh_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {}

export interface ResetPasswordReqBody {
  password: string
  confirn_password: string
  forgot_password_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: userVerifyStatus
  exp: number
  iat: number
}

export interface UpdatedMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface UnFollowReqParams extends ParamsDictionary {
  user_id: string
}
