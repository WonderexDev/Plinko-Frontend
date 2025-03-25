import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddHomeProps {
  showTap: boolean;
  handleLogin: () => void;
}

const AddHome: React.FC<AddHomeProps> = ({ showTap, handleLogin }) => {
  if (!showTap) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#2a2230] w-full overflow-hidden absolute bottom-0">
        <div className="p-8 flex flex-col items-center">
          <div className="bg-pink-400 w-16 h-16 rounded-2xl mb-6"></div>

          <h2 className="text-white text-2xl font-medium text-center mb-2">
            Add to your home screen to play
          </h2>

          <p className="text-gray-400 text-center mb-6">
            You must do this from the sharing menu in Safari in order to play
            Plinko
          </p>

          <div className="flex items-center text-gray-300 mb-6">
            <span>Tap</span>
            <Share2 className="mx-2 w-5 h-5" />
            <span>then tap "Add on the home screen"</span>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-pink-400 text-white hover:bg-pink-500 py-3 rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHome;
