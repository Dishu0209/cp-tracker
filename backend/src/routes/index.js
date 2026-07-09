const express=require("express");
const { getHealth } = require("../controllers/healthController");
const {getUser,getRatingHistory,getSubmission, getAnalytics,} = require("../controllers/codeforcesController");
const { signup, login,getMe } = require("../controllers/authController");
const authmiddleware = require("../middlewares/authMiddleware");
const { getCodeforcesHandles, updateCodeforcesHandle, deleteCodeforcesHandle, addCodeforcesHandle } = require("../controllers/handleController");
const { getDashboard, getDashboardDetails } = require("../controllers/dashboardController");
const { compareHandles } = require("../controllers/comparisonController");
const router=express.Router();
router.get("/",getHealth);
router.get("/codeforces/users/:handle",getUser);
router.get("/codeforces/users/:handle/rating",getRatingHistory);
router.get("/codeforces/users/:handle/submission",getSubmission);
router.get("/codeforces/users/:handle/analytics",getAnalytics);
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
router.get("/users/me/dashboard",authmiddleware,getDashboard);
router.get("/users/me/dashboard/:handle",authmiddleware,getDashboardDetails);
router.post("/users/me/compare",authmiddleware,compareHandles);
module.exports=router;