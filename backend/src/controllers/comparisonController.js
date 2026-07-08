const {fetchUserInfo,fetchSubmission}=require("../services/codeforcesServices");
const calculateAnalytics = require("../utils/calculateAnalytics");
const User=require("../models/User");
const compareHandles=async (req,res)=>{
    try{
        const user=await User.findById(req.userId);
        if(!user)
        {
            return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
        }
        const {handles}=req.body;
        if (!Array.isArray(handles)) {
  return res.status(400).json({
    success: false,
    message: "Handles must be an array",
  });
}


        if(handles.length>3)
        {
            return res.status(400).json({success:false,message:"Too many ids"});
        }
        if(handles.length<2)
        {
            return res.status(400).json({success:false,message:"Too few ids"});
        }
        const allHandlesSaved = handles.every((selectedHandle) =>
  user.codeforcesHandles.some(
    (item) =>
      item.handle.toLowerCase() === selectedHandle.toLowerCase()
  )
);
if (!allHandlesSaved) {
  return res.status(400).json({
    success: false,
    message: "One or more handles are not saved",
  });
}
const uniqueHandles = new Set(
  handles.map((handle) => handle.toLowerCase())
);
if (uniqueHandles.size !== handles.length) {
  return res.status(400).json({
    success: false,
    message: "Duplicate handles are not allowed",
  });
}
const comparisonData=[];
for(const handle of handles)
{
    const userInfoData=await fetchUserInfo(handle);
    const submissionData=await fetchSubmission(handle);
    if(userInfoData.status !== "OK" ||
    submissionData.status !== "OK")
    {
        continue;
    }
    const cfUser=userInfoData.result[0];
    const analytics=calculateAnalytics(submissionData.result);
    comparisonData.push({
        handle:cfUser.handle,
        rating:cfUser.rating,
        maxRating:cfUser.maxRating,
        rank:cfUser.rank,
        totalSubmission:analytics.totalSubmission,
        acceptedSubmission:analytics.acceptedSubmissions,
        uniqueSolvedProblems:analytics.uniqueSolvedProblems,
        ratingDistribution:analytics.ratingDistribution,
        tagDistribution:analytics.tagDistribution
    });
    
}return res.status(200).json({
        success:true,
        comparisonData
    });
    }
    catch (error)
    {
        console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
    
};
module.exports={compareHandles};