import API from"./api";
export  const loginUser=async (identifier,password)=>{
 const response = await API.post("/auth/login", {
    identifier,
    password,
  });

  return response.data;
};
export const signupUser=async(name,username,email,password)=>{
  const response=await API.post("/auth/signup",{
    name,
    username,
    email,
    password,
  });
  return response.data;
};

