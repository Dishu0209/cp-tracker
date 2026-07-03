 const { fetchUserInfo } = require("../services/codeforcesServices");
const getUser= async(req,res)=>{
    try{
    const handle=req.params.handle;
    
   const data = await fetchUserInfo(handle);
   
    
    if(data.status!=="OK")
    {
       return res.status(404).json({
            success:false,
            message:"NO USER FOUND"
        })
    }
    const user=data.result[0];
    console.log(data);

    res.status(200).json({
         success:true,
       handle: user.handle,
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank,
    maxRank: user.maxRank,
    avatar: user.avatar,
    organization: user.organization
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
module.exports={getUser,};