const jwt=require("jsonwebtoken");
const authmiddleware=async (req,res,next)=>{
    try
    {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
  return res.status(401).json({
    success: false,
    message: "TOKEN NOT FOUND",
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
      message: "INVALID OR EXPIRED TOKEN",
    });
    }
};
module.exports=authmiddleware;