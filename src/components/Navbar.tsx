import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Droplets, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t("Home", "होम") },
    { to: "/crisis", label: t("Crisis", "संकट") },
    { to: "/dashboard", label: t("Dashboard", "डैशबोर्ड") },
    { to: "/simulation", label: t("Simulation", "सिमुलेशन") },
    { to: "/game", label: t("Game", "गेम") },
    { to: "/community", label: t("Community", "समुदाय") },
    { to: "/esg", label: t("ESG", "ESG") },
  ];

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
            <span
              className={`font-display font-bold text-xl transition-colors ${
                scrolled || !isHeroPage ? "text-primary" : "text-primary-foreground"
              }`}
            >
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
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className={`ml-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1 ${
                scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)
              }`}
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {language === "en" ? "हिं" : "EN"}
            </button>
            <button
              onClick={toggleTheme}
              className={`ml-1 p-2 rounded-lg transition-all duration-300 ${
                scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)
              }`}
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {language === "en" ? "हिं" : "EN"}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                scrolled || !isHeroPage ? iconBtnClass(false) : iconBtnClass(true)
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled || !isHeroPage
                  ? "text-primary hover:bg-muted"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
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
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
