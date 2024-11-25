import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './database/dbconnection.js'
import router from './routes/userAuthRout.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors());

app.use(cookieParser());
app.use('/site', (req, res) => {
  res.send('The site is working properly 👍👍')
})

app.use('/api/v4/user', router)

dbConnection()
export default app
