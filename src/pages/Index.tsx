import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Gamepad2, Globe, Shield, Droplets, TrendingDown, FlaskConical } from "lucide-react";
import WaterParticles from "@/components/WaterParticles";
import WaveDivider from "@/components/WaveDivider";
import { useLanguage } from "@/components/LanguageProvider";

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "70%", label: t("Plant water from groundwater", "संयंत्र का पानी भूजल से"), icon: Droplets },
    { value: "500ft+", label: t("Water table drop in stressed zones", "तनावग्रस्त क्षेत्रों में जल स्तर गिरावट"), icon: TrendingDown },
    { value: "1.5x", label: t("Replenishment target by 2027", "2027 तक पुनःपूर्ति लक्ष्य"), icon: Shield },
    { value: "500%", label: t("Groundwater charge increase", "भूजल शुल्क वृद्धि"), icon: BarChart3 },
  ];

  const features = [
    {
      icon: BarChart3,
      title: t("Real-Time Dashboard", "रियल-टाइम डैशबोर्ड"),
      desc: t("Track consumption, recharge, and compliance metrics at a glance.", "उपभोग, रिचार्ज और अनुपालन मेट्रिक्स एक नज़र में देखें।"),
      to: "/dashboard",
    },
    {
      icon: FlaskConical,
      title: t("Simulation Lab", "सिमुलेशन लैब"),
      desc: t("Model scenarios and find the optimal path to water-positive operations.", "परिदृश्यों का मॉडल बनाएं और जल-सकारात्मक संचालन का इष्टतम मार्ग खोजें।"),
      to: "/simulation",
    },
    {
      icon: Gamepad2,
      title: t("Gamified Learning", "गेमिफाइड लर्निंग"),
      desc: t("Learn water sustainability trade-offs through an interactive game.", "एक इंटरैक्टिव गेम के माध्यम से जल स्थिरता के समझौतों को सीखें।"),
      to: "/game",
    },
    {
      icon: Globe,
      title: t("Community Impact", "सामुदायिक प्रभाव"),
      desc: t("See real recharge projects — check dams, ponds, and lake revivals.", "वास्तविक रिचार्ज परियोजनाएं देखें — चेक डैम, तालाब और झील पुनरुद्धार।"),
      to: "/community",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
        <WaterParticles />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in">
            <Droplets className="w-4 h-4 text-ocean-aqua" />
            <span className="hero-text-muted text-sm font-medium">
              {t("Water Intelligence Platform", "जल बुद्धिमत्ता मंच")}
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-display font-bold hero-text mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Neer
            <span className="gradient-text">Niti</span>
          </h1>

          <p
            className="text-xl md:text-2xl hero-text-muted font-light mb-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {t("Beyond Usage. Toward Regeneration.", "उपयोग से परे। पुनर्जनन की ओर।")}
          </p>

          <p
            className="hero-text-dim max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {t(
              "A comprehensive water governance platform helping businesses achieve 1.5x replenishment while maintaining profitability and community trust.",
              "एक व्यापक जल शासन मंच जो व्यवसायों को लाभप्रदता और सामुदायिक विश्वास बनाए रखते हुए 1.5x पुनःपूर्ति प्राप्त करने में मदद करता है।"
            )}
          </p>

          <div
            className="flex flex-wrap justify-center gap-3 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/crisis"
              className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all glow-aqua"
            >
              {t("Explore Crisis", "संकट जानें")}
            </Link>
            <Link
              to="/simulation"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hero-text font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              {t("Try Simulation", "सिमुलेशन आज़माएं")}
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hero-text font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              {t("View Dashboard", "डैशबोर्ड देखें")}
            </Link>
            <Link
              to="/game"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hero-text font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              {t("Play the Game", "गेम खेलें")}
            </Link>
          </div>
        </div>

        <WaveDivider />
      </section>

      {/* Stats */}
      <section className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card text-center animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <s.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title">{t("Platform Capabilities", "मंच क्षमताएं")}</h2>
            <p className="section-subtitle mx-auto">
              {t(
                "Everything you need to understand, simulate, and manage water sustainability.",
                "जल स्थिरता को समझने, अनुकरण करने और प्रबंधित करने के लिए आपको जो कुछ भी चाहिए।"
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <Link
                key={i}
                to={f.to}
                className="stat-card group flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-aqua-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-primary text-lg mb-1 flex items-center gap-2">
                    {f.title}
                    <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-section bg-ocean-gradient relative overflow-hidden">
        <WaterParticles />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 hero-text">
            {t("Ready to become water-positive?", "जल-सकारात्मक बनने के लिए तैयार हैं?")}
          </h2>
          <p className="hero-text-muted max-w-xl mx-auto mb-8">
            {t(
              "Explore the crisis, simulate solutions, and track your path to 1.5x replenishment.",
              "संकट का अन्वेषण करें, समाधान अनुकरण करें, और 1.5x पुनःपूर्ति के अपने मार्ग को ट्रैक करें।"
            )}
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all glow-aqua"
          >
            {t("Get Started", "शुरू करें")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
