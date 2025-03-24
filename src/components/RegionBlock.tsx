import React from "react";

interface RegionBlockProps {
  showRegionBlock: boolean;
}

const RegionBlock: React.FC<RegionBlockProps> = ({ showRegionBlock }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      style={{ display: `${showRegionBlock ? "block" : "none"}` }}
    >
      <div className="bg-[#2a2230] p-8 max-w-2xl w-full text-center absolute bottom-0">
        {/* Pink button - decorative */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-plinko-accent rounded-xl mx-auto mb-8"></div>

        {/* Region block message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Plinko is not available in your region
        </h2>

        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          Due to licensing restrictions, we cannot accept players from Spain. If
          you're using a VPN, please disable it and try again.
        </p>
      </div>
    </div>
  );
};

export default RegionBlock;
