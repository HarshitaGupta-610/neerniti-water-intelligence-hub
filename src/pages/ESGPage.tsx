import { Shield, FileText, CheckCircle, AlertTriangle, Download, ExternalLink, Eye } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const ESGPage = () => {
  const { t } = useLanguage();

  const complianceItems = [
    { item: t("CGWA Registration", "CGWA पंजीकरण"), status: "compliant", detail: t("All plants registered under 2026 framework", "सभी संयंत्र 2026 फ्रेमवर्क के तहत पंजीकृत") },
    { item: t("Groundwater Metering", "भूजल मीटरिंग"), status: "compliant", detail: t("IoT meters installed at all extraction points", "सभी निकासी बिंदुओं पर IoT मीटर स्थापित") },
    { item: t("1.5x Replenishment", "1.5x पुनःपूर्ति"), status: "in-progress", detail: t("Currently at 1.23x — on track for Q3 target", "वर्तमान में 1.23x — Q3 लक्ष्य के अनुरूप") },
    { item: t("Community NOC", "सामुदायिक NOC"), status: "compliant", detail: t("No-objection certificates from all host villages", "सभी मेजबान गांवों से अनापत्ति प्रमाण पत्र") },
    { item: t("Annual Water Audit", "वार्षिक जल ऑडिट"), status: "compliant", detail: t("Third-party audit completed Feb 2026", "तृतीय-पक्ष ऑडिट फरवरी 2026 में पूर्ण") },
    { item: t("Effluent Treatment", "बहिःस्राव उपचार"), status: "compliant", detail: t("Zero liquid discharge achieved at 3/4 plants", "3/4 संयंत्रों में शून्य तरल निर्वहन प्राप्त") },
  ];

  const brsrItems = [
    { metric: t("Water Intensity (KL/unit)", "जल तीव्रता (KL/इकाई)"), value: "0.032", trend: "↓12%" },
    { metric: t("Groundwater as % of Total", "कुल का भूजल %"), value: "28%", trend: "↓15%" },
    { metric: t("Water Recycled (%)", "पुनर्चक्रित जल (%)"), value: "64%", trend: "↑8%" },
    { metric: t("Community Water Projects", "सामुदायिक जल परियोजनाएं"), value: t("4 active", "4 सक्रिय"), trend: "↑2" },
    { metric: t("Third-Party Verified", "तृतीय-पक्ष सत्यापित"), value: t("Yes", "हां"), trend: "✓" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-secondary" />
            <h1 className="section-title mb-0">{t("ESG & Compliance", "ESG और अनुपालन")}</h1>
          </div>
          <p className="section-subtitle">
            {t(
              "Transparent governance, regulatory compliance, and sustainability reporting.",
              "पारदर्शी शासन, विनियामक अनुपालन और स्थिरता रिपोर्टिंग।"
            )}
          </p>
        </div>

        {/* CGWA Tracker */}
        <div className="glass-card mb-8">
          <h2 className="font-display font-semibold text-primary text-xl mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-secondary" />
            {t("CGWA 2026 Compliance Tracker", "CGWA 2026 अनुपालन ट्रैकर")}
          </h2>
          <div className="space-y-3">
            {complianceItems.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {c.status === "compliant" ? (
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-secondary flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-primary text-sm">{c.item}</div>
                    <div className="text-xs text-muted-foreground">{c.detail}</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  c.status === "compliant"
                    ? "bg-accent/10 text-accent"
                    : "bg-secondary/10 text-secondary"
                }`}>
                  {c.status === "compliant" ? t("Compliant", "अनुपालित") : t("In Progress", "प्रगति में")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BRSR Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card">
            <h2 className="font-display font-semibold text-primary text-xl mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              {t("BRSR Alignment Summary", "BRSR संरेखण सारांश")}
            </h2>
            <div className="space-y-3">
              {brsrItems.map((b, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted-foreground">{b.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary text-sm">{b.value}</span>
                    <span className="text-xs text-accent font-medium">{b.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Downloads */}
            <div className="glass-card">
              <h3 className="font-display font-semibold text-primary mb-4">{t("Reports & Downloads", "रिपोर्ट और डाउनलोड")}</h3>
              <div className="space-y-2">
                {[
                  t("Sustainability Report 2026", "स्थिरता रिपोर्ट 2026"),
                  t("Water Audit Certificate", "जल ऑडिट प्रमाण पत्र"),
                  t("CGWA Compliance Letter", "CGWA अनुपालन पत्र"),
                  t("Community Impact Report", "सामुदायिक प्रभाव रिपोर्ट"),
                ].map((doc, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                  >
                    <span className="text-sm text-primary font-medium">{doc}</span>
                    <Download className="w-4 h-4 text-secondary" />
                  </button>
                ))}
              </div>
            </div>

            {/* Transparency */}
            <div className="glass-card">
              <h3 className="font-display font-semibold text-primary mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary" />
                {t("Transparency Statement", "पारदर्शिता वक्तव्य")}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t(
                  "NeerNiti is committed to full transparency in water governance. All data is verified by independent third-party auditors and updated quarterly.",
                  "NeerNiti जल शासन में पूर्ण पारदर्शिता के लिए प्रतिबद्ध है। सभी डेटा स्वतंत्र तृतीय-पक्ष लेखा परीक्षकों द्वारा सत्यापित और त्रैमासिक रूप से अपडेट किया जाता है।"
                )}
              </p>
              <div className="flex items-center gap-2 text-xs text-accent font-medium">
                <CheckCircle className="w-4 h-4" />
                {t("Third-party audit validated — February 2026", "तृतीय-पक्ष ऑडिट सत्यापित — फरवरी 2026")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESGPage;
