import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import {
  fetchUserProfile,
  updateUserPassword,
  updateUserProfile,
  updateUserProfileWithPicture,
} from "../../redux/actions/userActions";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useRouter } from "next/router";
import {
  buttonStyles,
  containerStyles,
  formStyles,
  profileStyles,
  typographyStyles,
} from "../../styles/styles";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    profile: userProfile,
    status,
    error,
  } = useSelector((state: RootState) => state.user);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { username, email, currentPassword, newPassword, confirmPassword } =
    formState;

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (userProfile) {
      setFormState({
        username: userProfile.username,
        email: userProfile.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [userProfile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (profilePicture) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("profilePicture", profilePicture);
        await dispatch(updateUserProfileWithPicture(formData));
      } else {
        await dispatch(updateUserProfile({ username, email }));
      }
    },
    [dispatch, username, email, profilePicture]
  );

  const handlePasswordSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        return alert("Passwords do not match");
      }
      await dispatch(
        updateUserPassword({
          currentPassword,
          newPassword,
        })
      );
    },
    [dispatch, currentPassword, newPassword, confirmPassword]
  );

  const handleLogOut = useCallback(() => {
    dispatch(logout());
    router.push("/login");
  }, [dispatch, router]);

  return (
    <div style={containerStyles}>
      <div style={profileStyles}>
        <h1 style={typographyStyles.title}>Profile</h1>
        {error && <p>{error}</p>}
        <form style={formStyles} onSubmit={handleProfileSubmit}>
          <label>
            Username:
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </label>
          <label>
            Profile Picture:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          {previewImage && <img src={previewImage} alt="Preview" />}
          <button type="submit" style={buttonStyles}>
            Update Profile
          </button>
        </form>
      </div>
      <div style={profileStyles}>
        <h2>Change Password</h2>
        <form style={formStyles} onSubmit={handlePasswordSubmit}>
          <label>
            Current Password:
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={handleChange}
            />
          </label>
          <label>
            New Password:
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm New Password:
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
            />
          </label>
          <button type="submit" style={buttonStyles}>
            Change Password
          </button>
        </form>
      </div>
      <button onClick={handleLogOut} style={buttonStyles}>
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;
