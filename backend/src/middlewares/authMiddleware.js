const jwt=require("jsonwebtoken");
const authmiddleware=async (req,res,next)=>{
    try
    {
        const authHeader = req.headers.authorization;
        if (!authHeader||  !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Token not found",
  });
}
        const token = authHeader.split(" ")[1];//1 iss liye kyuki vo ek array return karega aur authorisataion wala kuch ayise dikhta hai "Bearer eyJhbGciOiJIUzI1NiIs..." toh vo aisa ho jayehga ["Bearer", "eyJhbGciOiJIUzI1NiIs..."]
       const decoded= jwt.verify(token, process.env.JWT_SECRET);
       req.userId = decoded.id;
       next();
    }
    catch(error)
    {
  return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    }
};
module.exports=authmiddleware;