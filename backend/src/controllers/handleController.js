const {
  fetchUserInfo,
  fetchRatingHistory,
  fetchSubmission,
} = require("../services/codeforcesServices");
const User = require("../models/User");
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
module.exports={addCodeforcesHandle,getCodeforcesHandles,updateCodeforcesHandle,deleteCodeforcesHandle};