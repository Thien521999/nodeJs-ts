import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'
import Hashtag from '~/models/schemas/HashTag.schema'

class TweetsServices {
  async checkAndCreateHashTags(hashtags: string[]) {
    const hashtagDocuments = await Promise.all(
      hashtags.map((hashtag) => {
        // tìm hashtag  trong database, nếu có thì lấy , ko thì tạo mới
        return databaseService.hashtags.findOneAndUpdate(
          {
            name: hashtag
          },
          {
            $setOnInsert: new Hashtag({ name: hashtag })
          },
          {
            upsert: true,
            returnDocument: 'after' // tra ve ket qua sau khi insert thanh cong
          }
        )
      })
    )
    return hashtagDocuments.map((hashtag) => hashtag?._id)
  }
  async createTweet(user_id: string, body: TweetRequestBody) {
    const hashtags = (await this.checkAndCreateHashTags(body?.hashtags)) as ObjectId[]
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags,
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )

    const tweet = await databaseService.tweets.findOne({ _id: result.insertedId })
    return tweet
  }
}

const tweetsService = new TweetsServices()
export default tweetsService
