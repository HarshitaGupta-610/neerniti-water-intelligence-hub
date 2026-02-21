import { useState, useMemo } from "react";
import { FlaskConical, Droplets, Shield, Users, DollarSign, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const SimulationPage = () => {
  const { t } = useLanguage();
  const [municipal, setMunicipal] = useState(40);
  const [recycled, setRecycled] = useState(20);
  const [rainwater, setRainwater] = useState(15);
  const [rechargeBudget, setRechargeBudget] = useState(50);
  const [efficiency, setEfficiency] = useState(60);

  const groundwater = Math.max(0, 100 - municipal - recycled - rainwater);

  const results = useMemo(() => {
    const totalWater = 10000;
    const gwExtracted = totalWater * (groundwater / 100);
    const rechargeFromBudget = rechargeBudget * 200;
    const rechargeFromRain = rainwater * 80;
    const totalRecharge = rechargeFromBudget + rechargeFromRain;
    const ratio = gwExtracted > 0 ? totalRecharge / gwExtracted : 999;
    const clampedRatio = Math.min(ratio, 5);

    const compliance = ratio >= 1.5;
    const trustScore = Math.min(100, Math.round(
      (recycled * 0.3 + rainwater * 0.3 + rechargeBudget * 0.2 + efficiency * 0.2) * 1.2
    ));
    const riskLevel = groundwater > 60 ? "High" : groundwater > 30 ? "Medium" : "Low";
    const bottlePrice = 20 + (groundwater / 100) * 5 + (100 - efficiency) * 0.05;

    return { ratio: clampedRatio, compliance, trustScore, riskLevel, bottlePrice, groundwater };
  }, [municipal, recycled, rainwater, rechargeBudget, efficiency, groundwater]);

  const SliderControl = ({
    label, value, onChange, max = 100, icon: Icon, unit = "%", color = "bg-aqua-gradient"
  }: {
    label: string; value: number; onChange: (v: number) => void; max?: number;
    icon: React.ElementType; unit?: string; color?: string;
  }) => (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-primary">{label}</span>
        </div>
        <span className="text-sm font-semibold text-primary">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-md"
      />
    </div>
  );

  const riskText = results.riskLevel === "High" ? t("High", "उच्च") : results.riskLevel === "Medium" ? t("Medium", "मध्यम") : t("Low", "कम");

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="w-6 h-6 text-secondary" />
            <h1 className="section-title mb-0">{t("Simulation & Decision Lab", "सिमुलेशन और निर्णय प्रयोगशाला")}</h1>
          </div>
          <p className="section-subtitle">{t("Adjust parameters and see real-time impact on compliance, costs, and community trust.", "पैरामीटर समायोजित करें और अनुपालन, लागत और सामुदायिक विश्वास पर वास्तविक समय प्रभाव देखें।")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 glass-card">
            <h3 className="font-display font-semibold text-primary mb-6">{t("Adjust Parameters", "पैरामीटर समायोजित करें")}</h3>

            <SliderControl label={t("Municipal Water", "नगरपालिका जल")} value={municipal} onChange={(v) => setMunicipal(Math.min(v, 100 - recycled - rainwater))} icon={Droplets} />
            <SliderControl label={t("Recycled Water", "पुनर्चक्रित जल")} value={recycled} onChange={(v) => setRecycled(Math.min(v, 100 - municipal - rainwater))} icon={TrendingUp} />
            <SliderControl label={t("Rainwater Harvest", "वर्षा जल संचयन")} value={rainwater} onChange={(v) => setRainwater(Math.min(v, 100 - municipal - recycled))} icon={Droplets} />
            <SliderControl label={t("Recharge Budget", "रिचार्ज बजट")} value={rechargeBudget} onChange={setRechargeBudget} icon={DollarSign} unit="L" max={100} />
            <SliderControl label={t("Plant Efficiency", "संयंत्र दक्षता")} value={efficiency} onChange={setEfficiency} icon={FlaskConical} />

            <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm">
              <span className="text-muted-foreground">{t("Groundwater Dependence: ", "भूजल निर्भरता: ")}</span>
              <span className={`font-bold ${groundwater > 50 ? "text-destructive" : groundwater > 25 ? "text-secondary" : "text-accent"}`}>
                {groundwater}%
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card text-center">
                <Shield className={`w-8 h-8 mx-auto mb-2 ${results.compliance ? "text-accent" : "text-destructive"}`} />
                <div className="text-xs text-muted-foreground mb-1">{t("Replenishment Ratio", "पुनःपूर्ति अनुपात")}</div>
                <div className={`text-3xl font-display font-bold ${results.compliance ? "text-accent" : "text-destructive"}`}>
                  {results.ratio.toFixed(2)}x
                </div>
                <div className="text-xs mt-1">
                  {results.compliance ? (
                    <span className="text-accent flex items-center justify-center gap-1"><CheckCircle className="w-3 h-3" /> {t("Compliant", "अनुपालित")}</span>
                  ) : (
                    <span className="text-destructive flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3" /> {t("Non-compliant", "गैर-अनुपालित")}</span>
                  )}
                </div>
              </div>

              <div className="stat-card text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <div className="text-xs text-muted-foreground mb-1">{t("Community Trust", "सामुदायिक विश्वास")}</div>
                <div className="text-3xl font-display font-bold text-primary">{results.trustScore}</div>
                <div className="text-xs text-muted-foreground">/100</div>
              </div>

              <div className="stat-card text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <div className="text-xs text-muted-foreground mb-1">{t("Bottle Price Impact", "बोतल मूल्य प्रभाव")}</div>
                <div className="text-3xl font-display font-bold text-primary">₹{results.bottlePrice.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{t("per bottle", "प्रति बोतल")}</div>
              </div>

              <div className="stat-card text-center">
                <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${
                  results.riskLevel === "High" ? "text-destructive" : results.riskLevel === "Medium" ? "text-secondary" : "text-accent"
                }`} />
                <div className="text-xs text-muted-foreground mb-1">{t("Regulatory Risk", "विनियामक जोखिम")}</div>
                <div className={`text-3xl font-display font-bold ${
                  results.riskLevel === "High" ? "text-destructive" : results.riskLevel === "Medium" ? "text-secondary" : "text-accent"
                }`}>
                  {riskText}
                </div>
                <div className="text-xs text-muted-foreground">CGWA 2026</div>
              </div>
            </div>

            {/* Water Source Mix Visualization */}
            <div className="glass-card">
              <h3 className="font-display font-semibold text-primary mb-4">{t("Water Source Mix", "जल स्रोत मिश्रण")}</h3>
              <div className="flex rounded-full overflow-hidden h-8 mb-3">
                {municipal > 0 && <div className="bg-secondary transition-all duration-500" style={{ width: `${municipal}%` }} />}
                {recycled > 0 && <div className="bg-accent transition-all duration-500" style={{ width: `${recycled}%` }} />}
                {rainwater > 0 && <div className="bg-ocean-teal transition-all duration-500" style={{ width: `${rainwater}%` }} />}
                {groundwater > 0 && <div className="bg-destructive/70 transition-all duration-500" style={{ width: `${groundwater}%` }} />}
              </div>
              <div className="flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-secondary" /> {t("Municipal", "नगरपालिका")} {municipal}%</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent" /> {t("Recycled", "पुनर्चक्रित")} {recycled}%</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-ocean-teal" /> {t("Rainwater", "वर्षा जल")} {rainwater}%</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-destructive/70" /> {t("Groundwater", "भूजल")} {groundwater}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationPage;
