import dotenv from 'dotenv'
import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import mediasRouter from './routes/medias.router'
import { initFolder } from './utils/file'
import { UPLOAD_DIR } from './constants/dir'
dotenv.config()

databaseService.connect()
const app = express()
const port = process.env.PORT || 4000

// Tao folder upload
initFolder()

app.use(express.json())
// middlewares
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

app.use('/static', express.static(UPLOAD_DIR))

app.use(defaultErrorHandler)

// run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
