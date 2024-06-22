import dotenv from 'dotenv'
import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
dotenv.config()

databaseService.connect()
const app = express()
const port = 3000

app.use(express.json())
// middlewares
app.use('/users', usersRouter)

app.use(defaultErrorHandler)

// run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
