import {
  createProduct,
  getAllProduct,
  getOneProduct,
} from "../../controlers/productControler"
import express from "express"

const router = express.Router()

router.post("/create", createProduct)
router.get("/:id", getOneProduct)
router.get("/", getAllProduct)

export default router
