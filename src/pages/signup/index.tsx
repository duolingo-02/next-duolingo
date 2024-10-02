import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signup } from "../../redux/actions/authActions";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  buttonStyles,
  containerStyles,
  formStyles,
  typographyStyles,
} from "../../styles/styles";
import Link from "next/link";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordValidationError = validatePassword();
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("passwordHash", password);
    formData.append("role", role);
    if (profilePicture) {
      formData.append("file", profilePicture);
    }

    dispatch(signup(formData))
      .unwrap()
      .then(() => router.push("/login"))
      .catch(() => {});
  };

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

  return (
    <div className={`${containerStyles.fullScreenCenter} p-4`}>
      <div className={containerStyles.secondCard}>
        <h1
          className={`${typographyStyles.heading1} text-blue-300 text-5xl text-center logoTitle`}
        >
          Lingoleap
        </h1>

        <h2 className={`${typographyStyles.heading2} mb-6 text-center`}>
          Sign Up
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500">
            Signup failed. Please check your information.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto`}
          >
            <label className={formStyles.label} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={formStyles.input}
              required
            />
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <label className={formStyles.label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formStyles.input}
              required
            />
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <label className={formStyles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={formStyles.input}
              required
            />
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <label className={formStyles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={formStyles.input}
              required
            />
            {passwordError && (
              <p className={formStyles.errorText}>{passwordError}</p>
            )}
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <label className={formStyles.label} htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={formStyles.input}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <label className="block text-white mb-4">
              <span className="mb-2">Profile Picture</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`${formStyles.uploadButton} py-2 border-none`}
              />
            </label>
            <div className="w-32 h-32 mb-4">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 text-blue-500 form-checkbox"
              />
              <span className="ml-2 text-white">
                I agree to the{" "}
                <Link href="/terms" className="underline">
                  terms and conditions
                </Link>
              </span>
            </label>
          </div>

          <div
            className={`${formStyles.formGroup} w-full sm:w-2/3 md:w-1/3 mx-auto mt-4`}
          >
            <button
              type="submit"
              className={`${buttonStyles.primary} w-full`}
              disabled={loading || !agreedToTerms}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-duolingoLight">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
