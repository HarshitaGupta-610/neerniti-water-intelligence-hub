import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, Droplets, ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/components/LanguageProvider";

const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"select" | "admin" | "public" | "otp">("select");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleAdminLogin = () => {
    if (!email.endsWith("@nic.in")) {
      setError(t("Admin email must end with @nic.in", "व्यवस्थापक ईमेल @nic.in से समाप्त होना चाहिए"));
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setMode("otp");
    setError("");
  };

  const handleOtpVerify = () => {
    if (otp === generatedOtp) {
      login(email, "admin");
      navigate("/admin");
    } else {
      setError(t("Invalid OTP. Try again.", "अमान्य OTP. पुनः प्रयास करें।"));
    }
  };

  const handlePublicLogin = () => {
    if (!email || !email.includes("@")) {
      setError(t("Please enter a valid email", "कृपया एक मान्य ईमेल दर्ज करें"));
      return;
    }
    login(email, "public");
    navigate("/dashboard");
  };

  const handleGuestAccess = () => {
    login("guest@neerniti.in", "guest");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-aqua-gradient flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary">{t("Welcome to NeerNiti", "NeerNiti में आपका स्वागत है")}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t("Water Governance Intelligence Portal", "जल शासन बुद्धिमत्ता पोर्टल")}</p>
        </div>

        {mode === "select" && (
          <div className="space-y-4">
            <button onClick={() => setMode("admin")} className="w-full stat-card flex items-center gap-4 text-left group cursor-pointer hover:border-secondary/30">
              <div className="w-12 h-12 rounded-xl bg-ocean-gradient flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-primary group-hover:text-secondary transition-colors">{t("Government Admin", "सरकारी व्यवस्थापक")}</div>
                <div className="text-xs text-muted-foreground">{t("Login with @nic.in email + OTP", "@nic.in ईमेल + OTP से लॉगिन")}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary" />
            </button>

            <button onClick={() => setMode("public")} className="w-full stat-card flex items-center gap-4 text-left group cursor-pointer hover:border-secondary/30">
              <div className="w-12 h-12 rounded-xl bg-aqua-gradient flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-primary group-hover:text-secondary transition-colors">{t("Public User", "सार्वजनिक उपयोगकर्ता")}</div>
                <div className="text-xs text-muted-foreground">{t("Login with any email", "किसी भी ईमेल से लॉगिन")}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary" />
            </button>

            <button onClick={handleGuestAccess} className="w-full text-center text-sm text-muted-foreground hover:text-secondary transition-colors py-2">
              {t("Continue as Guest →", "अतिथि के रूप में जारी रखें →")}
            </button>
          </div>
        )}

        {mode === "admin" && (
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-secondary" />
              <h2 className="font-display font-semibold text-primary">{t("Government Admin Login", "सरकारी व्यवस्थापक लॉगिन")}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t("Email (@nic.in)", "ईमेल (@nic.in)")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="admin@nic.in"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <button onClick={handleAdminLogin} className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                {t("Send OTP", "OTP भेजें")}
              </button>
              <button onClick={() => { setMode("select"); setError(""); }} className="w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("← Back", "← वापस")}
              </button>
            </div>
          </div>
        )}

        {mode === "otp" && (
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <KeyRound className="w-5 h-5 text-secondary" />
              <h2 className="font-display font-semibold text-primary">{t("OTP Verification", "OTP सत्यापन")}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t(`OTP sent to ${email}`, `OTP ${email} पर भेजा गया`)}
            </p>
            <div className="relative mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-accent font-semibold">{t("Demo OTP:", "डेमो OTP:")}</span>
                <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-0.5 rounded">{showOtp ? generatedOtp : "••••••"}</span>
                <button onClick={() => setShowOtp(!showOtp)} className="text-muted-foreground hover:text-primary">
                  {showOtp ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(""); }}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm text-center tracking-[0.5em] font-mono focus:ring-2 focus:ring-ring focus:outline-none"
              />
              {error && <p className="text-destructive text-sm">{error}</p>}
              <button onClick={handleOtpVerify} className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                {t("Verify & Login", "सत्यापित करें और लॉगिन करें")}
              </button>
              <button onClick={() => { setMode("admin"); setOtp(""); setError(""); }} className="w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("← Back", "← वापस")}
              </button>
            </div>
          </div>
        )}

        {mode === "public" && (
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-secondary" />
              <h2 className="font-display font-semibold text-primary">{t("Public User Login", "सार्वजनिक उपयोगकर्ता लॉगिन")}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t("Email", "ईमेल")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <button onClick={handlePublicLogin} className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                {t("Login", "लॉगिन")}
              </button>
              <button onClick={handleGuestAccess} className="w-full text-sm text-muted-foreground hover:text-secondary transition-colors">
                {t("Continue as Guest →", "अतिथि के रूप में जारी रखें →")}
              </button>
              <button onClick={() => { setMode("select"); setError(""); }} className="w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("← Back", "← वापस")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
