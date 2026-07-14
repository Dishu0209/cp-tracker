import API from"./api";
export const loginUser=async (identifier,password)=>{
 const response = await API.post("/auth/login", {
    identifier,
    password,
  });

  return response.data;
};