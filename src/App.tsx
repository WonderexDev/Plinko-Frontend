import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import DemoMode from "@/pages/DemoMode";
import LoginPage from "@/pages/LoginPage";
import VerifyCode from "@/pages/VerifyCode";
import HomePage from "@/pages/HomePage";
import WalletPage from "@/pages/WalletPage";
import CryptoDetailPage from "@/pages/CryptoDetailPage";
import FundedHomePage from "@/pages/FundedHomePage";
import DepositAddressPage from "@/pages/DepositAddressPage";
import ChatPage from "@/pages/ChatPage";

import Index from "./pages/Index";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/demo",
    element: <DemoMode />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/wallet",
    element: <WalletPage />,
  },
  {
    path: "/crypto-detail",
    element: <CryptoDetailPage />,
  },
  {
    path: "/funded-home",
    element: <FundedHomePage />,
  },
  {
    path: "/deposite",
    element: <DepositAddressPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
