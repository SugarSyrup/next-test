"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-800 text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}

export default function Home() {
  const initialState: LoginState = {};
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form action={formAction} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 ${
                  state?.errors?.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-red-400"
                }`}
              />
              {state?.errors?.email && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 ${
                  state?.errors?.username
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-red-400"
                }`}
              />
              {state?.errors?.username && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.username}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
                  />
                </svg>
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400 ${
                  state?.errors?.password
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-red-400"
                }`}
              />
              {state?.errors?.password && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.password}
                </p>
              )}
            </div>

            <SubmitButton />

            {state?.success && state?.message && (
              <div className="mb-6 bg-green-500 text-white p-4 rounded-xl flex items-center gap-3 shadow-lg">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">{state.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
