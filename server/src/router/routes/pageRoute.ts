import {
  createPage,
  getAllPage,
  deletePage,
  getOnePage,
  updatePage,
  updateContentCardProduct,
} from "../../controlers/pageControler"
import express from "express"

const router = express.Router()

router.post("/create", createPage)
router.delete("/delete/:id", deletePage)
router.put("/update/:id", updatePage)
router.put("/update-card/:id", updateContentCardProduct)
router.get("/:id", getOnePage)
router.get("/", getAllPage)

export default router
