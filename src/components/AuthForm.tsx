// AuthForm.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlices";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = mode === "signup" ? { name, email, password } : { email, password };
    
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      if (mode === "login") {
        dispatch(login({ token: data.token, user: data.user }));
        Cookies.set("token", data.token, { expires: 1 }); // Save token in cookies for 1 day
        localStorage.setItem("token", data.token); // Save token in localStorage
        router.push("/home");
      } else {
        setMode("login"); // Switch to login mode after successful signup
      }
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Assuming you have an endpoint to get the user's details by token
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          dispatch(login({ token, user: data.user }));
          router.push("/home");
        }
      });
    }
  }, [dispatch, router]);

  return (
    <section className="bg-custom-gradient h-screen flex justify-center items-center text-black">
      <div className="bg-form-gradient w-1/3 rounded-lg p-8">
        <h1 className="text-3xl text-center mb-6 font-bold">Welcome to <span className="text-indigo-700">Workflo!</span></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 p-3 rounded-lg"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-600"
          >
            {mode === "login" ? "Login" : "Signup"}
          </button>
        </form>
        <div className="text-center mt-4">
          {mode === "login" ? (
            <p>
              Don’t have an account? Create a{" "}
              <span onClick={() => setMode("signup")} className="text-blue-500 underline cursor-pointer">
                new account
              </span>
              .
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setMode("login")} className="text-blue-500 underline cursor-pointer">
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
