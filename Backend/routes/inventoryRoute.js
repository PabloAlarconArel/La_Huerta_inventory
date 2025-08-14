const express = require("express")
const router = express.Router()
const {authRequired}= require("../middlewares/validateToken")
const {getInventorys,getInventory,createInventory,updateInventory,deleteInventory}= require("../controllers/controllerInventory")
const {createInventorySchema} = require ("../schemas/schemaInventory")

router.get('/inventory',authRequired,getInventorys)
router.get('/inventory/:id',authRequired,getInventory)
router.post('/inventory',authRequired,createInventorySchema,createInventory)
router.delete('/inventory/:id',authRequired,deleteInventory)
router.put('/inventory/:id',authRequired,updateInventory)

module.exports = router;