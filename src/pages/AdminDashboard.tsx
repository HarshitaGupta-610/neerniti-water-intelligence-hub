import { useState, useRef } from "react";
import { Shield, Save, RotateCcw, Upload, Download, Clock, Activity, BarChart3, TrendingUp, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useWaterData, PlantData } from "@/contexts/WaterDataContext";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const regions = [
  { value: "rajasthan" as const, label: "Rajasthan", hi: "राजस्थान" },
  { value: "tamilnadu" as const, label: "Tamil Nadu", hi: "तमिलनाडु" },
  { value: "karnataka" as const, label: "Karnataka", hi: "कर्नाटक" },
];

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { user, activityLog, addActivity } = useAuth();
  const { dataset, updateDataset, resetDataset, totalConsumed, totalRecharged, totalGroundwater, replenishmentRatio, complianceStatus, groundwaterElimination, daysTo2027 } = useWaterData();

  const [plants, setPlants] = useState<PlantData[]>(() => JSON.parse(JSON.stringify(dataset.plants)));
  const [selectedPlant, setSelectedPlant] = useState(0);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const current = plants[selectedPlant];

  const updateField = (field: keyof PlantData, value: number | string) => {
    setPlants((prev) => {
      const next = [...prev];
      next[selectedPlant] = { ...next[selectedPlant], [field]: value };
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    updateDataset(plants, user?.email || "admin");
    addActivity("Updated water dataset");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetDataset();
    setPlants(JSON.parse(JSON.stringify(dataset.plants)));
    addActivity("Reset dataset to defaults");
  };

  const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addActivity(`Uploaded CSV: ${file.name}`);
    setSaved(false);
    // Dummy parse — just show success
    alert(t("CSV parsed successfully (demo). Data was not changed.", "CSV सफलतापूर्वक पार्स हुआ (डेमो)। डेटा नहीं बदला गया।"));
  };

  const handleDownloadReport = () => {
    const report = `NeerNiti Compliance Report\n========================\nGenerated: ${new Date().toLocaleString()}\n\nTotal Consumed: ${totalConsumed} KL\nTotal Recharged: ${totalRecharged} KL\nReplenishment Ratio: ${replenishmentRatio.toFixed(2)}x\nCompliance: ${complianceStatus.toUpperCase()}\nGroundwater Elimination: ${groundwaterElimination}%\nDays to 2027 Deadline: ${daysTo2027}\n\nPlant Details:\n${plants.map(p => `  ${p.name} (${p.region}): Consumed=${p.monthlyConsumption}KL, Recharged=${p.rechargeProjects}KL, Ratio=${(p.rechargeProjects/p.monthlyConsumption).toFixed(2)}x`).join("\n")}`;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "NeerNiti_Compliance_Report.txt"; a.click();
    URL.revokeObjectURL(url);
    addActivity("Downloaded compliance report");
  };

  const chartData = plants.map((p) => ({
    name: p.name,
    consumed: p.monthlyConsumption,
    recharged: p.rechargeProjects,
    groundwater: p.groundwaterExtraction,
    ratio: +(p.rechargeProjects / p.monthlyConsumption).toFixed(2),
  }));

  const statusColor = complianceStatus === "green" ? "text-accent" : complianceStatus === "yellow" ? "text-secondary" : "text-destructive";
  const statusBg = complianceStatus === "green" ? "bg-accent/10" : complianceStatus === "yellow" ? "bg-secondary/10" : "bg-destructive/10";

  const fields: { key: keyof PlantData; label: string; hi: string }[] = [
    { key: "monthlyConsumption", label: "Monthly Water Consumption (L)", hi: "मासिक जल उपभोग (L)" },
    { key: "groundwaterExtraction", label: "Groundwater Extraction (L)", hi: "भूजल निकासी (L)" },
    { key: "municipalUsage", label: "Municipal Water Usage (L)", hi: "नगरपालिका जल उपयोग (L)" },
    { key: "recycledUsage", label: "Recycled Water Usage (L)", hi: "पुनर्चक्रित जल उपयोग (L)" },
    { key: "rainwaterHarvested", label: "Rainwater Harvested (L)", hi: "वर्षा जल संचयन (L)" },
    { key: "rechargeProjects", label: "Recharge Projects Added (L)", hi: "रिचार्ज परियोजनाएं (L)" },
    { key: "csrBudget", label: "CSR Budget Allocation (₹L)", hi: "CSR बजट आवंटन (₹L)" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-6 h-6 text-secondary" />
              <h1 className="section-title mb-0">{t("Admin Dashboard", "व्यवस्थापक डैशबोर्ड")}</h1>
            </div>
            <p className="text-sm text-muted-foreground">{t("Manage water dataset and monitor compliance", "जल डेटासेट प्रबंधित करें और अनुपालन की निगरानी करें")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
              <Shield className="w-3 h-3" /> {t("Gov Verified", "सरकारी सत्यापित")}
            </span>
            <span className="text-xs text-muted-foreground">
              <Clock className="w-3 h-3 inline mr-1" />
              {t("Last updated:", "अंतिम अपडेट:")} {new Date(dataset.lastUpdated).toLocaleString()}
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("Ratio", "अनुपात")}</div>
            <div className={`text-2xl font-display font-bold ${statusColor}`}>{replenishmentRatio.toFixed(2)}x</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("Status", "स्थिति")}</div>
            <div className={`text-sm font-bold px-2 py-1 rounded-full ${statusBg} ${statusColor}`}>
              {complianceStatus === "green" ? t("Compliant", "अनुपालित") : complianceStatus === "yellow" ? t("Warning", "चेतावनी") : t("At Risk", "जोखिम में")}
            </div>
          </div>
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("GW Eliminated", "भूजल उन्मूलन")}</div>
            <div className="text-2xl font-display font-bold text-primary">{groundwaterElimination}%</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("2027 Deadline", "2027 समय सीमा")}</div>
            <div className="text-2xl font-display font-bold text-primary">{daysTo2027}d</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{t("1.5x Progress", "1.5x प्रगति")}</div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full bg-aqua-gradient transition-all" style={{ width: `${Math.min((replenishmentRatio / 1.5) * 100, 100)}%` }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{((replenishmentRatio / 1.5) * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Data Entry Form */}
          <div className="lg:col-span-1 glass-card">
            <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              {t("Data Entry", "डेटा प्रविष्टि")}
            </h3>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">{t("Select Plant", "संयंत्र चुनें")}</label>
              <select
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
              >
                {plants.map((p, i) => (
                  <option key={i} value={i}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">{t("Region", "क्षेत्र")}</label>
              <select
                value={current.region}
                onChange={(e) => updateField("region", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
              >
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>{t(r.label, r.hi)}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="text-xs text-muted-foreground mb-1 block">{t(f.label, f.hi)}</label>
                  <input
                    type="number"
                    value={current[f.key] as number}
                    onChange={(e) => updateField(f.key, Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-all">
                <Save className="w-4 h-4" /> {saved ? t("Saved ✓", "सहेजा ✓") : t("Save", "सहेजें")}
              </button>
              <button onClick={handleReset} className="flex items-center gap-1 px-3 py-2 rounded-lg border border-input text-primary text-sm hover:bg-muted transition-all">
                <RotateCcw className="w-4 h-4" /> {t("Reset", "रीसेट")}
              </button>
              <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1 px-3 py-2 rounded-lg border border-input text-primary text-sm hover:bg-muted transition-all">
                <Upload className="w-4 h-4" /> CSV
              </button>
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleCSV} />
            </div>
          </div>

          {/* Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card">
              <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                {t("Water Usage vs Recharge", "जल उपयोग बनाम रिचार्ज")}
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumed" fill="hsl(199, 84%, 52%)" name={t("Consumed", "उपभोग")} />
                  <Bar dataKey="recharged" fill="hsl(168, 100%, 39%)" name={t("Recharged", "रिचार्ज")} />
                  <Bar dataKey="groundwater" fill="hsl(0, 84%, 60%)" name={t("Groundwater", "भूजल")} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card">
              <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                {t("Replenishment Ratio by Plant", "संयंत्र-वार पुनःपूर्ति अनुपात")}
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} domain={[0, 2]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="ratio" stroke="hsl(168, 100%, 39%)" strokeWidth={3} name={t("Ratio", "अनुपात")} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Risk Alerts */}
            <div className="glass-card">
              <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                {t("Risk Alerts", "जोखिम अलर्ट")}
              </h3>
              <div className="space-y-2">
                {plants.map((p, i) => {
                  const r = p.rechargeProjects / p.monthlyConsumption;
                  if (r >= 1.5) return null;
                  return (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-destructive/5 text-sm">
                      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                      <span className="text-primary">{p.name}:</span>
                      <span className="text-muted-foreground">{t(`Ratio ${r.toFixed(2)}x — below 1.5x target`, `अनुपात ${r.toFixed(2)}x — 1.5x लक्ष्य से नीचे`)}</span>
                    </div>
                  );
                })}
                {plants.every(p => p.rechargeProjects / p.monthlyConsumption >= 1.5) && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/5 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span className="text-accent font-medium">{t("All plants are compliant!", "सभी संयंत्र अनुपालित हैं!")}</span>
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleDownloadReport} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all">
              <Download className="w-5 h-5" /> {t("Download Compliance Report", "अनुपालन रिपोर्ट डाउनलोड करें")}
            </button>
          </div>
        </div>

        {/* Activity Log */}
        <div className="glass-card">
          <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary" />
            {t("Activity Log (Audit Trail)", "गतिविधि लॉग (ऑडिट ट्रेल)")}
          </h3>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {activityLog.slice().reverse().slice(0, 20).map((log, i) => (
              <div key={i} className="flex items-center gap-3 text-xs p-2 rounded-lg hover:bg-muted/30">
                <span className="text-muted-foreground w-40 flex-shrink-0">{new Date(log.timestamp).toLocaleString()}</span>
                <span className="text-primary font-medium">{log.user}</span>
                <span className="text-muted-foreground">{log.action}</span>
              </div>
            ))}
            {activityLog.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">{t("No activity yet", "अभी तक कोई गतिविधि नहीं")}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
