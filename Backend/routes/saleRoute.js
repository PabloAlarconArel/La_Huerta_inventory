const express = require("express")
const router = express.Router()
const authRequired= require("../middlewares/validateToken")
const {getSales,createSale,getSale,deleteSales}= require("../controllers/controllerSales")

router.get('/sales',authRequired,getSales)
router.get('/sales/:id',authRequired,getSale)
router.post('/sales',authRequired,createSale)
router.delete('/sales/:id',authRequired,deleteSales)


module.exports = router ;