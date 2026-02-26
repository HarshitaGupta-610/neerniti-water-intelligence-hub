import { MapPin, Droplets, Users, ArrowUpRight, TreePine } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useWaterData } from "@/contexts/WaterDataContext";

const CommunityPage = () => {
  const { t } = useLanguage();
  const { dataset, totalRecharged } = useWaterData();

  // Build projects from live data
  const regionProjects = [
    {
      name: t("Check Dam – Alwar, Rajasthan", "चेक डैम – अलवर, राजस्थान"),
      type: t("Check Dam", "चेक डैम"),
      litres: `${(dataset.plants.filter(p => p.region === "rajasthan").reduce((a, p) => a + p.rechargeProjects, 0) / 1000).toFixed(1)}K`,
      villages: 12,
      participation: t("340 families", "340 परिवार"),
      before: t("Dry borewells, 5km water walk", "सूखे बोरवेल, 5 किमी पानी की पैदल यात्रा"),
      after: t("Water table rose 15ft, year-round supply", "जल स्तर 15 फीट बढ़ा, साल भर आपूर्ति"),
      icon: "🏗️",
    },
    {
      name: t("Farm Pond – Anantapur, AP", "कृषि तालाब – अनंतपुर, आंध्र प्रदेश"),
      type: t("Farm Pond", "कृषि तालाब"),
      litres: "800K", villages: 5,
      participation: t("120 farmers", "120 किसान"),
      before: t("Failed monsoon crops, migration", "मानसून फसल विफलता, पलायन"),
      after: t("2 crop cycles restored, 60% less migration", "2 फसल चक्र बहाल, 60% कम पलायन"),
      icon: "🌊",
    },
    {
      name: t("Lake Revival – Bengaluru Rural", "झील पुनरुद्धार – बेंगलुरु ग्रामीण"),
      type: t("Lake Revival", "झील पुनरुद्धार"),
      litres: `${(dataset.plants.filter(p => p.region === "karnataka").reduce((a, p) => a + p.rechargeProjects, 0) / 1000).toFixed(1)}K`,
      villages: 18,
      participation: t("1200+ volunteers", "1200+ स्वयंसेवक"),
      before: t("Sewage-filled, dead ecosystem", "सीवेज से भरा, मृत पारिस्थितिकी तंत्र"),
      after: t("Migratory birds returned, groundwater +22ft", "प्रवासी पक्षी लौटे, भूजल +22 फीट"),
      icon: "🦆",
    },
    {
      name: t("Borewell Recharge – Chennai", "बोरवेल रिचार्ज – चेन्नई"),
      type: t("Recharge Shaft", "रिचार्ज शाफ्ट"),
      litres: `${(dataset.plants.filter(p => p.region === "tamilnadu").reduce((a, p) => a + p.rechargeProjects, 0) / 1000).toFixed(1)}K`,
      villages: 8,
      participation: t("200 homes", "200 घर"),
      before: t("Tanker dependency, ₹5000/month per family", "टैंकर निर्भरता, ₹5000/माह प्रति परिवार"),
      after: t("Self-sufficient, savings of ₹4000/month", "आत्मनिर्भर, ₹4000/माह की बचत"),
      icon: "💧",
    },
  ];

  const totals = {
    litres: `${(totalRecharged / 1000).toFixed(1)}K`,
    villages: 43,
    families: "1860+",
    projects: 4,
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <h1 className="section-title">{t("Community Impact", "सामुदायिक प्रभाव")}</h1>
          <p className="section-subtitle">
            {t(
              "Real recharge projects making a difference — connected to live admin dataset.",
              "वास्तविक रिचार्ज परियोजनाएं — लाइव व्यवस्थापक डेटासेट से जुड़ी।"
            )}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: t("Litres Recharged", "लीटर रिचार्ज"), value: totals.litres, icon: Droplets },
            { label: t("Villages Impacted", "प्रभावित गांव"), value: totals.villages, icon: MapPin },
            { label: t("Families Benefited", "लाभान्वित परिवार"), value: totals.families, icon: Users },
            { label: t("Active Projects", "सक्रिय परियोजनाएं"), value: totals.projects, icon: TreePine },
          ].map((s, i) => (
            <div key={i} className="stat-card text-center">
              <s.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recharge Map Visualization */}
        <div className="glass-card mb-8">
          <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-secondary" />
            {t("Recharge Locations", "रिचार्ज स्थान")}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { region: "Rajasthan", hi: "राजस्थान", value: dataset.plants.filter(p => p.region === "rajasthan").reduce((a, p) => a + p.rechargeProjects, 0) },
              { region: "Tamil Nadu", hi: "तमिलनाडु", value: dataset.plants.filter(p => p.region === "tamilnadu").reduce((a, p) => a + p.rechargeProjects, 0) },
              { region: "Karnataka", hi: "कर्नाटक", value: dataset.plants.filter(p => p.region === "karnataka").reduce((a, p) => a + p.rechargeProjects, 0) },
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 text-center">
                <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="font-display font-semibold text-primary text-sm">{t(r.region, r.hi)}</div>
                <div className="text-lg font-bold text-accent">{(r.value / 1000).toFixed(1)}K KL</div>
                <div className="text-xs text-muted-foreground">{t("recharged", "रिचार्ज")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {regionProjects.map((p, i) => (
            <div key={i} className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-primary">{p.name}</h3>
                    <span className="text-xs text-secondary font-medium">{p.type}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-display font-bold text-primary">{p.litres}</div>
                  <div className="text-xs text-muted-foreground">{t("Litres", "लीटर")}</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-display font-bold text-primary">{p.villages}</div>
                  <div className="text-xs text-muted-foreground">{t("Villages", "गांव")}</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-display font-bold text-primary">{p.participation}</div>
                  <div className="text-xs text-muted-foreground">{t("Participation", "भागीदारी")}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-destructive font-medium flex-shrink-0">{t("Before:", "पहले:")}</span>
                  <span className="text-muted-foreground">{p.before}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent font-medium flex-shrink-0">{t("After:", "बाद में:")}</span>
                  <span className="text-muted-foreground">{p.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
