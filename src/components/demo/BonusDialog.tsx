import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BonusIcon = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 12V22H4V12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 7H2V12H22V7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface BonusDialogProps {
  showBonus: boolean;
  setShowBonus: (show: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  setShowLogin: (show: boolean) => void;
}

const BonusDialog: React.FC<BonusDialogProps> = ({
  showBonus,
  setShowBonus,
  email,
  setEmail,
  setShowLogin,
}) => {
  const { toast } = useToast();

  const handleBonusSubmit = (e: React.FormEvent) => {
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
    setShowBonus(false);
    setShowLogin(true);
  };

  return (
    <div
      className={`min-h-screen w-[100vw] bg-gradient-to-b from-[#3a2a40] to-[#2a1a30] border-none p-0 mx-auto overflow-hidden ${
        showBonus ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center justify-center p-8 h-[90vh]">
        <div className="bg-pink-400 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
          {BonusIcon}
        </div>
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          You won 150% deposit bonus
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Register with your email to use it
        </p>
        <div className="w-full space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@provider.com"
              className="w-full bg-white/10 text-center text-white p-4 rounded-xl border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
            />
          </div>
        </div>
      </div>
      <div className="h-[10vh] px-4">
        <Button
          onClick={handleBonusSubmit}
          type="submit"
          className="w-full bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-xl font-medium transition-all"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BonusDialog;
