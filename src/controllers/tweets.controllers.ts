import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsServices from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsServices.createTweet(user_id, req.body)

  return res.json({
    message: 'Create Tweet successfully',
    data: result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  return res.json({
    message: 'Get Tweet successfully',
    data: 'ok'
  })
}
