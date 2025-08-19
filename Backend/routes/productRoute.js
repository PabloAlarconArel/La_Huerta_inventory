const express = require("express")
const router = express.Router()
const authRequired= require("../middlewares/validateToken")
const {getProducts,getProduct,createProducts,updateProducts,deleteProducts,getProductsByBarcode}= require("../controllers/controllerProducts")

router.get('/products',authRequired,getProducts)
router.get('/products/search',authRequired,getProductsByBarcode)
router.get('/products/:id',authRequired,getProduct)
router.post('/products',authRequired,createProducts)
router.delete('/products/:id',authRequired,deleteProducts)
router.put('/products/:id',authRequired,updateProducts)


module.exports = router ;