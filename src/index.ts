import dotenv from 'dotenv'
import express from 'express'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.router'
import staticRouter from './routes/static.router'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { initFolder } from './utils/file'
import { MongoClient } from 'mongodb'
import tweetsRouter from './routes/tweets.routes'
dotenv.config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
})
const app = express()
const port = process.env.PORT || 4000

// Tao folder upload
initFolder()

app.use(express.json())
// middlewares
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)

app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

// app.use('/static', express.static(UPLOAD_IMAGE_DIR))

app.use(defaultErrorHandler)

// run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// // add data
// const mgclient = new MongoClient(
//   `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.rhknwv4.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`
// )
// const db = mgclient.db('earth')
// // Tao 1000 document vao collection users
// const users = db.collection('users')
// const usersData = []
// function getRandomNumber() {
//   return Math.floor(Math.random() * 100) + 1
// }

// for (let i = 0; i < 1000; i++) {
//   usersData.push({
//     name: 'user' + (i + 1),
//     age: getRandomNumber(),
//     sex: i % 2 === 0 ? 'male' : 'female',
//     address: ''
//   })
// }
// users.insertMany(usersData)
