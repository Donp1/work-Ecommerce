"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      return alert("Fill in all fields");
    }

    const isLoggedIn = login({ email, password });
    if (isLoggedIn) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Login</h2>
          <Input
            type="email"
            placeholder="Email"
            className="mb-3 bg-background text-textPrimary border border-secondary w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-4 bg-background text-textPrimary border border-secondary w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full flex items-center justify-center bg-primary text-white hover:bg-secondary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </main>
    </div>
  );
}
