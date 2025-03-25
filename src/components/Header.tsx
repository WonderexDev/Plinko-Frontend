import { useState, useEffect, useRef } from "react";
import { MoreHorizontal } from "lucide-react";
import { set } from "date-fns";

interface HeaderProps {
  demo: boolean;
}

const Header: React.FC<HeaderProps> = ({ demo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="text-white bg-opacity-10 p-2 text-lg rounded-full"
        >
          <span>Music</span>
          {isOpen && (
            <div open={isOpen} onOpenChange={handleOpenChange}>
              <div className="max-w-md p-0 border border-white/10 overflow-hidden rounded-3xl bg-transparent backdrop-blur-md bg-white/5 shadow-2xl">
                <div className="p-6 text-white">
                  {/* Title and artist */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold">
                      Tru Tones – Dancing (f
                    </h3>
                    <p className="text-lg text-white/90 mt-1">Seth Pantalony</p>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-between items-center px-8 py-4">
                    <button className="text-white hover:text-white/80 transition-colors">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 20L9 12L19 4V20Z" fill="currentColor" />
                        <path d="M7 20L7 4H5L5 20H7Z" fill="currentColor" />
                      </svg>
                    </button>

                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {isPlaying ? (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 4H10V20H6V4Z" fill="currentColor" />
                          <path d="M14 4H18V20H14V4Z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
                        </svg>
                      )}
                    </button>

                    <button className="text-white hover:text-white/80 transition-colors">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 4L15 12L5 20V4Z" fill="currentColor" />
                        <path d="M17 4V20H19V4H17Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-white/30"
                      ></div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
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
              {!demo && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-100 border-t border-gray-300 border-opacity-30`}
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
