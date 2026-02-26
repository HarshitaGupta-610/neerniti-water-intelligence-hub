import { useState } from "react";
import { Droplets, BarChart3, Target, TrendingUp, Factory, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useWaterData } from "@/contexts/WaterDataContext";

const DashboardPage = () => {
  const { t } = useLanguage();
  const { dataset, totalConsumed, totalRecharged, replenishmentRatio, complianceStatus, groundwaterElimination, daysTo2027 } = useWaterData();

  const plants = dataset.plants;
  const ratio = replenishmentRatio;
  const isCompliant = ratio >= 1.5;
  const pricePerBottle = 22 + (1.5 - Math.min(ratio, 1.5)) * 8;

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <h1 className="section-title">{t("Water Intelligence Dashboard", "जल बुद्धिमत्ता डैशबोर्ड")}</h1>
          <p className="section-subtitle">{t("Real-time monitoring of water consumption, recharge, and compliance.", "जल उपभोग, रिचार्ज और अनुपालन की वास्तविक समय निगरानी।")}</p>
          <p className="text-xs text-muted-foreground mt-2">{t("Last updated:", "अंतिम अपडेट:")} {new Date(dataset.lastUpdated).toLocaleString()} | {t("by", "द्वारा")} {dataset.updatedBy}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <Droplets className="w-8 h-8 text-secondary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">{t("Water Consumed", "जल उपभोग")}</div>
            <div className="text-2xl font-display font-bold text-primary">{(totalConsumed / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">{t("kilolitres", "किलोलीटर")}</div>
          </div>
          <div className="stat-card">
            <TrendingUp className="w-8 h-8 text-accent mb-2" />
            <div className="text-xs text-muted-foreground mb-1">{t("Water Recharged", "जल पुनःपूर्ति")}</div>
            <div className="text-2xl font-display font-bold text-primary">{(totalRecharged / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">{t("kilolitres", "किलोलीटर")}</div>
          </div>
          <div className="stat-card">
            <Target className="w-8 h-8 text-ocean-teal mb-2" />
            <div className="text-xs text-muted-foreground mb-1">{t("Replenishment Ratio", "पुनःपूर्ति अनुपात")}</div>
            <div className={`text-2xl font-display font-bold ${isCompliant ? "text-accent" : "text-destructive"}`}>
              {ratio.toFixed(2)}x
            </div>
            <div className="text-xs text-muted-foreground">{t("target: 1.5x", "लक्ष्य: 1.5x")}</div>
          </div>
          <div className="stat-card">
            {isCompliant ? (
              <CheckCircle className="w-8 h-8 text-accent mb-2" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-destructive mb-2" />
            )}
            <div className="text-xs text-muted-foreground mb-1">{t("Compliance", "अनुपालन")}</div>
            <div className={`text-2xl font-display font-bold ${isCompliant ? "text-accent" : "text-destructive"}`}>
              {isCompliant ? t("Compliant", "अनुपालित") : t("At Risk", "जोखिम में")}
            </div>
            <div className="text-xs text-muted-foreground">CGWA 2026</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-primary">{t("1.5x Target Progress", "1.5x लक्ष्य प्रगति")}</span>
            <span className="text-sm text-muted-foreground">{((ratio / 1.5) * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-aqua-gradient transition-all duration-1000 ease-out" style={{ width: `${Math.min((ratio / 1.5) * 100, 100)}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0x</span>
            <span>0.75x</span>
            <span className="text-accent font-semibold">{t("1.5x Target", "1.5x लक्ष्य")}</span>
          </div>
        </div>

        {/* Additional metrics */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("GW Elimination Progress", "भूजल उन्मूलन प्रगति")}</div>
            <div className="text-2xl font-display font-bold text-primary">{groundwaterElimination}%</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("2027 Deadline", "2027 समय सीमा")}</div>
            <div className="text-2xl font-display font-bold text-primary">{daysTo2027} {t("days", "दिन")}</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("Est. Bottle Price", "अनुमानित बोतल मूल्य")}</div>
            <div className="text-2xl font-display font-bold text-primary">₹{pricePerBottle.toFixed(2)}</div>
          </div>
        </div>

        {/* Cost Impact */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-secondary" />
              <h3 className="font-display font-semibold text-primary">{t("Cost Impact Calculator", "लागत प्रभाव कैलकुलेटर")}</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t("Current extraction cost", "वर्तमान निकासी लागत")}</span>
                <span className="font-semibold text-primary">₹{(totalConsumed * 0.12).toFixed(0)}L/{t("year", "वर्ष")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t("Post-2026 projected cost", "2026 के बाद अनुमानित लागत")}</span>
                <span className="font-semibold text-destructive">₹{(totalConsumed * 0.72).toFixed(0)}L/{t("year", "वर्ष")}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">{t("Est. price-per-bottle impact", "अनुमानित प्रति बोतल मूल्य प्रभाव")}</span>
                <span className="font-semibold text-primary">₹{pricePerBottle.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-secondary" />
              <h3 className="font-display font-semibold text-primary">{t("Recharge Efficiency", "रिचार्ज दक्षता")}</h3>
            </div>
            <div className="space-y-3">
              {[
                { en: "Rainwater Harvesting", hi: "वर्षा जल संचयन" },
                { en: "Check Dams", hi: "चेक डैम" },
                { en: "Farm Ponds", hi: "कृषि तालाब" },
                { en: "Borewell Recharge", hi: "बोरवेल रिचार्ज" },
              ].map((method, i) => {
                const efficiency = [78, 65, 82, 45][i];
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{t(method.en, method.hi)}</span>
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
            <h3 className="font-display font-semibold text-primary">{t("Plant-wise Breakdown", "संयंत्र-वार विवरण")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">{t("Plant", "संयंत्र")}</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">{t("Region", "क्षेत्र")}</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">{t("Consumed (KL)", "उपभोग (KL)")}</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">{t("Recharged (KL)", "रिचार्ज (KL)")}</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">{t("Ratio", "अनुपात")}</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">{t("Status", "स्थिति")}</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((p, i) => {
                  const r = p.rechargeProjects / p.monthlyConsumption;
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-medium text-primary">{p.name}</td>
                      <td className="py-3 px-2 text-right text-muted-foreground capitalize">{p.region}</td>
                      <td className="py-3 px-2 text-right text-muted-foreground">{p.monthlyConsumption.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-muted-foreground">{p.rechargeProjects.toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-semibold ${r >= 1.5 ? "text-accent" : "text-destructive"}`}>
                        {r.toFixed(2)}x
                      </td>
                      <td className="py-3 px-2 text-right">
                        {r >= 1.5 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            <CheckCircle className="w-3 h-3" /> {t("Compliant", "अनुपालित")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                            <AlertTriangle className="w-3 h-3" /> {t("At Risk", "जोखिम में")}
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
