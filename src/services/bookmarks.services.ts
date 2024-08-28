import Bookmark from '~/models/schemas/Bookmark.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class BookmarkServices {
  async bookmarkTweet(user_id: string, tweet_id: string) {
    // tìm bookmarkTweet  trong database, nếu có thì lấy , ko thì tạo mới
    const result = await databaseService.bookmarks.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Bookmark({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweet_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after' // tra ve ket qua sau khi insert thanh cong
      }
    )
    console.log({ result })
    // return hashtagDocuments.map((hashtag) => hashtag?._id)
    return result
  }
  async unBookmarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.bookmarks.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result
  }
}

const bookmarkServices = new BookmarkServices()
export default bookmarkServices
