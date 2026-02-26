import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Droplets, Sun, Moon, Languages, LogIn, LogOut, Shield } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { to: "/", label: t("Home", "होम") },
    { to: "/crisis", label: t("Crisis", "संकट") },
    { to: "/dashboard", label: t("Dashboard", "डैशबोर्ड") },
    { to: "/simulation", label: t("Simulation", "सिमुलेशन") },
    { to: "/game", label: t("Game", "गेम") },
    { to: "/community", label: t("Community", "समुदाय") },
    { to: "/esg", label: t("ESG", "ESG") },
  ];

  if (user?.role === "admin") {
    navLinks.push({ to: "/admin", label: t("Admin", "व्यवस्थापक") });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHeroPage = location.pathname === "/";

  const iconBtnClass = (isHero: boolean) =>
    isHero
      ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
      : "text-muted-foreground hover:text-primary hover:bg-muted";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHeroPage
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-aqua-gradient flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={`font-display font-bold text-xl transition-colors ${scrolled || !isHeroPage ? "text-primary" : "text-primary-foreground"}`}>
              NeerNiti
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-secondary/10 text-secondary"
                    : scrolled || !isHeroPage
                    ? "text-muted-foreground hover:text-primary hover:bg-muted"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.to === "/admin" && <Shield className="w-3 h-3 inline mr-1" />}
                {link.label}
              </Link>
            ))}

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1 ml-1">
                {user?.role === "admin" && (
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Gov
                  </span>
                )}
                <button onClick={handleLogout} className={`p-2 rounded-lg transition-all duration-300 ${scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)}`} aria-label="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className={`ml-1 p-2 rounded-lg transition-all duration-300 ${scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)}`}>
                <LogIn className="w-4 h-4" />
              </Link>
            )}

            <button onClick={toggleLanguage} className={`ml-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1 ${scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)}`} aria-label="Toggle language">
              <Languages className="w-4 h-4" />
              {language === "en" ? "हिं" : "EN"}
            </button>
            <button onClick={toggleTheme} className={`ml-1 p-2 rounded-lg transition-all duration-300 ${scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)}`} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            {isAuthenticated && user?.role === "admin" && (
              <span className="px-1.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold">Gov</span>
            )}
            <button onClick={toggleLanguage} className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)}`} aria-label="Toggle language">
              <Languages className="w-4 h-4" />
              {language === "en" ? "हिं" : "EN"}
            </button>
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)}`} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-lg transition-colors ${scrolled || !isHeroPage ? "text-primary hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10"}`}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-secondary/10 text-secondary"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {link.to === "/admin" && <Shield className="w-3 h-3 inline mr-1" />}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-4 h-4" /> {t("Logout", "लॉगआउट")} ({user?.email})
                </button>
              ) : (
                <Link to="/login" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors">
                  <LogIn className="w-4 h-4 inline mr-2" />{t("Login", "लॉगिन")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
