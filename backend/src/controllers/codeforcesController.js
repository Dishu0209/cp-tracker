const {
  fetchUserInfo,
  fetchRatingHistory,
  fetchSubmission,
} = require("../services/codeforcesServices");
const calculateAnalytics = require("../utils/calculateAnalytics");
const getUser = async (req, res) => {
  try {
    const handle = req.params.handle;

    const data = await fetchUserInfo(handle);

    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const user = data.result[0];

    res.status(200).json({
      success: true,
      handle: user.handle,
      rating: user.rating,
      maxRating: user.maxRating,
      rank: user.rank,
      maxRank: user.maxRank,
      avatar: user.avatar,
      organization: user.organization,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getRatingHistory = async (req, res) => {
  try {
    const handle = req.params.handle;
    const data = await fetchRatingHistory(handle);

    if (data.status === "OK") {
      const ratingHistory = data.result.map((contest) => {
        return {
          name: contest.contestName,
          rank: contest.rank,
          time: contest.ratingUpdateTimeSeconds,
          oldRating: contest.oldRating,
          newRating: contest.newRating,
        };
      });
      return res.status(200).json({ success: true, data: ratingHistory });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getSubmission = async (req, res) => {
  try {
    const handle = req.params.handle;
    const data = await fetchSubmission(handle);
    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const submissions = data.result.map((submission) => {
        return {
          id: submission.id,
          time: submission.creationTimeSeconds,
          contestId: submission.problem.contestId,
          index: submission.problem.index,
          name: submission.problem.name,
          rating: submission.problem.rating,
          tags: submission.problem.tags,
          language: submission.programmingLanguage,
          verdict: submission.verdict,
          participantType: submission.author.participantType,
        };
      });

      return res.status(200).json({
        success: true,
        data: submissions,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getAnalytics = async (req, res) => {
  try {
    const handle = req.params.handle;
    const data = await fetchSubmission(handle);
    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const analytics = calculateAnalytics(data.result);
      return res.status(200).json({
        success: true,
        ...analytics,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getUser,
  getRatingHistory,
  getSubmission,
  getAnalytics,
};
