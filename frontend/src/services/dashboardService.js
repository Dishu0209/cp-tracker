import API from "./api";
export const getDashboard = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/users/me/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getDashboardDetails = async (handle) => {
  const token = localStorage.getItem("token");
  const response = await API.get(`/users/me/dashboard/${handle}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const compareHandles = async (handles) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/users/me/compare",
    { handles },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
