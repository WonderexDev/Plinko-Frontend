import React from "react";
import { ChevronLeft, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatePasswordDialogProps {
  showLogin: boolean;
  email: string;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  handleStart: (e: React.FormEvent) => void;
  handleBack: () => void;
}

const CreatePasswordDialog: React.FC<CreatePasswordDialogProps> = ({
  showLogin,
  email,
  password,
  setPassword,
  error,
  handleStart,
  handleBack,
}) => {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-plinko-background to-black p-6"
      style={{ display: `${showLogin ? "block" : "none"}` }}
    >
      <div className="h-[85vh] items-center justify-center flex flex-col">
        <div className="w-full max-w-md text-center mb-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome,
            </h1>
            <p className="text-2xl text-white/80 font-light">{email}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl">
            <div className="inline-flex justify-center items-center bg-plinko-accent/20 p-3 rounded-full mb-6">
              <Lock className="w-6 h-6 text-plinko-accent" />
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <label className="text-white/90 mb-2 block font-medium">
                  Create your password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 text-center text-white p-4 rounded-xl border border-white/10 focus:border-plinko-accent focus:ring-1 focus:ring-plinko-accent transition-all"
                  placeholder="****************"
                  required
                />
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>

              <p className="text-white/60 text-sm">
                Password must be at least 8 characters
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[10vh] w-full flex justify-center gap-4 ">
        <Button
          onClick={handleBack}
          variant="outline"
          className="px-6 py-5 w-[30%] rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Button
          onClick={(e) => handleStart(e)}
          className="px-8 py-5 w-[80%] rounded-xl bg-plinko-accent text-white hover:bg-plinko-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-plinko-accent/20"
        >
          Start Playing <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CreatePasswordDialog;
