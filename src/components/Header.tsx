import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { MusicPlayer } from "./MusicPlayer";
import { MenuDropdown } from "./MenuDropdown";
import { useNavigate } from "react-router-dom";
import {
  Music,
  MessageSquare,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";

const Header = () => {
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      label: "Twitter",
      onClick: () => window.open("https://twitter.com", "_blank"),
    },
    {
      label: "Discord",
      onClick: () => window.open("https://discord.com", "_blank"),
    },
    { label: "How to play", onClick: () => {} },
    { label: "AML", onClick: () => {} },
    { label: "KYC", onClick: () => {} },
    { label: "Terms & Conditions", onClick: () => {} },
    { label: "Privacy Policy", onClick: () => {} },
    { label: "Responsible Gaming", onClick: () => {} },
    { label: "Customer Support", onClick: () => {} },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="flex justify-between items-center mb-6 h-[10%]">
      <h1 className="text-3xl font-bold text-white">Plinko!</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white text-lg">
          Chat
          <span className="bg-white text-black bg-opacity-40 text-md px-2 rounded-full">
            14
          </span>
        </div>
        <button
          // onClick={() => navigate("/music")}
          className="text-white bg-opacity-10 p-2 text-lg rounded-full"
        >
          Music
        </button>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowMenu(true)}
          className="text-white bg-opacity-10 rounded-full relative border border-white border-[2px] cursor-pointer"
        >
          <MoreHorizontal className="w-5 h-5" />
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white bg-opacity-30 backdrop-blur-lg rounded-md shadow-lg z-10"
            >
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setShowMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-100 ${
                    index === 1
                      ? "border-b border-gray-300 border-opacity-30"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
