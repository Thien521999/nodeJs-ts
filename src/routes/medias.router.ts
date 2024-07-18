import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

/*
 * Desciption. Upload image
 * Path: /upload-image
 * Method: POST
 * Body: { image: [file] }
 */
mediasRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
)

/*
 * Desciption. Upload video
 * Path: /upload-video
 * Method: POST
 * Body: { video: [file] }
 */
mediasRouter.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)

export default mediasRouter
