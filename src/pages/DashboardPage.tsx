import { useState } from "react";
import { Droplets, BarChart3, Target, TrendingUp, Factory, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";

const plants = [
  { name: "Plant Alpha", consumed: 12500, recharged: 15000, cost: 2.4 },
  { name: "Plant Beta", consumed: 8700, recharged: 11200, cost: 1.8 },
  { name: "Plant Gamma", consumed: 15300, recharged: 18500, cost: 3.1 },
  { name: "Plant Delta", consumed: 6200, recharged: 7800, cost: 1.2 },
];

const DashboardPage = () => {
  const [selectedPlant, setSelectedPlant] = useState<number | null>(null);

  const totalConsumed = plants.reduce((a, p) => a + p.consumed, 0);
  const totalRecharged = plants.reduce((a, p) => a + p.recharged, 0);
  const ratio = totalRecharged / totalConsumed;
  const isCompliant = ratio >= 1.5;

  const pricePerBottle = 22 + (1.5 - Math.min(ratio, 1.5)) * 8;

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <h1 className="section-title">Water Intelligence Dashboard</h1>
          <p className="section-subtitle">Real-time monitoring of water consumption, recharge, and compliance.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <Droplets className="w-8 h-8 text-secondary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Water Consumed</div>
            <div className="text-2xl font-display font-bold text-primary">{(totalConsumed / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">kilolitres</div>
          </div>
          <div className="stat-card">
            <TrendingUp className="w-8 h-8 text-accent mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Water Recharged</div>
            <div className="text-2xl font-display font-bold text-primary">{(totalRecharged / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">kilolitres</div>
          </div>
          <div className="stat-card">
            <Target className="w-8 h-8 text-ocean-teal mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Replenishment Ratio</div>
            <div className={`text-2xl font-display font-bold ${isCompliant ? "text-accent" : "text-destructive"}`}>
              {ratio.toFixed(2)}x
            </div>
            <div className="text-xs text-muted-foreground">target: 1.5x</div>
          </div>
          <div className="stat-card">
            {isCompliant ? (
              <CheckCircle className="w-8 h-8 text-accent mb-2" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-destructive mb-2" />
            )}
            <div className="text-xs text-muted-foreground mb-1">Compliance</div>
            <div className={`text-2xl font-display font-bold ${isCompliant ? "text-accent" : "text-destructive"}`}>
              {isCompliant ? "Compliant" : "At Risk"}
            </div>
            <div className="text-xs text-muted-foreground">CGWA 2026</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-primary">1.5x Target Progress</span>
            <span className="text-sm text-muted-foreground">{((ratio / 1.5) * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-aqua-gradient transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((ratio / 1.5) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0x</span>
            <span>0.75x</span>
            <span className="text-accent font-semibold">1.5x Target</span>
          </div>
        </div>

        {/* Cost Impact */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-secondary" />
              <h3 className="font-display font-semibold text-primary">Cost Impact Calculator</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Current extraction cost</span>
                <span className="font-semibold text-primary">₹{(totalConsumed * 0.12).toFixed(0)}L/year</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Post-2026 projected cost</span>
                <span className="font-semibold text-destructive">₹{(totalConsumed * 0.72).toFixed(0)}L/year</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Est. price-per-bottle impact</span>
                <span className="font-semibold text-primary">₹{pricePerBottle.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-secondary" />
              <h3 className="font-display font-semibold text-primary">Recharge Efficiency</h3>
            </div>
            <div className="space-y-3">
              {["Rainwater Harvesting", "Check Dams", "Farm Ponds", "Borewell Recharge"].map((method, i) => {
                const efficiency = [78, 65, 82, 45][i];
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{method}</span>
                      <span className="font-medium text-primary">{efficiency}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-aqua-gradient" style={{ width: `${efficiency}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Plant Breakdown */}
        <div className="glass-card">
          <div className="flex items-center gap-2 mb-4">
            <Factory className="w-6 h-6 text-secondary" />
            <h3 className="font-display font-semibold text-primary">Plant-wise Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Plant</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Consumed (KL)</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Recharged (KL)</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Ratio</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((p, i) => {
                  const r = p.recharged / p.consumed;
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-medium text-primary">{p.name}</td>
                      <td className="py-3 px-2 text-right text-muted-foreground">{p.consumed.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-muted-foreground">{p.recharged.toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-semibold ${r >= 1.5 ? "text-accent" : "text-destructive"}`}>
                        {r.toFixed(2)}x
                      </td>
                      <td className="py-3 px-2 text-right">
                        {r >= 1.5 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            <CheckCircle className="w-3 h-3" /> Compliant
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                            <AlertTriangle className="w-3 h-3" /> At Risk
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
