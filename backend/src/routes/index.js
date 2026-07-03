const express=require("express");
const { getHealth } = require("../controllers/healthController");
const { getUser } = require("../controllers/userController");
const router=express.Router();
router.get("/",getHealth);
router.get("/users/:handle",getUser);
module.exports=router;