const {
  fetchUserInfo,
  fetchRatingHistory,
  fetchSubmission,
} = require("../services/codeforcesServices");
const User = require("../models/User");
const getUser = async (req, res) => {
  try {
    const handle = req.params.handle;

    const data = await fetchUserInfo(handle);

    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "NO USER FOUND",
      });
    }
    const user = data.result[0];
    console.log(data);

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
      console.log(data);
      const ratinghistory = data.result.map((contest) => {
        return {
          name: contest.contestName,
          rank: contest.rank,
          time: contest.ratingUpdateTimeSeconds,
          oldRating: contest.oldRating,
          newRating: contest.newRating,
        };
      });
      return res.status(200).json({ success: true, data: ratinghistory });
    } else {
      return res.status(404).json({
        success: false,
        message: "USER NOT FOUND",
      });
    }
  } catch (error) {
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
        message: "USER NOT FOUND",
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
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getanalytics = async (req, res) => {
  try {
    const handle = req.params.handle;
    const data = await fetchSubmission(handle);
    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "USER NOT FOUND",
      });
    } else {
      const totalSubmission = data.result.length;
      let acceptedSubmissions = 0;
      const solvedProblems = new Map();
      for (const submission of data.result) {
        if (submission.verdict === "OK") {
          acceptedSubmissions++;

          const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;

          solvedProblems.set(problemKey, submission.problem);
        }
      }
      const tagDistribution = new Map();
      const uniqueSolvedProblems = solvedProblems.size;
      const ratingDistribution = new Map();
      for (const [problemKey, problem] of solvedProblems) {
        const rating = problem.rating ?? "Unrated";
        ratingDistribution.set(
          rating,
          (ratingDistribution.get(rating) || 0) + 1,
        );
        for (const tag of problem.tags) {
          tagDistribution.set(tag, (tagDistribution.get(tag) || 0) + 1);
        }
      }
      return res.status(200).json({
        success: true,
        totalSubmission: totalSubmission,
        totalaccepted: acceptedSubmissions,
        uniqueproblems: uniqueSolvedProblems,
        ratingDistribution: Object.fromEntries(ratingDistribution),
        tagDistribution: Object.fromEntries(tagDistribution),
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const addCodeforcesHandle = async (req, res) => {
  try {
    const { handle, isOwn } = req.body;
    if (!handle) {
      return res.status(400).json({
        success: false,
        message: "Handle Is Required",
      });
    }
    const data = await fetchUserInfo(handle);
    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "NO USER FOUND",
      });
    }
    const user = await User.findById(req.userId);
    const alreadyExists = user.codeforcesHandles.some(
      (item) => item.handle.toLowerCase() === handle.toLowerCase(),
    );
    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "HANDLE ALREADY ADDED",
      });
    }
    user.codeforcesHandles.push({
      handle: handle,
      isOwn: isOwn,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "CODEFORCES HANDLE ADDED SUCCESSFULLY",
      codeforcesHandles: user.codeforcesHandles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getCodeforcesHandles = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      codeforcesHandles: user.codeforcesHandles,
      message: "Successfully got the handles",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteCodeforcesHandle = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const handleId = req.params.handleId;
    const size = user.codeforcesHandles.length;
    user.codeforcesHandles = user.codeforcesHandles.filter((item) => {
      return item._id.toString() !== handleId;
    });
    if (size === user.codeforcesHandles.length) {
      return res.status(404).json({
        success: false,
        message: "ID NOT FOUND",
      });
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Handle Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateCodeforcesHandle = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const handleId = req.params.handleId;
    const handle = user.codeforcesHandles.find(
      (item) => item._id.toString() === handleId,
    );
    if (!handle) {
      return res.status(404).json({
        success: false,
        message: "Handle Not Found",
      });
    }

    handle.isOwn = !handle.isOwn;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Handle Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (user.codeforcesHandles.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No handles found. Please add a handle.",
        codeforcesHandles: [],
      });
    }
    const dashboardData = [];
    for (const item of user.codeforcesHandles) {
      const data = await fetchUserInfo(item.handle);
      if (data.status !== "OK") {
        continue;
      }
      const cfUser = data.result[0];
      dashboardData.push({
        handle: cfUser.handle,
        isOwn: item.isOwn,
        rating: cfUser.rating,
        maxRating: cfUser.maxRating,
        rank: cfUser.rank,
        maxRank: cfUser.maxRank,
        avatar: cfUser.avatar,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Dashboard Data Fetched Successfully",
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
        message: "User Not Found",
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
    const userInfoData = await fetchUserInfo(handle);
const ratingData = await fetchRatingHistory(handle);
const submissionData = await fetchSubmission(handle);
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
 const totalSubmission = submissionData.result.length;
      let acceptedSubmissions = 0;
      const solvedProblems = new Map();
      for (const submission of submissionData.result) {
        if (submission.verdict === "OK") {
          acceptedSubmissions++;

          const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;

          solvedProblems.set(problemKey, submission.problem);
        }
      }
      const tagDistribution = new Map();
      const uniqueSolvedProblems = solvedProblems.size;
      const ratingDistribution = new Map();
      for (const [problemKey, problem] of solvedProblems) {
        const rating = problem.rating ?? "Unrated";
        ratingDistribution.set(
          rating,
          (ratingDistribution.get(rating) || 0) + 1,
        );
        for (const tag of problem.tags) {
          tagDistribution.set(tag, (tagDistribution.get(tag) || 0) + 1);
        }
      }
      const analytics = {
  totalSubmission,
  acceptedSubmissions,
  uniqueSolvedProblems,
  ratingDistribution: Object.fromEntries(ratingDistribution),
  tagDistribution: Object.fromEntries(tagDistribution),
};
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
  message: "Dashboard Details Fetched Successfully",
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
  getUser,
  getRatingHistory,
  getSubmission,
  getanalytics,
  addCodeforcesHandle,
  getCodeforcesHandles,
  deleteCodeforcesHandle,
  updateCodeforcesHandle,
  getDashboard,getDashboardDetails
};
