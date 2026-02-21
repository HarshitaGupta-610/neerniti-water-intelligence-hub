import { AlertTriangle, Droplets, Factory, MapPin, TrendingDown, Wheat, Building2, CloudRain } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import { useLanguage } from "@/components/LanguageProvider";

const CrisisPage = () => {
  const { t } = useLanguage();

  const causes = [
    { icon: Factory, title: t("Industrial Overuse", "औद्योगिक अति-उपयोग"), desc: t("Factories and beverage plants extracting millions of litres daily without adequate replenishment.", "कारखाने और पेय संयंत्र बिना पर्याप्त पुनःपूर्ति के प्रतिदिन लाखों लीटर निकाल रहे हैं।") },
    { icon: Wheat, title: t("Agricultural Dependence", "कृषि निर्भरता"), desc: t("70% of India's irrigation relies on groundwater, depleting aquifers faster than nature can recharge.", "भारत की 70% सिंचाई भूजल पर निर्भर है, जो प्रकृति की पुनःपूर्ति से तेजी से जलभृतों को खाली कर रही है।") },
    { icon: Building2, title: t("Urban Expansion", "शहरी विस्तार"), desc: t("Rapid urbanization seals natural recharge zones with concrete, preventing rainwater infiltration.", "तेजी से शहरीकरण प्राकृतिक रिचार्ज क्षेत्रों को कंक्रीट से सील कर देता है, जिससे वर्षा जल का रिसाव रुक जाता है।") },
    { icon: CloudRain, title: t("Climate Variability", "जलवायु परिवर्तनशीलता"), desc: t("Erratic monsoons and rising temperatures disrupt the natural groundwater recharge cycle.", "अनियमित मानसून और बढ़ता तापमान प्राकृतिक भूजल रिचार्ज चक्र को बाधित करता है।") },
  ];

  const regions = [
    { name: t("Rajasthan (Alwar)", "राजस्थान (अलवर)"), borewellFailure: "62%", stress: t("Critical", "गंभीर"), detail: t("Ancient stepwells running dry, communities walk 5+ km for water.", "प्राचीन बावड़ियां सूख रही हैं, समुदाय पानी के लिए 5+ किमी पैदल चलते हैं।") },
    { name: t("Tamil Nadu (Chennai)", "तमिलनाडु (चेन्नई)"), borewellFailure: "48%", stress: t("Severe", "गंभीर"), detail: t("Day Zero crisis in 2019; reservoirs hit near-zero levels.", "2019 में डे ज़ीरो संकट; जलाशय लगभग शून्य स्तर पर पहुंचे।") },
    { name: t("Karnataka (Bengaluru Rural)", "कर्नाटक (बेंगलुरु ग्रामीण)"), borewellFailure: "55%", stress: t("Critical", "गंभीर"), detail: t("Borewells drilled to 1500ft+ with declining yield rates.", "1500 फीट+ तक बोरवेल खोदे गए हैं जिनमें उत्पादन दर घट रही है।") },
  ];

  const regulations = [
    { year: "2026", title: t("New Regulation", "नया नियम"), desc: t("500% increase in groundwater extraction charges for commercial users.", "वाणिज्यिक उपयोगकर्ताओं के लिए भूजल निकासी शुल्क में 500% वृद्धि।") },
    { year: "2027", title: t("Extraction Deadline", "निकासी की समय सीमा"), desc: t("All high-consumption units must demonstrate sustainable extraction plans.", "सभी उच्च-उपभोग इकाइयों को टिकाऊ निकासी योजनाएं प्रदर्शित करनी होंगी।") },
    { year: t("Mandatory", "अनिवार्य"), title: t("1.5x Replenishment", "1.5x पुनःपूर्ति"), desc: t("Companies must recharge 1.5x the volume of groundwater they extract.", "कंपनियों को निकाले गए भूजल के 1.5 गुना की पुनःपूर्ति करनी होगी।") },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="hero-section bg-hero-gradient py-20 relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-destructive/30 bg-destructive/10 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive-foreground">{t("National Emergency", "राष्ट्रीय आपातकाल")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 max-w-3xl hero-text">
            {t("Why Is Groundwater Scarcity a National Emergency?", "भूजल की कमी राष्ट्रीय आपातकाल क्यों है?")}
          </h1>
          <p className="hero-text-muted text-lg max-w-2xl">
            {t(
              "India's groundwater reserves are depleting at an alarming rate. Over-extraction threatens agriculture, industry, and millions of lives.",
              "भारत के भूजल भंडार खतरनाक दर से घट रहे हैं। अत्यधिक निकासी कृषि, उद्योग और लाखों लोगों के जीवन को खतरे में डाल रही है।"
            )}
          </p>
        </div>
        <WaveDivider />
      </section>

      {/* Groundwater Usage */}
      <section className="section-container">
        <h2 className="section-title mb-8">{t("Groundwater: The Hidden Lifeline", "भूजल: छिपी हुई जीवन रेखा")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Droplets, stat: "70%", text: t("of plant water sourced from groundwater", "संयंत्र का पानी भूजल से प्राप्त") },
            { icon: TrendingDown, stat: "500–1000ft", text: t("water tables falling in stressed zones", "तनावग्रस्त क्षेत्रों में जल स्तर गिर रहा है") },
            { icon: AlertTriangle, stat: t("Millions", "लाखों"), text: t("of borewells running dry every year", "बोरवेल हर साल सूख रहे हैं") },
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
          <h2 className="section-title mb-8">{t("Root Causes of the Crisis", "संकट के मूल कारण")}</h2>
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
        <h2 className="section-title mb-2">{t("Affected Regions", "प्रभावित क्षेत्र")}</h2>
        <p className="section-subtitle mb-8">{t("Interactive map data from India's most water-stressed zones.", "भारत के सबसे अधिक जल-तनावग्रस्त क्षेत्रों का इंटरैक्टिव मानचित्र डेटा।")}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {regions.map((r, i) => (
            <div key={i} className="stat-card border-l-4 border-l-destructive">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-destructive" />
                <h3 className="font-display font-semibold text-primary">{r.name}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Borewell Failure", "बोरवेल विफलता")}</span>
                  <span className="font-semibold text-destructive">{r.borewellFailure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Water Stress", "जल तनाव")}</span>
                  <span className="font-semibold text-destructive">{r.stress}</span>
                </div>
                <p className="text-muted-foreground pt-2 border-t border-border">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beverage Plant Risk */}
      <section className="hero-section bg-ocean-gradient">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 hero-text">
            {t("Why Beverage Plants Face Shutdown Risk", "पेय संयंत्रों को बंद होने का खतरा क्यों है")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {regulations.map((r, i) => (
              <div key={i} className="glass-card-dark">
                <div className="text-ocean-aqua font-display font-bold text-lg mb-2">{r.year}</div>
                <h3 className="hero-text font-semibold mb-2">{r.title}</h3>
                <p className="hero-text-muted text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrisisPage;
