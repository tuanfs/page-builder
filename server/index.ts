import express from "express"
import mongoose from "mongoose"
import router from "./src/router"
import cors from "cors"

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tuanfs:tuanfs@cluster0.jyrsr.mongodb.net/page-builder?retryWrites=true&w=majority",
    )
    // mongodb://localhost:27017/dashboard-shop
    console.log("Connected mongodb database")
  } catch (error) {
    console.error(error)
  }
}

const app = express()

app.use(express.json())
app.use(cors())
router(app)
const port = process.env.PORT || 5500
connectDB()

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
