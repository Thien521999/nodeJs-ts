import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Other'

export interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience // doi tuong khan gia
  content: string
  parent_id: null | string // chỉ null khi tweet gốc, ko thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtasg dạng ['java', 'nextjs']
  mentions: string[] // user_id[]
  medias: Media[]
}
