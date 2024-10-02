import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const validatePassword = () => {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const passwordError = validatePassword();
    if (passwordError) {
      setErrorMessage(passwordError);
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("You must agree to the terms and conditions");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const userData = JSON.stringify({
      username,
      email,
      passwordHash: password,
    });
    formData.append("data", userData);
    if (profilePicture) {
      formData.append("file", profilePicture);
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during signup");
      }

      router.push("/login");
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-duolingoDark flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
          <Image src="/assets/icons/icon.svg" alt="LingoLeap Logo" width={40} height={40} />
            <h1 className="ml-2 text-3xl font-bold text-duolingoGreen">LINGOLEAP</h1>
          </div>
          <button className="text-duolingoLight">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-4xl font-bold text-center text-duolingoLight mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-duolingoLight text-duolingoDark placeholder-duolingoDark"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-duolingoLight text-duolingoDark placeholder-duolingoDark"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-duolingoLight text-duolingoDark placeholder-duolingoDark"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-duolingoLight text-duolingoDark placeholder-duolingoDark"
            required
          />
          <div className="flex flex-col items-center space-y-2">
            <div className="w-32 h-32 bg-duolingoLight rounded-full overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-duolingoDark">No Image</div>
              )}
            </div>
            <p className="text-duolingoLight">Profile Picture</p>
            <label className="px-4 py-2 bg-duolingoGreen text-duolingoLight rounded-full cursor-pointer hover:bg-opacity-90 transition duration-200">
              Choose File
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-duolingoGreen border-duolingoLight rounded focus:ring-duolingoGreen"
            />
            <label className="ml-2 text-sm text-duolingoLight">
              I agree to the <Link href="/terms" className="text-duolingoGreen hover:underline">terms and conditions</Link>
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 text-xl font-bold bg-duolingoGreen text-duolingoLight rounded-full hover:bg-opacity-90 transition duration-200"
            disabled={loading || !agreedToTerms}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-center text-duolingoLight">
          Already have an account?{" "}
          <Link href="/login" className="text-duolingoGreen hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;