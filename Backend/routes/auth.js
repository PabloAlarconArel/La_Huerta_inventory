const express = require ('express');
const router = express.Router();
const validateSchema = require("../middlewares/ValidatorMiddlewares")
const{loginSchema,registerSchema}= require("../schemas/schemaAuth")
const {login,register,logout,profile} = require ( "../controllers/controller")
const authRequired = require("../middlewares/validateToken")

router.post("/login",validateSchema(loginSchema),login);
router.post("/register",validateSchema(registerSchema),register);
router.post("/logout",logout);
router.post("/profile",authRequired,profile);

module.exports = router;