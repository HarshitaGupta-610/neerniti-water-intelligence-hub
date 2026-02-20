import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Gamepad2, Globe, Shield, Droplets, TrendingDown, FlaskConical } from "lucide-react";
import WaterParticles from "@/components/WaterParticles";
import WaveDivider from "@/components/WaveDivider";

const stats = [
  { value: "70%", label: "Plant water from groundwater", icon: Droplets },
  { value: "500ft+", label: "Water table drop in stressed zones", icon: TrendingDown },
  { value: "1.5x", label: "Replenishment target by 2027", icon: Shield },
  { value: "500%", label: "Groundwater charge increase", icon: BarChart3 },
];

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    desc: "Track consumption, recharge, and compliance metrics at a glance.",
    to: "/dashboard",
  },
  {
    icon: FlaskConical,
    title: "Simulation Lab",
    desc: "Model scenarios and find the optimal path to water-positive operations.",
    to: "/simulation",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    desc: "Learn water sustainability trade-offs through an interactive game.",
    to: "/game",
  },
  {
    icon: Globe,
    title: "Community Impact",
    desc: "See real recharge projects — check dams, ponds, and lake revivals.",
    to: "/community",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
        <WaterParticles />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in">
            <Droplets className="w-4 h-4 text-ocean-aqua" />
            <span className="hero-text-muted text-sm font-medium">
              Water Intelligence Platform
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
            Beyond Usage. Toward Regeneration.
          </p>

          <p
            className="hero-text-dim max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            A comprehensive water governance platform helping businesses achieve 1.5x
            replenishment while maintaining profitability and community trust.
          </p>

          <div
            className="flex flex-wrap justify-center gap-3 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/crisis"
              className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all glow-aqua"
            >
              Explore Crisis
            </Link>
            <Link
              to="/simulation"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hero-text font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Try Simulation
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hero-text font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              View Dashboard
            </Link>
            <Link
              to="/game"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hero-text font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Play the Game
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
            <h2 className="section-title">Platform Capabilities</h2>
            <p className="section-subtitle mx-auto">
              Everything you need to understand, simulate, and manage water sustainability.
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
            Ready to become water-positive?
          </h2>
          <p className="hero-text-muted max-w-xl mx-auto mb-8">
            Explore the crisis, simulate solutions, and track your path to 1.5x replenishment.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all glow-aqua"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
