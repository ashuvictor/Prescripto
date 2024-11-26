import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up"); // Manage form state (Sign Up or Login)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password || (state === "Sign Up" && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    // Logic to handle login or sign-up (e.g., API call)
    if (state === "Sign Up") {
      console.log("Sign Up", { name, email, password });
    } else {
      console.log("Login", { email, password });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login Account"}
        </p>
        <p className="mt-4 mb-3">
          Please {state === "Sign Up" ? "Sign up" : "Login"} to book the
          appointment
        </p>

        {/* Full Name Input - Only for Sign Up */}
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-500 rounded w-full p-2 mt-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={state === "Sign Up"}
              aria-label="Full Name"
              placeholder="Enter your full name"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-500 rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-500 rounded w-full p-2 mt-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base mt-3"
        >
          {state === "Sign Up" ? "Create Account" : "Login Account"}
        </button>

        {/* Toggle between Sign Up and Login */}
        {state === "Sign Up" ? (
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm">
            Create a new account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
