const {
  fetchUserInfo,
  fetchSubmission,
} = require("../services/codeforcesServices");
const calculateAnalytics = require("../utils/calculateAnalytics");
const User = require("../models/User");
const compareHandles = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { handles } = req.body;
    if (!Array.isArray(handles)) {
      return res.status(400).json({
        success: false,
        message: "Handles must be an array",
      });
    }

    if (handles.length > 5) {
      return res
        .status(400)
        .json({ success: false, message: "You can compare at most 5 handles" });
    }
    if (handles.length < 2) {
      return res
        .status(400)
        .json({ success: false, message: "Select at least 2 handles" });
    }
    const allHandlesSaved = handles.every((selectedHandle) =>
      user.codeforcesHandles.some(
        (item) => item.handle.toLowerCase() === selectedHandle.toLowerCase(),
      ),
    );
    if (!allHandlesSaved) {
      return res.status(400).json({
        success: false,
        message: "One or more handles are not saved",
      });
    }
    const uniqueHandles = new Set(
      handles.map((handle) => handle.toLowerCase()),
    );
    if (uniqueHandles.size !== handles.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicate handles are not allowed",
      });
    }
    const comparisonData = [];
    const results = await Promise.all(
      handles.map(async (handle) => {
        const [userInfoData, submissionData] = await Promise.all([
          fetchUserInfo(handle),
          fetchSubmission(handle),
        ]);
        if (userInfoData.status !== "OK" || submissionData.status !== "OK") {
          return null;
        }
        const analytics = calculateAnalytics(submissionData.result);
        const cfUser = userInfoData.result[0];
        return { cfUser, analytics };
      }),
    );
    if (results.some((result) => result === null)) {
      return res.status(502).json({
        success: false,
        message: "Failed to fetch comparison data",
      });
    }
    for (const result of results) {
      comparisonData.push({
        handle: result.cfUser.handle,
        rating: result.cfUser.rating,
        maxRating: result.cfUser.maxRating,
        rank: result.cfUser.rank,
        totalSubmission: result.analytics.totalSubmission,
        acceptedSubmissions: result.analytics.acceptedSubmissions,
        uniqueSolvedProblems: result.analytics.uniqueSolvedProblems,
        ratingDistribution: result.analytics.ratingDistribution,
        tagDistribution: result.analytics.tagDistribution,
      });
    }
    return res.status(200).json({
      success: true,
      comparisonData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = { compareHandles };
