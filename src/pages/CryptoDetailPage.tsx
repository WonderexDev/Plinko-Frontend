import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ArrowUpDown } from "lucide-react";
import { Colors } from "@/constants/colors";

const icons = {
  sol: (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_84_859)">
        <path
          d="M3.51873 11.9485C3.6346 11.833 3.79392 11.7656 3.96289 11.7656H19.2862C19.5662 11.7656 19.7062 12.1025 19.5083 12.2998L16.4813 15.3171C16.3654 15.4326 16.2061 15.5 16.0371 15.5H0.713804C0.433794 15.5 0.293789 15.1631 0.491728 14.9658L3.51873 11.9485Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M3.51873 11.9485C3.6346 11.833 3.79392 11.7656 3.96289 11.7656H19.2862C19.5662 11.7656 19.7062 12.1025 19.5083 12.2998L16.4813 15.3171C16.3654 15.4326 16.2061 15.5 16.0371 15.5H0.713804C0.433794 15.5 0.293789 15.1631 0.491728 14.9658L3.51873 11.9485Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M16.4813 6.27959C16.3654 6.1641 16.2061 6.09673 16.0371 6.09673H0.713825C0.433815 6.09673 0.293809 6.43359 0.491748 6.63089L3.51875 9.64822C3.63462 9.76371 3.79394 9.83109 3.96291 9.83109H19.2862C19.5662 9.83109 19.7062 9.49422 19.5083 9.29692L16.4813 6.27959Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M16.4813 6.27959C16.3654 6.1641 16.2061 6.09673 16.0371 6.09673H0.713825C0.433815 6.09673 0.293809 6.43359 0.491748 6.63089L3.51875 9.64822C3.63462 9.76371 3.79394 9.83109 3.96291 9.83109H19.2862C19.5662 9.83109 19.7062 9.49422 19.5083 9.29692L16.4813 6.27959Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M3.51851 0.682868C3.6392 0.567372 3.79852 0.5 3.96266 0.5H19.286C19.566 0.5 19.706 0.836862 19.5081 1.03417L16.481 4.05149C16.3652 4.16699 16.2059 4.23436 16.0369 4.23436H0.713581C0.433571 4.23436 0.293566 3.8975 0.491504 3.70019L3.51851 0.682868Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M3.51851 0.682868C3.6392 0.567372 3.79852 0.5 3.96266 0.5H19.286C19.566 0.5 19.706 0.836862 19.5081 1.03417L16.481 4.05149C16.3652 4.16699 16.2059 4.23436 16.0369 4.23436H0.713581C0.433571 4.23436 0.293566 3.8975 0.491504 3.70019L3.51851 0.682868Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
      <defs>
        <clipPath id="clip0_84_859">
          <rect
            width="19.2"
            height="15"
            fill="white"
            transform="translate(0.400024 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  eth: (
    <svg
      width="13"
      height="20"
      viewBox="0 0 13 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_84_380)">
        <path
          d="M6.67579 0.694621C6.48068 0.376591 6.01857 0.37658 5.82344 0.6946L0 10.1855L5.63772 7.6666C6.02711 7.49263 6.47215 7.49264 6.86154 7.66663L12.4986 10.1855L6.67579 0.694621Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M6.67579 0.694621C6.48068 0.376591 6.01857 0.37658 5.82344 0.6946L0 10.1855L5.63772 7.6666C6.02711 7.49263 6.47215 7.49264 6.86154 7.66663L12.4986 10.1855L6.67579 0.694621Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M0.406412 11.585C0.313049 11.5308 0.21195 11.6425 0.275161 11.73L5.84445 19.4392C6.044 19.7154 6.45535 19.7155 6.65497 19.4393L12.2274 11.73C12.2907 11.6425 12.1896 11.5307 12.0962 11.5849L7.00239 14.5391C6.53688 14.8091 5.96243 14.809 5.49699 14.539L0.406412 11.585Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M0.406412 11.585C0.313049 11.5308 0.21195 11.6425 0.275161 11.73L5.84445 19.4392C6.044 19.7154 6.45535 19.7155 6.65497 19.4393L12.2274 11.73C12.2907 11.6425 12.1896 11.5307 12.0962 11.5849L7.00239 14.5391C6.53688 14.8091 5.96243 14.809 5.49699 14.539L0.406412 11.585Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M0 10.1854L5.99858 13.6679C6.15382 13.758 6.34545 13.758 6.50068 13.6679L12.4986 10.1854L6.24963 7.39478L0 10.1854Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          d="M0 10.1854L5.99858 13.6679C6.15382 13.758 6.34545 13.758 6.50068 13.6679L12.4986 10.1854L6.24963 7.39478L0 10.1854Z"
          fill="white"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
      <defs>
        <clipPath id="clip0_84_380">
          <rect width="12.5026" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  usdt: (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.44148 8.03726V8.03576C9.35898 8.04176 8.93373 8.06726 7.98497 8.06726C7.22748 8.06726 6.69423 8.04476 6.50673 8.03576V8.03801C3.59073 7.90976 1.41423 7.40201 1.41423 6.79451C1.41423 6.18776 3.59073 5.68001 6.50673 5.54951V7.53251C6.69723 7.54601 7.24323 7.57826 7.99773 7.57826C8.90298 7.57826 9.35673 7.54076 9.44148 7.53326V5.55101C12.3515 5.68076 14.5227 6.18851 14.5227 6.79451C14.5227 7.40201 12.3515 7.90826 9.44148 8.03726ZM9.44148 5.34476V3.57026H13.502V0.864258H2.44623V3.57026H6.50673V5.34401C3.20673 5.49551 0.724976 6.14951 0.724976 6.93251C0.724976 7.71551 3.20673 8.36876 6.50673 8.52101V14.2075H9.44148V8.51951C12.7362 8.36801 15.212 7.71476 15.212 6.93251C15.212 6.15026 12.7362 5.49701 9.44148 5.34476Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.44148 8.03726V8.03576C9.35898 8.04176 8.93373 8.06726 7.98497 8.06726C7.22748 8.06726 6.69423 8.04476 6.50673 8.03576V8.03801C3.59073 7.90976 1.41423 7.40201 1.41423 6.79451C1.41423 6.18776 3.59073 5.68001 6.50673 5.54951V7.53251C6.69723 7.54601 7.24323 7.57826 7.99773 7.57826C8.90298 7.57826 9.35673 7.54076 9.44148 7.53326V5.55101C12.3515 5.68076 14.5227 6.18851 14.5227 6.79451C14.5227 7.40201 12.3515 7.90826 9.44148 8.03726ZM9.44148 5.34476V3.57026H13.502V0.864258H2.44623V3.57026H6.50673V5.34401C3.20673 5.49551 0.724976 6.14951 0.724976 6.93251C0.724976 7.71551 3.20673 8.36876 6.50673 8.52101V14.2075H9.44148V8.51951C12.7362 8.36801 15.212 7.71476 15.212 6.93251C15.212 6.15026 12.7362 5.49701 9.44148 5.34476Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  ),
  btc: (
    <svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4331 7.99233C14.7193 6.07623 13.2604 5.04618 11.2656 4.35903L11.9127 1.76343L10.3323 1.36968L9.70228 3.89688C9.28738 3.79338 8.86078 3.69573 8.43688 3.59898L9.07138 1.05513L7.49233 0.661377L6.84478 3.25608C6.50098 3.17778 6.16348 3.10038 5.83588 3.01893L5.83768 3.01083L3.65878 2.46678L3.23848 4.15428C3.23848 4.15428 4.41073 4.42293 4.38598 4.43958C5.02588 4.59933 5.14198 5.02278 5.12218 5.35848L4.38508 8.31543C4.42918 8.32668 4.48633 8.34288 4.54933 8.36808L4.38283 8.32668L3.34918 12.4689C3.27088 12.6633 3.07243 12.9549 2.62513 12.8442C2.64088 12.8672 1.47673 12.5576 1.47673 12.5576L0.692383 14.3666L2.74888 14.8791C3.13138 14.975 3.50623 15.0753 3.87478 15.1698L3.22093 17.7956L4.79908 18.1893L5.44708 15.5919C5.87773 15.7089 6.29623 15.8169 6.70573 15.9186L6.06043 18.5039L7.64038 18.8976L8.29423 16.2773C10.9884 16.7871 13.0147 16.5815 13.8666 14.1452C14.5537 12.1832 13.8328 11.0514 12.4153 10.313C13.4476 10.074 14.2257 9.39498 14.4331 7.99233ZM10.8228 13.0544C10.3341 15.0164 7.03108 13.9562 5.95963 13.6898L6.82723 10.2117C7.89823 10.479 11.3317 11.0082 10.8228 13.0544ZM11.311 7.96398C10.8655 9.74868 8.11603 8.84193 7.22368 8.61963L8.01028 5.46513C8.90263 5.68743 11.7754 6.10233 11.311 7.96398Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M14.4331 7.99233C14.7193 6.07623 13.2604 5.04618 11.2656 4.35903L11.9127 1.76343L10.3323 1.36968L9.70228 3.89688C9.28738 3.79338 8.86078 3.69573 8.43688 3.59898L9.07138 1.05513L7.49233 0.661377L6.84478 3.25608C6.50098 3.17778 6.16348 3.10038 5.83588 3.01893L5.83768 3.01083L3.65878 2.46678L3.23848 4.15428C3.23848 4.15428 4.41073 4.42293 4.38598 4.43958C5.02588 4.59933 5.14198 5.02278 5.12218 5.35848L4.38508 8.31543C4.42918 8.32668 4.48633 8.34288 4.54933 8.36808L4.38283 8.32668L3.34918 12.4689C3.27088 12.6633 3.07243 12.9549 2.62513 12.8442C2.64088 12.8672 1.47673 12.5576 1.47673 12.5576L0.692383 14.3666L2.74888 14.8791C3.13138 14.975 3.50623 15.0753 3.87478 15.1698L3.22093 17.7956L4.79908 18.1893L5.44708 15.5919C5.87773 15.7089 6.29623 15.8169 6.70573 15.9186L6.06043 18.5039L7.64038 18.8976L8.29423 16.2773C10.9884 16.7871 13.0147 16.5815 13.8666 14.1452C14.5537 12.1832 13.8328 11.0514 12.4153 10.313C13.4476 10.074 14.2257 9.39498 14.4331 7.99233ZM10.8228 13.0544C10.3341 15.0164 7.03108 13.9562 5.95963 13.6898L6.82723 10.2117C7.89823 10.479 11.3317 11.0082 10.8228 13.0544ZM11.311 7.96398C10.8655 9.74868 8.11603 8.84193 7.22368 8.61963L8.01028 5.46513C8.90263 5.68743 11.7754 6.10233 11.311 7.96398Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  ),
};

const CryptoDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  // Get crypto details from location state or use default
  const cryptoDetails = location.state?.crypto || {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth",
    balance: 3.038,
  };

  const handleDepositClick = () => {
    navigate("/deposite", {
      state: {
        amount: depositAmount,
        crypto: cryptoDetails,
      },
    });
  };

  const handleWithdrawClick = () => {};

  return (
    <div className="min-h-screen bg-[#1a1520] text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{cryptoDetails.name}</h1>
          <div className="flex items-center text-lg">
            <span className="text-purple-300 mr-1">
              {icons[cryptoDetails.icon]}
            </span>
            <span>{cryptoDetails.balance}</span>
          </div>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => navigate("/wallet")}
          variant="outline"
          className="w-full bg-[#2a2230] hover:bg-[#352a3d] text-white border-none py-4 text-xl rounded-xl mb-6 flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>

        {/* Deposit Section */}
        <h2 className="text-lg font-medium mb-3">Deposit</h2>
        <div className="bg-[#2a2230] p-4 rounded-xl mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={depositAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, "");
                  setDepositAmount(value);
                }}
                placeholder="0 ETH"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none focus:border-pink-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-[#4a3a50] px-4 py-1 rounded-md">
                <span className="text-sm mr-1 flex items-center gap-1">
                  {icons[cryptoDetails.icon]} ETH
                </span>
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </div>
            <div
              className={` text-[#FF80CF]/80 text-xs text-gray-400 mt-1 ml-1`}
            >
              {depositAmount === ""
                ? "+150% Deposite Bonus Applied 🤑"
                : "Deposite Amount"}
            </div>
          </div>

          <Button
            onClick={handleDepositClick}
            className={`w-full ${
              depositAmount === "" || depositAmount === "0"
                ? "bg-[#3a2a40] hover:bg-[#4a3a50] "
                : ` ${Colors.pink_bg} ${Colors.pink_button}  hover:from-pink-600 hover:to-pink-700`
            }  text-gray-300 py-3 rounded-xl border border-[#4a3a50]`}
          >
            {depositAmount === "" && "Fill the amount to Deposit"}
            {depositAmount !== "" && "Generate Address"}
          </Button>
        </div>

        {/* Cashout Section */}
        <h2 className="text-lg font-medium mb-3">Cashout</h2>
        <div className="bg-[#2a2230] p-4 rounded-xl mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0 ETH"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none focus:border-pink-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="bg-[#4a3a50] text-white text-xs px-2 py-1 rounded-md">
                  MAX
                </button>
                <div className="flex items-center bg-[#4a3a50] px-2 py-1 rounded-md">
                  <span className="text-sm mr-1 flex items-center gap-1">
                    {icons[cryptoDetails.icon]} ETH
                  </span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Amount to withdraw
            </div>
          </div>

          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder="0x"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none focus:border-pink-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a3a50] text-white text-xs px-2 py-1 rounded-md">
                PASTE
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Your Ethereum Address
            </div>
          </div>

          <Button
            onClick={handleWithdrawClick}
            className={`w-full ${
              withdrawAmount === "" || withdrawAmount === "0"
                ? "bg-[#3a2a40] hover:bg-[#4a3a50]"
                : `${Colors.pink_bg} ${Colors.pink_button} hover:from-pink-600 hover:to-pink-700`
            }  text-gray-300 py-3 rounded-xl border border-[#4a3a50]`}
          >
            {withdrawAmount === "" && "Fill the fields to Withdraw"}
            {withdrawAmount !== "" && "Withdraw"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;
