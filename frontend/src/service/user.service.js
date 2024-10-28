import axiosInstance from "./url.service";

export const getAllFriendsRequest = async () => {
  try {
    const response = await axiosInstance.get("/api/users/friend-request");
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllFriendsSuggestion = async () => {
  try {
    const response = await axiosInstance.get("/api/users/user-to-request");
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const followUser = async (userId) => {
  try {
    const response = await axiosInstance.post("/api/users/follow", {
      userIdToFollow: userId,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UnfollowUser = async (userId) => {
  try {
    const response = await axiosInstance.post("/api/users/unfollow", {
      userIdToUnFollow: userId,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserFromRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/friend-request/remove",
      {
        requestSenderId: userId,
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/users/profile/${userId}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMutualFriends = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mutual-friends/${userId}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/profile/${userId}`,
      updateData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserCoverPhoto = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/profile/cover-photo/${userId}`,
      updateData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createOrUpdateUserBio = async (userId, bioData) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/bio/${userId}`,
      bioData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users");
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
