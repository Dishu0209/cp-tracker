const express=require("express");
const { getHealth } = require("../controllers/healthController");
const { getUser, getRatingHistory, getSubmission, getanalytics, addCodeforcesHandle, getCodeforcesHandles, deleteCodeforcesHandle, updateCodeforcesHandle } = require("../controllers/userController");
const { signup, login,getMe } = require("../controllers/authController");
const authmiddleware = require("../middlewares/authMiddleware");
const router=express.Router();
router.get("/",getHealth);
router.get("/codeforces/users/:handle",getUser);
router.get("/codeforces/users/:handle/rating",getRatingHistory);
router.get("/codeforces/users/:handle/submission",getSubmission);
router.get("/codeforces/users/:handle/analytics",getanalytics);
router.post("/auth/signup",signup);
router.post("/auth/login",login);
router.get("/auth/me",authmiddleware,getMe);
router.post(
  "/users/me/codeforces-handles",
  authmiddleware,
  addCodeforcesHandle
);
router.get("/users/me/codeforces-handles",authmiddleware,getCodeforcesHandles);
router.delete("/users/me/codeforces-handles/:handleId",authmiddleware,deleteCodeforcesHandle);
router.patch("/users/me/codeforces-handles/:handleId",authmiddleware,updateCodeforcesHandle);
module.exports=router;