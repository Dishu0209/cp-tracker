import API from "./api";
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getHandles = async () => {
  const response = await API.get(
    "/users/me/codeforces-handles",
    getConfig()
  );

  return response.data;
};

export const addHandle = async (handle, isOwn) => {
  const response = await API.post(
    "/users/me/codeforces-handles",
    {
      handle,
      isOwn,
    },
    getConfig()
  );

  return response.data;
};

export const deleteHandle = async (handleId) => {
  const response = await API.delete(
    `/users/me/codeforces-handles/${handleId}`,
    getConfig()
  );

  return response.data;
};

export const markOwnHandle = async (handleId) => {
  const response = await API.patch(
    `/users/me/codeforces-handles/${handleId}`,
    {},
    getConfig()
  );

  return response.data;
};