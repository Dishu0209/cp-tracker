const { fetchUserInfo } = require("../services/codeforcesServices");
const User = require("../models/User");
const addCodeforcesHandle = async (req, res) => {
  try {
    const { handle, isOwn } = req.body;
    if (!handle) {
      return res.status(400).json({
        success: false,
        message: "Handle is required",
      });
    }
    const data = await fetchUserInfo(handle);
    if (data.status !== "OK") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const alreadyExists = user.codeforcesHandles.some(
      (item) => item.handle.toLowerCase() === handle.toLowerCase(),
    );
    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Handle already added",
      });
    }
    user.codeforcesHandles.push({
      handle: handle,
      isOwn: isOwn,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Codeforces handle added successfully",
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
        message: "User not found",
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
        message: "User not found",
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
        message: "Handle not found",
      });
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Handle deleted successfully",
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
        message: "User not found",
      });
    }
    const handleId = req.params.handleId;
    const handle = user.codeforcesHandles.find(
      (item) => item._id.toString() === handleId,
    );
    if (!handle) {
      return res.status(404).json({
        success: false,
        message: "Handle not found",
      });
    }

    handle.isOwn = !handle.isOwn;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Handle updated successfully",
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
  addCodeforcesHandle,
  getCodeforcesHandles,
  updateCodeforcesHandle,
  deleteCodeforcesHandle,
};
