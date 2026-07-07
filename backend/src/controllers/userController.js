const {
  fetchUserInfo,
  fetchRatingHistory,
  fetchSubmission,
} = require("../services/codeforcesServices");
const User=require("../models/User");
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
    tagDistribution.set(
        tag,
        (tagDistribution.get(tag) || 0) + 1
    );
}
Object.fromEntries(ratingDistribution);
Object.fromEntries(tagDistribution);
      }
      return res.status(200).json({
        success:true,
        totalSubmission:totalSubmission,
        totalaccepted:acceptedSubmissions,
        uniqueproblems:uniqueSolvedProblems,
        ratingDistribution:Object.fromEntries(ratingDistribution),
        tagDistribution:Object.fromEntries(tagDistribution)
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const addCodeforcesHandle=async(req,res)=>{
  try{
    const {handle,isOwn}=req.body;
    if(!handle)
    {
      return res.status(400).json({
        success:false,
        message:"Handle Is Required"
      });
    }
    const data=await fetchUserInfo(handle);
     if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "NO USER FOUND",
      });
    }
    const user=await User.findById(req.userId);
    const alreadyExists = user.codeforcesHandles.some(
  (item) => item.handle.toLowerCase() === handle.toLowerCase()
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
  }
  catch(error)
  {
    console.error(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};
module.exports = { getUser, getRatingHistory, getSubmission, getanalytics,addCodeforcesHandle };
