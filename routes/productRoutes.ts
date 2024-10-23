import express, { Router } from 'express'
import * as productController from '../controllers/productController'

// Initialize Router
const router: Router = express.Router()

// Initialize Router
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getAllProducts);
router.post("/", productController.createProducts);
router.put("/:id", productController.updateProducts);
router.delete("/:id", productController.deleteProducts);

// Export Router
export default router;

