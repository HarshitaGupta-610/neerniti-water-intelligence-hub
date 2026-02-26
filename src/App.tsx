import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { WaterDataProvider } from "@/contexts/WaterDataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import CrisisPage from "./pages/CrisisPage";
import DashboardPage from "./pages/DashboardPage";
import SimulationPage from "./pages/SimulationPage";
import GamePage from "./pages/GamePage";
import CommunityPage from "./pages/CommunityPage";
import ESGPage from "./pages/ESGPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/access-denied" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/crisis" element={<CrisisPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/simulation" element={<SimulationPage />} />
    <Route path="/game" element={<GamePage />} />
    <Route path="/community" element={<CommunityPage />} />
    <Route path="/esg" element={<ESGPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/access-denied" element={<AccessDenied />} />
    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="neerniti-theme">
      <LanguageProvider>
        <AuthProvider>
          <WaterDataProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Navbar />
                <AppRoutes />
                <Footer />
              </BrowserRouter>
            </TooltipProvider>
          </WaterDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
