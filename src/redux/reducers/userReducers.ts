const initialState = {
  profile: null,
  status: "idle",
  error: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "USER_PROFILE_REQUEST":
      return { ...state, status: "loading" };
    case "USER_PROFILE_SUCCESS":
      return { ...state, status: "succeeded", profile: action.payload };
    case "USER_PROFILE_FAIL":
      return { ...state, status: "failed", error: action.payload };
    case "UPDATE_PROFILE_REQUEST":
      return { ...state, status: "updating" };
    case "UPDATE_PROFILE_SUCCESS":
      return { ...state, status: "updated", profile: action.payload };
    case "UPDATE_PROFILE_FAIL":
      return { ...state, status: "failed", error: action.payload };
    case "UPDATE_PASSWORD_REQUEST":
      return { ...state, status: "updating_password" };
    case "UPDATE_PASSWORD_SUCCESS":
      return { ...state, status: "updated_password" };
    case "UPDATE_PASSWORD_FAIL":
      return { ...state, status: "failed", error: action.payload };
    default:
      return state;
  }
};
