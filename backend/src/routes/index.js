const express=require("express");
const { getHealth } = require("../controllers/healthController");
const { getUser, getRatingHistory, getSubmission } = require("../controllers/userController");
const router=express.Router();
router.get("/",getHealth);
router.get("/users/:handle",getUser);
router.get("/users/:handle/rating",getRatingHistory);
router.get("/users/:handle/submission",getSubmission)
module.exports=router;