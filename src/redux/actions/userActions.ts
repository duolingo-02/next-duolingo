import { AppDispatch } from "../store/store";

export const fetchUserProfile = () => async (dispatch: AppDispatch) => {
  dispatch({ type: "USER_PROFILE_REQUEST" });
  try {
    const userId = localStorage.getItem("userId"); // Get from local storage or your state
    const response = await fetch(`/api/user/points/${userId}`);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "USER_PROFILE_SUCCESS", payload: data });
    } else {
      dispatch({ type: "USER_PROFILE_FAIL", payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: "USER_PROFILE_FAIL",
      payload: "Failed to fetch user profile",
    });
  }
};

export const updateUserProfile =
  (profileData: { username: string; email: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data });
      } else {
        dispatch({ type: "UPDATE_PROFILE_FAIL", payload: data.message });
      }
    } catch (error) {
      dispatch({
        type: "UPDATE_PROFILE_FAIL",
        payload: "Failed to update profile",
      });
    }
  };

// Similar structure can be followed for updateUserProfileWithPicture and updateUserPassword actions
