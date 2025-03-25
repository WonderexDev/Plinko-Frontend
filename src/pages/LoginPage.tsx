import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("userEmail", email);
    setEmail(email);
    setShowPassword(true);
  };

  return (
    <div
      className={`min-h-screen w-[100vw] bg-gradient-to-b from-[#3a2a40] to-[#2a1a30] border-none p-0 mx-auto overflow-hidden `}
    >
      <div className="flex w-full flex-col items-center justify-center p-8 h-screen gap-8">
        <div className="h-1/2 flex flex-col items-center justify-center">
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            Welcome to Plinko
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Enter your Email to start playing
          </p>
        </div>
        <div className="w-full space-y-4 p-4 h-1/2 flex flex-col items-start justify-start">
          <div className="text-white text-center mx-auto">Your Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@provider.com"
            className="w-full bg-white/10 text-center text-white p-4 rounded-xl border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
          />
        </div>
        <div className="w-full absolute bottom-10 p-4">
          <Button
            onClick={handleEmailSubmit}
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-xl font-medium transition-all"
          >
            Continue
          </Button>
        </div>
      </div>

      <div className={`display: ${showPassword ? "block" : "hidden"}`}></div>
    </div>
  );
};

export default LoginPage;
