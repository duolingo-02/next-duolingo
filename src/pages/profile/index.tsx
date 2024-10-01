"use client";

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
  const [loading, setLoading] = useState(false);

  const { username, email, currentPassword, newPassword, confirmPassword } =
    formState;

  // Fetch user profile when the component is mounted
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Update the form state when the user profile data is fetched
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

  // Handle input change for profile update
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  }, []);

  // Handle profile picture change
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

  // Handle profile form submission
  const handleProfileSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (profilePicture) {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("email", email);
          formData.append("profilePicture", profilePicture);
          await dispatch(updateUserProfileWithPicture(formData));
        } else {
          await dispatch(updateUserProfile({ username, email }));
        }
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("An error occurred while updating your profile.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, username, email, profilePicture]
  );

  // Handle password change form submission
  const handlePasswordSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        return alert("Passwords do not match");
      }
      setLoading(true);
      try {
        await dispatch(
          updateUserPassword({
            currentPassword,
            newPassword,
          })
        );
        alert("Password changed successfully!");
      } catch (error) {
        console.error("Failed to change password:", error);
        alert("An error occurred while changing your password.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, currentPassword, newPassword, confirmPassword]
  );

  // Handle logout
  const handleLogOut = useCallback(() => {
    dispatch(logout());
    router.push("/login");
  }, [dispatch, router]);

  return (
    <div className={containerStyles.fullScreenCenter}>
      <div className={containerStyles.card}>
        <h1 className={typographyStyles.heading1}>Profile</h1>
        <div className={profileStyles.pictureContainer}>
          <img
            className={profileStyles.picture}
            src={previewImage || "/path-to-profile-pic.jpg"}
            alt="Profile"
          />
        </div>
        <h2 className={profileStyles.username}>{username}</h2>
        <p className={profileStyles.profileDescription}>
          This is your bio description. You can edit it in your profile
          settings.
        </p>
        <form className={formStyles.formGroup} onSubmit={handleProfileSubmit}>
          <label className={formStyles.label}>
            Username:
            <input
              type="text"
              className={formStyles.input}
              id="username"
              value={username}
              onChange={handleChange}
              required
            />
          </label>
          <label className={formStyles.label}>
            Email:
            <input
              type="email"
              className={formStyles.input}
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </label>
          <label className={formStyles.label}>
            Profile Picture:
            <input
              type="file"
              className={formStyles.input}
              onChange={handleImageChange}
            />
          </label>
          <button
            type="submit"
            className={buttonStyles.primary}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <form className={formStyles.formGroup} onSubmit={handlePasswordSubmit}>
          <label className={formStyles.label}>
            Current Password:
            <input
              type="password"
              className={formStyles.input}
              id="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label className={formStyles.label}>
            New Password:
            <input
              type="password"
              className={formStyles.input}
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label className={formStyles.label}>
            Confirm New Password:
            <input
              type="password"
              className={formStyles.input}
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className={buttonStyles.primary}
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
        <button className={buttonStyles.logout} onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
