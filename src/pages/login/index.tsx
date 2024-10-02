import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image';

import { login } from "../../redux/actions/authActions";
import { AppDispatch, RootState } from "../../redux/store/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        login({ email, passwordHash: password })
      ).unwrap();

      router.push("/");
    } catch (err) {
      const errorMessage = (err as any).message || "Login failed";
      console.error("Login failed", errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-duolingoDark">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Image src="/assets/icons/icon.svg" alt="LingoLeap Logo" width={40} height={40} />
          <h1 className="ml-2 text-3xl font-bold text-duolingoGreen">LINGOLEAP</h1>
        </div>
        <h2 className="text-4xl font-bold text-center text-duolingoLight mb-8">Lingoleap</h2>
        <h3 className="text-2xl font-semibold text-center text-duolingoLight mb-6">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-full bg-duolingoLight text-duolingoDark placeholder-duolingoDark"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-duolingoLight text-duolingoDark placeholder-duolingoDark"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">Login failed. Please check your information.</p>}
          <button
            type="submit"
            className="w-full py-3 text-xl font-bold rounded-full bg-duolingoGreen text-duolingoLight hover:bg-opacity-90 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-duolingoLight">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-duolingoGreen hover:text-opacity-80">
            Create a profile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;