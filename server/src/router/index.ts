import pageRouter from "./routes/pageRoute"
import productRouter from "./routes/productRoute"
import {Express} from "express"

export default function route(app: Express) {
  app.use("/api/page", pageRouter)
  app.use("/api/product", productRouter)
}
