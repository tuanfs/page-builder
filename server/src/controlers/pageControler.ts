import Page from "../models/Page"
import Product from "../models/Product"
import {Request, Response} from "express"

export const createPage = async (req: Request, res: Response) => {
  const {pageName, path, sections, status} = req.body

  try {
    if (!pageName || !path) {
      return res
        .status(404)
        .json({success: false, message: "Missing name page or path"})
    }
    const newPage = new Page({
      pageName,
      path,
      sections,
      status,
    })
    if (!newPage) {
      return res
        .status(404)
        .json({success: false, message: "Missing name page or path"})
    }
    await newPage.save()
    res.json({
      success: true,
      message: "Create page successfully",
      page: newPage,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}

export const getAllPage = async (req: Request, res: Response) => {
  try {
    const pageList = await Page.find()
    if (!pageList) {
      res.status(404).json({success: false, message: "Get all page rejected"})
    }

    res.json({success: true, message: "Get all page successfully", pageList})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: "false", message: "Server error"})
  }
}

export const deletePage = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const deletePage = await Page.findByIdAndDelete(id)
    if (!deletePage) {
      return res.status(404).json({success: false, message: "Page not found"})
    }
    res.json({
      success: true,
      message: "Delete page successfully",
      page: deletePage,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}

export const getOnePage = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const page = await Page.findById(id)

    if (!page) {
      return res.status(404).json({success: false, message: "Page not found"})
    }
    res.json({
      success: true,
      message: "Get one page successfully",
      page: page,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}

export const updatePage = async (req: Request, res: Response) => {
  const {id} = req.params
  const {pageName, path, sections, status} = req.body

  try {
    let updatedPageData = {
      pageName,
      path,
      sections,
      status,
    }

    const updatedPage = await Page.findByIdAndUpdate(id, updatedPageData, {
      new: true,
    })

    if (!updatedPage) {
      return res.status(404).json({success: false, message: "Page not found"})
    }

    res.json({
      success: true,
      message: "Updated page successfully",
      page: updatedPage,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}

export const updateContentCardProduct = async (req: Request, res: Response) => {
  const {id} = req.params

  const {priceLt, priceGt, idParent, idChildren, idItem, itemShow} = req.body

  try {
    const page = await Page.findById(id)
    let productList: any = []
    if (priceLt || priceGt) {
      const product = await Product.find()
      productList = product.filter(
        (item) => item.price > priceGt && item.price < priceLt,
      )
    }

    const pageNew = {...page._doc}

    pageNew.sections = pageNew.sections.map((item: any) => {
      if (item.id === idParent) {
        item.children = item.children.map((item: any) => {
          if (item.id === idChildren) {
            item.children = item.children.map((item: any) => {
              if (item.id === idItem) {
                item.content = [
                  priceGt,
                  priceLt,
                  itemShow,
                  JSON.stringify(productList),
                ]
              }
              return item
            })
          }
          return item
        })
      }
      return item
    })
    const updatedPage = await Page.findByIdAndUpdate(id, page, {
      new: true,
    })

    if (!updatedPage) {
      return res.status(404).json({success: false, message: "Page not found"})
    }

    res.json({
      success: true,
      message: "Update content card product succsfully",
      page: {
        pageNew,
        content: [priceGt, priceLt, itemShow, JSON.stringify(productList)],
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server error"})
  }
}
