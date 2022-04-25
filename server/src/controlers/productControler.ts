import Product from "../models/Product"
import {Request, Response} from "express"

export const createProduct = async (req: Request, res: Response) => {
  const {name, img, price} = req.body

  try {
    if (!name || !price) {
      return res
        .status(404)
        .json({success: false, message: "Missing name product or price"})
    }
    const newProduct = new Product({
      name,
      img,
      price,
    })
    if (!newProduct) {
      return res
        .status(404)
        .json({success: false, message: "Missing name product or price"})
    }
    await newProduct.save()
    res.json({
      success: true,
      message: "Create page successfully",
      page: newProduct,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const productList = await Product.find()
    if (!productList) {
      res.status(404).json({success: false, message: "Get all page rejected"})
    }

    res.json({success: true, message: "Get all page successfully", productList})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: "false", message: "Server error"})
  }
}

export const getOneProduct = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res
        .status(404)
        .json({success: false, message: "Product not found"})
    }
    res.json({success: true, message: "Get one product successfully", product})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}
