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
    <div className="flex items-center justify-center min-h-screen bg-duolingo-dark">
      <div className="bg-duolingo-dark p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image
            src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2023/09/duolingo-generic-hero.jpg"
            alt="Duolingo Owl"
            width={80}
            height={80}
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-duolingo-green">
          Profile
        </h1>
        <div className="flex justify-center mb-4">
          <img
            className="w-32 h-32 rounded-full shadow-md border-4 border-duolingo-green"
            src={previewImage || "/path-to-profile-pic.jpg"}
            alt="Profile"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2 text-duolingo-green">
          {username}
        </h2>
        <p className="text-center text-duolingo-light mb-6">
          This is your bio description. You can edit it in your profile
          settings.
        </p>
        <form className="space-y-4" onSubmit={handleProfileSubmit}>
          <div>
            <label className="block text-duolingo-light">Username:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg bg-duolingo-dark text-duolingo-light"
              id="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-duolingo-light">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg bg-duolingo-dark text-duolingo-light"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-duolingo-light">
              Profile Picture:
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg bg-duolingo-dark text-duolingo-light"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-duolingo-green text-duolingo-light rounded-lg hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <form className="space-y-4 mt-6" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-duolingo-light">
              Current Password:
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg bg-duolingo-dark text-duolingo-light"
              id="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-duolingo-light">New Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg bg-duolingo-dark text-duolingo-light"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-duolingo-light">
              Confirm New Password:
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg bg-duolingo-dark text-duolingo-light"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-duolingo-green text-duolingo-light rounded-lg hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
        <button
          className="w-full py-2 mt-4 bg-red-500 text-duolingo-light rounded-lg hover:bg-red-600 transition duration-200"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
