import { Router } from 'express'
import { bookmarkTweetController, unBookmarkTweetController } from '~/controllers/bookmarks.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarksRouter = Router()

/*
 * Desciption. Bookmark Tweet
 * Path: /
 * Method: POST
 * Body: {tweet_id: string}
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(bookmarkTweetController))

/*
 * Desciption. Unbookmark Tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Body: DELETE thì ko co body
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unBookmarkTweetController)
)

export default bookmarksRouter
