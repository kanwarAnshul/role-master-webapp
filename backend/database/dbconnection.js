import mongoose from 'mongoose'
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('database connection successfull 👍👍')
    })
    .catch((error) => {
      console.log(`error when database connection 🚨🚨 ${error.message}`)
    })
}

export default dbConnection
