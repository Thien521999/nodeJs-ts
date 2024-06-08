import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
// middlewares
app.use('/users', usersRouter)
databaseService.connect()

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message })
})

// run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
