import { Router } from 'express'
import { uploadSingleImageController } from '~/controllers/medias.controllers'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

/*
 * Desciption. Upload single image
 * Path: /upload-image
 * Method: POST
 * Body: {  }
 */
mediasRouter.post('/upload-image', wrapRequestHandler(uploadSingleImageController))

export default mediasRouter
