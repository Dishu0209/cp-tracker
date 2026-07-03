const fetchUserInfo=async (handle)=>{
     const url = `https://codeforces.com/api/user.info?handles=${handle}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
};
const fetchRatingHistory=async(handle)=>{
const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
const response = await fetch(url);
const data = await response.json();
return data;
};
const fetchSubmission=async(handle)=>{
    const url=`https://codeforces.com/api/user.status?handle=${handle}`;
    const response= await fetch(url);
    const data =await response.json();
    return data;
};
module.exports = { fetchUserInfo,fetchRatingHistory,fetchSubmission };