import { useState } from "react";
import { Gamepad2, Droplets, DollarSign, Users, Shield, ArrowRight, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface GameState {
  level: number;
  groundwater: number;
  profit: number;
  trust: number;
  compliance: number;
  sustainability: number;
  gameOver: boolean;
  won: boolean;
  messageEn: string;
  messageHi: string;
}

interface Decision {
  textEn: string;
  textHi: string;
  descEn: string;
  descHi: string;
  effects: Partial<GameState>;
}

const GamePage = () => {
  const { t } = useLanguage();

  const initialState: GameState = {
    level: 1,
    groundwater: 80,
    profit: 70,
    trust: 50,
    compliance: 30,
    sustainability: 20,
    gameOver: false,
    won: false,
    messageEn: "You're the new Plant Manager. Groundwater dependence is 80%. Bring it to zero and achieve 1.5x replenishment!",
    messageHi: "आप नए संयंत्र प्रबंधक हैं। भूजल निर्भरता 80% है। इसे शून्य पर लाएं और 1.5x पुनःपूर्ति प्राप्त करें!",
  };

  const levelDecisions: Decision[][] = [
    [
      { textEn: "Install Rainwater Harvesting", textHi: "वर्षा जल संचयन स्थापित करें", descEn: "+Sustainability, +Trust, -Profit", descHi: "+स्थिरता, +विश्वास, -लाभ", effects: { groundwater: -15, sustainability: 15, trust: 10, profit: -10, compliance: 10 } },
      { textEn: "Increase Groundwater Pumping", textHi: "भूजल पंपिंग बढ़ाएं", descEn: "+Profit, -Trust, -Compliance", descHi: "+लाभ, -विश्वास, -अनुपालन", effects: { profit: 15, trust: -15, compliance: -15, sustainability: -5 } },
      { textEn: "Partner with Municipality", textHi: "नगरपालिका के साथ साझेदारी", descEn: "Balanced approach", descHi: "संतुलित दृष्टिकोण", effects: { groundwater: -10, profit: -5, trust: 5, compliance: 5, sustainability: 10 } },
    ],
    [
      { textEn: "Build Check Dams", textHi: "चेक डैम बनाएं", descEn: "+Compliance, +Trust, -Profit", descHi: "+अनुपालन, +विश्वास, -लाभ", effects: { groundwater: -10, sustainability: 20, trust: 15, profit: -15, compliance: 15 } },
      { textEn: "Recycle Plant Wastewater", textHi: "संयंत्र अपशिष्ट जल पुनर्चक्रण", descEn: "+Sustainability, moderate cost", descHi: "+स्थिरता, मध्यम लागत", effects: { groundwater: -15, sustainability: 15, trust: 5, profit: -8, compliance: 10 } },
      { textEn: "Cut Costs, Delay Action", textHi: "लागत कम करें, कार्रवाई में देरी", descEn: "+Profit, High Risk", descHi: "+लाभ, उच्च जोखिम", effects: { profit: 10, trust: -20, compliance: -20, sustainability: -10 } },
    ],
    [
      { textEn: "Full Water Recycling System", textHi: "पूर्ण जल पुनर्चक्रण प्रणाली", descEn: "Major investment, big impact", descHi: "बड़ा निवेश, बड़ा प्रभाव", effects: { groundwater: -25, sustainability: 25, trust: 10, profit: -20, compliance: 20 } },
      { textEn: "Community Well Program", textHi: "सामुदायिक कुआं कार्यक्रम", descEn: "+Trust, +Compliance", descHi: "+विश्वास, +अनुपालन", effects: { groundwater: -5, trust: 25, compliance: 15, sustainability: 10, profit: -10 } },
      { textEn: "Lobby Against Regulations", textHi: "नियमों के खिलाफ लॉबी", descEn: "Short-term gain, long-term risk", descHi: "अल्पकालिक लाभ, दीर्घकालिक जोखिम", effects: { profit: 5, trust: -30, compliance: -10, sustainability: -15 } },
    ],
    [
      { textEn: "Solar Desalination Unit", textHi: "सौर विलवणीकरण इकाई", descEn: "Eliminate groundwater", descHi: "भूजल समाप्त करें", effects: { groundwater: -30, sustainability: 20, profit: -15, compliance: 20, trust: 10 } },
      { textEn: "Aquifer Recharge Project", textHi: "जलभृत रिचार्ज परियोजना", descEn: "1.5x target push", descHi: "1.5x लक्ष्य की ओर", effects: { groundwater: -10, sustainability: 30, compliance: 25, trust: 15, profit: -12 } },
      { textEn: "Maintain Status Quo", textHi: "यथास्थिति बनाए रखें", descEn: "No change", descHi: "कोई बदलाव नहीं", effects: { trust: -10, compliance: -5 } },
    ],
  ];

  const [state, setState] = useState<GameState>({ ...initialState });

  const makeDecision = (decision: Decision) => {
    setState((prev) => {
      const next = { ...prev };
      const effects = decision.effects;

      next.groundwater = Math.max(0, Math.min(100, next.groundwater + (effects.groundwater || 0)));
      next.profit = Math.max(0, Math.min(100, next.profit + (effects.profit || 0)));
      next.trust = Math.max(0, Math.min(100, next.trust + (effects.trust || 0)));
      next.compliance = Math.max(0, Math.min(100, next.compliance + (effects.compliance || 0)));
      next.sustainability = Math.max(0, Math.min(100, next.sustainability + (effects.sustainability || 0)));

      if (next.profit <= 0) {
        next.gameOver = true; next.won = false;
        next.messageEn = "💸 Your plant went bankrupt! Sustainability needs to be balanced with profitability.";
        next.messageHi = "💸 आपका संयंत्र दिवालिया हो गया! स्थिरता को लाभप्रदता के साथ संतुलित करना होगा।";
      } else if (next.trust <= 0) {
        next.gameOver = true; next.won = false;
        next.messageEn = "😡 Community protests forced your plant to shut down. Trust matters!";
        next.messageHi = "😡 सामुदायिक विरोध ने आपके संयंत्र को बंद करवा दिया। विश्वास मायने रखता है!";
      } else if (next.groundwater <= 0 && next.compliance >= 80 && next.sustainability >= 70) {
        next.gameOver = true; next.won = true;
        next.messageEn = "🎉 Congratulations! You achieved Net Zero groundwater dependence with 1.5x replenishment!";
        next.messageHi = "🎉 बधाई! आपने 1.5x पुनःपूर्ति के साथ नेट ज़ीरो भूजल निर्भरता प्राप्त कर ली!";
      } else if (next.level >= 4) {
        if (next.groundwater <= 10 && next.compliance >= 60) {
          next.gameOver = true; next.won = true;
          next.messageEn = "🏆 Well done! You've significantly reduced groundwater dependence and improved compliance.";
          next.messageHi = "🏆 शाबाश! आपने भूजल निर्भरता काफी कम कर दी और अनुपालन में सुधार किया।";
        } else {
          next.gameOver = true; next.won = false;
          next.messageEn = "⏰ Time's up! You didn't reduce groundwater dependence enough. Try again with better strategy.";
          next.messageHi = "⏰ समय समाप्त! आपने भूजल निर्भरता पर्याप्त कम नहीं की। बेहतर रणनीति के साथ फिर कोशिश करें।";
        }
      } else {
        next.level = prev.level + 1;
        next.messageEn = `Level ${next.level}: Your decisions are shaping the future. Groundwater: ${next.groundwater}%`;
        next.messageHi = `स्तर ${next.level}: आपके निर्णय भविष्य को आकार दे रहे हैं। भूजल: ${next.groundwater}%`;
      }

      return next;
    });
  };

  const reset = () => setState({ ...initialState });

  const Meter = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) => (
    <div className="glass-card text-center">
      <Icon className={`w-6 h-6 mx-auto mb-1 ${color}`} />
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-xl font-display font-bold text-primary">{value}</div>
      <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color === "text-accent" ? "bg-accent" : color === "text-destructive" ? "bg-destructive" : "bg-secondary"}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );

  const currentDecisions = levelDecisions[Math.min(state.level - 1, levelDecisions.length - 1)];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 mb-4">
            <Gamepad2 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">{t("Gamified Learning", "गेमिफाइड लर्निंग")}</span>
          </div>
          <h1 className="section-title text-center">{t("From Day Zero to Net Zero", "डे ज़ीरो से नेट ज़ीरो तक")}</h1>
          <p className="section-subtitle mx-auto text-center">
            {t(
              "You're a Plant Manager. Eliminate groundwater dependence while maintaining profits and community trust.",
              "आप एक संयंत्र प्रबंधक हैं। लाभ और सामुदायिक विश्वास बनाए रखते हुए भूजल निर्भरता समाप्त करें।"
            )}
          </p>
        </div>

        {/* Level Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all ${
                l < state.level
                  ? "bg-accent text-accent-foreground"
                  : l === state.level
                  ? "bg-secondary text-secondary-foreground glow-aqua"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {l}
            </div>
          ))}
        </div>

        {/* Meters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Meter label={t("Sustainability", "स्थिरता")} value={state.sustainability} icon={Droplets} color="text-accent" />
          <Meter label={t("Profit", "लाभ")} value={state.profit} icon={DollarSign} color="text-secondary" />
          <Meter label={t("Trust", "विश्वास")} value={state.trust} icon={Users} color="text-secondary" />
          <Meter label={t("Compliance", "अनुपालन")} value={state.compliance} icon={Shield} color="text-accent" />
          <Meter label={t("Groundwater", "भूजल")} value={state.groundwater} icon={Droplets} color="text-destructive" />
        </div>

        {/* Message */}
        <div className={`glass-card text-center mb-6 ${state.gameOver ? (state.won ? "border-accent/30" : "border-destructive/30") : ""}`}>
          <p className="text-primary font-medium">{t(state.messageEn, state.messageHi)}</p>
        </div>

        {/* Decisions or Game Over */}
        {state.gameOver ? (
          <div className="text-center">
            <div className="mb-6">
              {state.won ? (
                <Trophy className="w-16 h-16 text-accent mx-auto animate-pulse_glow rounded-full" />
              ) : (
                <XCircle className="w-16 h-16 text-destructive mx-auto" />
              )}
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all"
            >
              <RotateCcw className="w-5 h-5" /> {t("Play Again", "फिर से खेलें")}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-primary text-center mb-4">{t("Choose Your Action", "अपनी कार्रवाई चुनें")}</h3>
            {currentDecisions.map((d, i) => (
              <button
                key={i}
                onClick={() => makeDecision(d)}
                className="w-full stat-card text-left flex items-center justify-between group cursor-pointer hover:border-secondary/30"
              >
                <div>
                  <div className="font-semibold text-primary group-hover:text-secondary transition-colors">{t(d.textEn, d.textHi)}</div>
                  <div className="text-sm text-muted-foreground">{t(d.descEn, d.descHi)}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default GamePage;
