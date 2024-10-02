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
import Image from "next/image";
// import Spinner from "../Spinner";

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
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { username, email, currentPassword, newPassword, confirmPassword } =
    formState;

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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

  const handlePasswordSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match.");
        return;
      }
      setLoading(true);
      try {
        await dispatch(
          updateUserPassword({
            currentPassword,
            newPassword,
          })
        );
        setPasswordError(null);
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

  const handleLogOut = useCallback(() => {
    dispatch(logout());
    router.push("/login");
  }, [dispatch, router]);

  return (
    <div className="container-full-screen-center p-2">
      <div className="container-card max-w-xs mx-auto p-2 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-2">
          <Image
            src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2023/09/duolingo-generic-hero.jpg"
            alt="Duolingo Owl"
            width={30}
            height={30}
          />
        </div>
        <div className="flex justify-center mb-2">
          <img
            className="profile-picture w-12 h-12 rounded-full object-cover"
            src={previewImage || "/path-to-profile-pic.jpg"}
            alt="Profile"
          />
        </div>
        <h2 className="profile-username text-sm font-bold text-center mb-1">
          {username}
        </h2>
        <p className="profile-description text-center text-gray-600 mb-2">
          Joined September 2023
        </p>
        {/* {loading && <Spinner />} Display spinner during loading */}
        <form onSubmit={handleProfileSubmit} className="space-y-1">
          <div className="form-group">
            <label className="form-label block text-gray-700 text-xs">
              Username
            </label>
            <input
              type="text"
              className="form-input w-full p-1 border border-gray-300 rounded text-xs"
              id="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label block text-gray-700 text-xs">
              Email
            </label>
            <input
              type="email"
              className="form-input w-full p-1 border border-gray-300 rounded text-xs"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label block text-gray-700 text-xs">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-input w-full p-1 border border-gray-300 rounded text-xs"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="button-primary w-full py-1 bg-blue-500 text-white rounded text-xs"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <form className="mt-2 space-y-1" onSubmit={handlePasswordSubmit}>
          {passwordError && (
            <p className="text-red-500 text-xs">{passwordError}</p>
          )}
          <div className="form-group">
            <label className="form-label block text-gray-700 text-xs">
              Current Password
            </label>
            <input
              type="password"
              className="form-input w-full p-1 border border-gray-300 rounded text-xs"
              id="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label block text-gray-700 text-xs">
              New Password
            </label>
            <input
              type="password"
              className="form-input w-full p-1 border border-gray-300 rounded text-xs"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label block text-gray-700 text-xs">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-input w-full p-1 border border-gray-300 rounded text-xs"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="button-primary w-full py-1 bg-blue-500 text-white rounded text-xs"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
        <button
          className="button-logout mt-2 w-full py-1 bg-red-500 text-white rounded text-xs"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
