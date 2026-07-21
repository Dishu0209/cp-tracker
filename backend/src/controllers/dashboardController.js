const {
  fetchUserInfo,
  fetchRatingHistory,
  fetchSubmission,
} = require("../services/codeforcesServices");
const User = require("../models/User");
const calculateAnalytics = require("../utils/calculateAnalytics");
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.codeforcesHandles.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No handles found. Please add a handle.",
        dashboardData: [],
      });
    }
    const dashboardData = [];
    const results = await Promise.all(
      user.codeforcesHandles.map((item) => fetchUserInfo(item.handle)),
    );
    for (let i = 0; i < results.length; i++) {
      if (results[i].status !== "OK") {
        continue;
      }
      const cfUser = results[i].result[0];
     dashboardData.push({
  _id: user.codeforcesHandles[i]._id,
  handle: cfUser.handle,
  isOwn: user.codeforcesHandles[i].isOwn,
  rating: cfUser.rating,
  maxRating: cfUser.maxRating,
  rank: cfUser.rank,
  maxRank: cfUser.maxRank,
  avatar: cfUser.avatar,
});
    }
    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashboardData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getDashboardDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const handle = req.params.handle;
    const check = user.codeforcesHandles.some(
      (item) => item.handle.toLowerCase() === handle.toLowerCase(),
    );
    if (!check) {
      return res.status(404).json({
        success: false,
        message: "Handle not added",
      });
    }
    const [userInfoData, ratingData, submissionData] = await Promise.all([
      fetchUserInfo(handle),
      fetchRatingHistory(handle),
      fetchSubmission(handle),
    ]);
    if (
      userInfoData.status !== "OK" ||
      ratingData.status !== "OK" ||
      submissionData.status !== "OK"
    ) {
      return res.status(502).json({
        success: false,
        message: "Failed to fetch Codeforces data",
      });
    }
    const cfUser = userInfoData.result[0];
    const profile = {
      handle: cfUser.handle,
      rating: cfUser.rating,
      maxRating: cfUser.maxRating,
      rank: cfUser.rank,
      maxRank: cfUser.maxRank,
      avatar: cfUser.avatar,
      organization: cfUser.organization,
    };
    const ratingHistory = ratingData.result.map((contest) => {
      return {
        name: contest.contestName,
        rank: contest.rank,
        time: contest.ratingUpdateTimeSeconds,
        oldRating: contest.oldRating,
        newRating: contest.newRating,
      };
    });
    const analytics = calculateAnalytics(submissionData.result);
    const recentSubmissions = submissionData.result
      .slice(0, 10)
      .map((submission) => {
        return {
          id: submission.id,
          time: submission.creationTimeSeconds,
          contestId: submission.problem.contestId,
          index: submission.problem.index,
          name: submission.problem.name,
          rating: submission.problem.rating,
          verdict: submission.verdict,
          language: submission.programmingLanguage,
        };
      });
    return res.status(200).json({
      success: true,
      message: "Dashboard details fetched successfully",
      data: {
        profile,
        analytics,
        ratingHistory,
        recentSubmissions,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getDashboard,
  getDashboardDetails,
};
