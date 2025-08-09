const express = require("express")
const router = express.Router()
const {authRequired}= require("../middlewares/validateToken")
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct}= require("../controllers/controllerProducts")

router.get('/products',authRequired,getProducts)
router.get('/products/:id',authRequired,getProduct)
router.post('/products',authRequired,createProduct)
router.delete('/products/:id',authRequired,deleteProduct)
router.put('/products/:id',authRequired,updateProduct)

module.exports = router ;