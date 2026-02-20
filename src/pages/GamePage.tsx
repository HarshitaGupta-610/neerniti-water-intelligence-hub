import { useState } from "react";
import { Gamepad2, Droplets, DollarSign, Users, Shield, ArrowRight, RotateCcw, Trophy, XCircle } from "lucide-react";

interface GameState {
  level: number;
  groundwater: number;
  profit: number;
  trust: number;
  compliance: number;
  sustainability: number;
  gameOver: boolean;
  won: boolean;
  message: string;
}

const initialState: GameState = {
  level: 1,
  groundwater: 80,
  profit: 70,
  trust: 50,
  compliance: 30,
  sustainability: 20,
  gameOver: false,
  won: false,
  message: "You're the new Plant Manager. Groundwater dependence is 80%. Bring it to zero and achieve 1.5x replenishment!",
};

interface Decision {
  text: string;
  effects: Partial<GameState>;
  description: string;
}

const levelDecisions: Decision[][] = [
  [
    { text: "Install Rainwater Harvesting", description: "+Sustainability, +Trust, -Profit", effects: { groundwater: -15, sustainability: 15, trust: 10, profit: -10, compliance: 10 } },
    { text: "Increase Groundwater Pumping", description: "+Profit, -Trust, -Compliance", effects: { profit: 15, trust: -15, compliance: -15, sustainability: -5 } },
    { text: "Partner with Municipality", description: "Balanced approach", effects: { groundwater: -10, profit: -5, trust: 5, compliance: 5, sustainability: 10 } },
  ],
  [
    { text: "Build Check Dams", description: "+Compliance, +Trust, -Profit", effects: { groundwater: -10, sustainability: 20, trust: 15, profit: -15, compliance: 15 } },
    { text: "Recycle Plant Wastewater", description: "+Sustainability, moderate cost", effects: { groundwater: -15, sustainability: 15, trust: 5, profit: -8, compliance: 10 } },
    { text: "Cut Costs, Delay Action", description: "+Profit, High Risk", effects: { profit: 10, trust: -20, compliance: -20, sustainability: -10 } },
  ],
  [
    { text: "Full Water Recycling System", description: "Major investment, big impact", effects: { groundwater: -25, sustainability: 25, trust: 10, profit: -20, compliance: 20 } },
    { text: "Community Well Program", description: "+Trust, +Compliance", effects: { groundwater: -5, trust: 25, compliance: 15, sustainability: 10, profit: -10 } },
    { text: "Lobby Against Regulations", description: "Short-term gain, long-term risk", effects: { profit: 5, trust: -30, compliance: -10, sustainability: -15 } },
  ],
  [
    { text: "Solar Desalination Unit", description: "Eliminate groundwater", effects: { groundwater: -30, sustainability: 20, profit: -15, compliance: 20, trust: 10 } },
    { text: "Aquifer Recharge Project", description: "1.5x target push", effects: { groundwater: -10, sustainability: 30, compliance: 25, trust: 15, profit: -12 } },
    { text: "Maintain Status Quo", description: "No change", effects: { trust: -10, compliance: -5 } },
  ],
];

const GamePage = () => {
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

      // Check win/lose
      if (next.profit <= 0) {
        next.gameOver = true;
        next.won = false;
        next.message = "💸 Your plant went bankrupt! Sustainability needs to be balanced with profitability.";
      } else if (next.trust <= 0) {
        next.gameOver = true;
        next.won = false;
        next.message = "😡 Community protests forced your plant to shut down. Trust matters!";
      } else if (next.groundwater <= 0 && next.compliance >= 80 && next.sustainability >= 70) {
        next.gameOver = true;
        next.won = true;
        next.message = "🎉 Congratulations! You achieved Net Zero groundwater dependence with 1.5x replenishment!";
      } else if (next.level >= 4) {
        if (next.groundwater <= 10 && next.compliance >= 60) {
          next.gameOver = true;
          next.won = true;
          next.message = "🏆 Well done! You've significantly reduced groundwater dependence and improved compliance.";
        } else {
          next.gameOver = true;
          next.won = false;
          next.message = "⏰ Time's up! You didn't reduce groundwater dependence enough. Try again with better strategy.";
        }
      } else {
        next.level = prev.level + 1;
        next.message = `Level ${next.level}: Your decisions are shaping the future. Groundwater: ${next.groundwater}%`;
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
            <span className="text-sm font-medium text-secondary">Gamified Learning</span>
          </div>
          <h1 className="section-title text-center">From Day Zero to Net Zero</h1>
          <p className="section-subtitle mx-auto text-center">
            You're a Plant Manager. Eliminate groundwater dependence while maintaining profits and community trust.
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
          <Meter label="Sustainability" value={state.sustainability} icon={Droplets} color="text-accent" />
          <Meter label="Profit" value={state.profit} icon={DollarSign} color="text-secondary" />
          <Meter label="Trust" value={state.trust} icon={Users} color="text-secondary" />
          <Meter label="Compliance" value={state.compliance} icon={Shield} color="text-accent" />
          <Meter label="Groundwater" value={state.groundwater} icon={Droplets} color="text-destructive" />
        </div>

        {/* Message */}
        <div className={`glass-card text-center mb-6 ${state.gameOver ? (state.won ? "border-accent/30" : "border-destructive/30") : ""}`}>
          <p className="text-primary font-medium">{state.message}</p>
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
              <RotateCcw className="w-5 h-5" /> Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-primary text-center mb-4">Choose Your Action</h3>
            {currentDecisions.map((d, i) => (
              <button
                key={i}
                onClick={() => makeDecision(d)}
                className="w-full stat-card text-left flex items-center justify-between group cursor-pointer hover:border-secondary/30"
              >
                <div>
                  <div className="font-semibold text-primary group-hover:text-secondary transition-colors">{d.text}</div>
                  <div className="text-sm text-muted-foreground">{d.description}</div>
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
