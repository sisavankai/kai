import { Request, Response } from "express"
import connection from "../utils/db"
import multer from "multer"
import multerConfig from "../utils/multer_cofig"
import { error } from "console"

const upload = multer(multerConfig.config).single(multerConfig.keyUpload)

// --------------------------------------
// Get All Products
// --------------------------------------
function getAllProducts(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM products ORDER BY id DESC",
      function (error: any, results: any) {
        if (error) {
          res.json({ status: "error", message: error })
          return
        } else {
          res.json(results)
        }
      }
    )
  } catch (error) {
    res.json({ status: "error", message: error })
    return
  }
}

// --------------------------------------
// Get Products By ID
// --------------------------------------
function getProductsById(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id],
      function (error: any, results: any) {
        if (error) {
          res.json({ status: "error", message: error })
          return
        } else {
          res.json(results)
        }
      }
    )
  } catch (error) {
    res.json({ status: "error", message: error })
    return
  }
}

// --------------------------------------
// Create Products
// --------------------------------------
function createProducts(req: Request, res: Response) {
    upload(req, res, async(error) => {
        if (error instanceof multer.MulterError) {
            res.json({ status: "error", message: error })
            return
        } else {
            const image = req.file ? req.file.filename : null
            try {
                connection.execute(
                "INSERT INTO products (name, description, barcode, image, stock, price, category_id, user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                        req.body.name,
                        req.body.description,
                        req.body.barcode,
                        image,
                        req.body.stock,
                        req.body.price,
                        req.body.category_id,
                        req.body.user_id,
                        req.body.status_id
                    ],
                function (error: any, results: any) {
                    if (error) {
                    res.json({ status: "error", message: error })
                    return
                    } else {
                    res.json({
                        status: "ok",
                        message: "Product created successfully",
                        product: {
                        id: results.insertId,
                        name: req.body.name,
                        description: req.body.description,
                        barcode: req.body.barcode,
                        image: image,
                        stock: req.body.stock,
                        price: req.body.price,
                        category_id: req.body.category_id,
                        user_id: req.body.user_id,
                        status_id: req.body.status_id
                        }
                    })
                    }
                }
                )
            } catch (error) {
                res.json({ status: "error", message: error })
                return
            }
        }
    })
}

// --------------------------------------
// Update Products
// --------------------------------------
function updateProducts(req: Request, res: Response) {
    upload(req, res, async(error) => {
        if (error instanceof multer.MulterError) {
            res.json({ status: "error", message: error })
            return
        } else {
            const image = req.file ? req.file.filename : null
            try {
                connection.execute(
                "UPDATE products SET name = ?, description = ?, barcode = ?, image = ?, stock = ?, price = ?, category_id = ?, user_id = ?, status_id = ? WHERE id = ?",
                    [
                        req.body.name,
                        req.body.description,
                        req.body.barcode,
                        image,
                        req.body.stock,
                        req.body.price,
                        req.body.category_id,
                        req.body.user_id,
                        req.body.status_id,
                        req.params.id
                    ],
                function (error: any, results: any) {
                    if (error) {
                    res.json({ status: "error", message: error })
                    return
                    } else {
                    res.json({
                        status: "ok",
                        message: "Product updated successfully",
                        product: {
                        id: req.params.id,
                        name: req.body.name,
                        description: req.body.description,
                        barcode: req.body.barcode,
                        image: image,
                        stock: req.body.stock,
                        price: req.body.price,
                        category_id: req.body.category_id,
                        user_id: req.body.user_id,
                        status_id: req.body.status_id
                        }
                    })
                    }
                }
                )
            } catch (error) {
                res.json({ status: "error", message: error })
                return
            }
        }
    })
}

// --------------------------------------
// Delete Products
// --------------------------------------
function deleteProducts(req: Request, res: Response) {
  try {
    connection.execute(
      "DELETE FROM products WHERE id = ?",
      [req.params.id],
      function (error: any, results: any) {
        if (error) {
          res.json({ status: "error", message: error })
          return
        } else {
          res.json({ status: "ok", message: "Product deleted successfully" })
        }
      }
    )
    
    // Delete image from storage
    const fs = require("fs")
    const path = require("path")
    const filePath = path.join(
        __dirname,
        "../public/uploads/",
        req.params.productId
    )
    fs.unlinkSync(filePath)

  } catch (error) {
    res.json({ status: "error", message: error })
    return
  }
}

export { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts }