import { AlertTriangle, Droplets, Factory, MapPin, TrendingDown, Wheat, Building2, CloudRain } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";

const causes = [
  { icon: Factory, title: "Industrial Overuse", desc: "Factories and beverage plants extracting millions of litres daily without adequate replenishment." },
  { icon: Wheat, title: "Agricultural Dependence", desc: "70% of India's irrigation relies on groundwater, depleting aquifers faster than nature can recharge." },
  { icon: Building2, title: "Urban Expansion", desc: "Rapid urbanization seals natural recharge zones with concrete, preventing rainwater infiltration." },
  { icon: CloudRain, title: "Climate Variability", desc: "Erratic monsoons and rising temperatures disrupt the natural groundwater recharge cycle." },
];

const regions = [
  { name: "Rajasthan (Alwar)", borewellFailure: "62%", stress: "Critical", detail: "Ancient stepwells running dry, communities walk 5+ km for water." },
  { name: "Tamil Nadu (Chennai)", borewellFailure: "48%", stress: "Severe", detail: "Day Zero crisis in 2019; reservoirs hit near-zero levels." },
  { name: "Karnataka (Bengaluru Rural)", borewellFailure: "55%", stress: "Critical", detail: "Borewells drilled to 1500ft+ with declining yield rates." },
];

const regulations = [
  { year: "2026", title: "New Regulation", desc: "500% increase in groundwater extraction charges for commercial users." },
  { year: "2027", title: "Extraction Deadline", desc: "All high-consumption units must demonstrate sustainable extraction plans." },
  { year: "Mandatory", title: "1.5x Replenishment", desc: "Companies must recharge 1.5x the volume of groundwater they extract." },
];

const CrisisPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-20 relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-destructive/30 bg-destructive/10 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive-foreground">National Emergency</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 max-w-3xl">
            Why Is Groundwater Scarcity a National Emergency?
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            India's groundwater reserves are depleting at an alarming rate. Over-extraction threatens
            agriculture, industry, and millions of lives.
          </p>
        </div>
        <WaveDivider />
      </section>

      {/* Groundwater Usage */}
      <section className="section-container">
        <h2 className="section-title mb-8">Groundwater: The Hidden Lifeline</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Droplets, stat: "70%", text: "of plant water sourced from groundwater" },
            { icon: TrendingDown, stat: "500–1000ft", text: "water tables falling in stressed zones" },
            { icon: AlertTriangle, stat: "Millions", text: "of borewells running dry every year" },
          ].map((item, i) => (
            <div key={i} className="stat-card text-center">
              <item.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-primary mb-1">{item.stat}</div>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Causes */}
      <section className="bg-muted/50">
        <div className="section-container">
          <h2 className="section-title mb-8">Root Causes of the Crisis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {causes.map((c, i) => (
              <div key={i} className="stat-card flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-ocean-gradient flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary mb-1">{c.title}</h3>
                  <p className="text-muted-foreground text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affected Regions */}
      <section className="section-container">
        <h2 className="section-title mb-2">Affected Regions</h2>
        <p className="section-subtitle mb-8">Interactive map data from India's most water-stressed zones.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {regions.map((r, i) => (
            <div key={i} className="stat-card border-l-4 border-l-destructive">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-destructive" />
                <h3 className="font-display font-semibold text-primary">{r.name}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borewell Failure</span>
                  <span className="font-semibold text-destructive">{r.borewellFailure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Water Stress</span>
                  <span className="font-semibold text-destructive">{r.stress}</span>
                </div>
                <p className="text-muted-foreground pt-2 border-t border-border">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beverage Plant Risk */}
      <section className="bg-ocean-gradient text-primary-foreground">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Why Beverage Plants Face Shutdown Risk
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {regulations.map((r, i) => (
              <div key={i} className="glass-card-dark">
                <div className="text-ocean-aqua font-display font-bold text-lg mb-2">{r.year}</div>
                <h3 className="text-primary-foreground font-semibold mb-2">{r.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrisisPage;
