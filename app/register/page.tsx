"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";

const Register = () => {
  const uniqueId = uuidv4();
  const router = useRouter();
  const { register, isAuthenticated } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!form.email || !form.password) {
      return alert("Please fill in all fields");
    }

    // Simulate registration
    const isRegistered = register({
      id: uniqueId,
      password: form.password,
      email: form.email,
    });

    if (isRegistered) {
      router.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background text-textPrimary px-4">
        <div className="bg-surface p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold">Create an Account</h2>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
