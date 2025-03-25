import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import { Colors } from "@/constants/colors";

const LoginPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [showEmail, setShowEmail] = useState(true);

  const navigate = useNavigate();

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
    setShowEmail(false);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 8) {
      navigate("/home");
    } else {
      toast({
        title: "Invalid Password",
        description: "Please enter at least 8 characters",
        variant: "destructive",
      });
      setPassword("");
      return;
    }
  };

  const handleBack = () => {
    if (showVerifyEmail) {
      setShowVerifyEmail(false);
      setShowPassword(true);
      return;
    } else {
      setShowPassword(false);
      setPassword("");
      return;
    }
  };

  const handleResetPassword = () => {
    navigate("/");
  };

  const handleResendEmail = () => {};

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResetPassword(true);
    setShowVerifyEmail(false);
  };
  return (
    <div
      className={`min-h-screen w-[100vw] bg-gradient-to-b from-[#3a2a40] to-[#2a1a30] border-none p-0 mx-auto overflow-hidden `}
    >
      <div className="flex w-full flex-col items-center justify-center p-8 h-screen gap-8">
        <div className="h-1/2 flex flex-col items-center justify-center">
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            {showEmail && "Welcome to Plinko"}
            {showPassword && `Welcome back, ${email}`}
            {showVerifyEmail && "We've sent you an email with a one time code"}
            {showResetPassword && "Enter your new password"}
          </h2>
          <p className="text-gray-300 text-center mb-6">
            {showEmail && "Enter your Email to start playing"}
          </p>
        </div>

        <div className="w-full space-y-4 p-4 h-1/2 flex flex-col items-start justify-start">
          <div className="text-white text-center mx-auto">
            {showPassword && "Enter your Password"}
            {showEmail && "Your Email"}
            {showVerifyEmail && "Enter one time code"}
            {showResetPassword && "New Password"}
          </div>
          {showPassword ? (
            <>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******************"
                className="w-full bg-white/10 text-center text-white p-4 rounded-xl border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
              />
            </>
          ) : (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@provider.com"
              className="w-full bg-white/10 text-center text-white p-4 rounded-xl border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
            />
          )}
          <div
            className="text-[#FF80CF] text-center mx-auto"
            onClick={() => {
              if (showVerifyEmail) {
                handleResendEmail();
              } else if (showPassword) {
                setShowVerifyEmail(true);
                setShowPassword(false);
              }
            }}
          >
            {showPassword && "Forgot password?"}
            {showVerifyEmail && "Resend the email"}
          </div>
        </div>
        <div className="w-full absolute bottom-10 p-4">
          {showEmail && (
            <Button
              onClick={handleEmailSubmit}
              type="submit"
              className={`w-full ${Colors.pink_bg} ${Colors.pink_button} hover:bg-pink-500 text-xl py-4 rounded-xl font-medium transition-all`}
            >
              Continue
            </Button>
          )}
          <div className="flex flex-row gap-4">
            {showPassword && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="px-6 py-5 w-[30%] rounded-xl bg-white/5 text-white text-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            {showVerifyEmail && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="px-6 py-5 w-[30%] rounded-xl bg-white/5 text-xl text-white border border-white/10 hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            {showVerifyEmail && (
              <Button
                onClick={(e) => handleProceed(e)}
                className={`px-8 py-5 w-[80%] rounded-xl ${Colors.pink_bg} ${Colors.pink_button} hover:bg-plinko-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-plinko-accent/20`}
              >
                Proceed
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            {showPassword && (
              <Button
                onClick={(e) => handleStart(e)}
                className={`px-8 py-5 w-[80%] rounded-xl ${Colors.pink_bg} ${Colors.pink_button}  hover:bg-plinko-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-plinko-accent/20`}
              >
                Start Playing <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
          {showResetPassword && (
            <Button
              onClick={handleResetPassword}
              type="submit"
              className={`w-full ${Colors.pink_bg} ${Colors.pink_button} hover:bg-pink-500 text-white py-4 rounded-xl font-medium transition-all`}
            >
              Start Playing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
