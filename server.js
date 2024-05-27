import 'express-async-errors' // handled asynchronous errors
import * as dotenv from 'dotenv' // used to store secret keys
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan' // middleware used to log the req info
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'

//ROUTERS IMPORT
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
//PUBLIC
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

//MIDDLEWARE IMPORT
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js' // middleware for errors
import { authenticateUser } from './middleware/authMiddleware.js'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.static(path.resolve(__dirname, './public')))

app.use(cookieParser())
app.use(express.json()) //JSON middleware

// app.get('/', (req, res) => {
//   res.send('Hello home')
// })

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route,coming from the backend controller' })
})

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

//Error Middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(5100, () => {
    console.log(`Server is listening on the port ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
