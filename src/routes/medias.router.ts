import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

/*
 * Desciption. Upload single image
 * Path: /upload-image
 * Method: POST
 * Body: {  }
 */
mediasRouter.post('/upload-image', wrapRequestHandler(uploadImageController))

export default mediasRouter
