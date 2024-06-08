import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
// middlewares
app.use('/users', usersRouter)
databaseService.connect()

// run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
