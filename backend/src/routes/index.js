const express=require("express");
const { getHealth } = require("../controllers/healthController");
const { getUser, getRatingHistory, getSubmission, getanalytics } = require("../controllers/userController");
const { signup, login } = require("../controllers/authController");
const router=express.Router();
router.get("/",getHealth);
router.get("/codeforces/users/:handle",getUser);
router.get("/codeforces/users/:handle/rating",getRatingHistory);
router.get("/codeforces/users/:handle/submission",getSubmission);
router.get("/codeforces/users/:handle/analytics",getanalytics);
router.post("/auth/signup",signup);
router.post("/auth/login",login)
module.exports=router;