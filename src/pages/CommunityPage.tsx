import { MapPin, Droplets, Users, ArrowUpRight, TreePine } from "lucide-react";

const projects = [
  {
    name: "Check Dam – Alwar, Rajasthan",
    type: "Check Dam",
    litres: "2.4M",
    villages: 12,
    participation: "340 families",
    before: "Dry borewells, 5km water walk",
    after: "Water table rose 15ft, year-round supply",
    icon: "🏗️",
  },
  {
    name: "Farm Pond – Anantapur, AP",
    type: "Farm Pond",
    litres: "800K",
    villages: 5,
    participation: "120 farmers",
    before: "Failed monsoon crops, migration",
    after: "2 crop cycles restored, 60% less migration",
    icon: "🌊",
  },
  {
    name: "Lake Revival – Bengaluru Rural",
    type: "Lake Revival",
    litres: "5.2M",
    villages: 18,
    participation: "1200+ volunteers",
    before: "Sewage-filled, dead ecosystem",
    after: "Migratory birds returned, groundwater +22ft",
    icon: "🦆",
  },
  {
    name: "Borewell Recharge – Chennai",
    type: "Recharge Shaft",
    litres: "1.1M",
    villages: 8,
    participation: "200 homes",
    before: "Tanker dependency, ₹5000/month per family",
    after: "Self-sufficient, savings of ₹4000/month",
    icon: "💧",
  },
];

const totals = {
  litres: "9.5M",
  villages: 43,
  families: "1860+",
  projects: 4,
};

const CommunityPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <h1 className="section-title">Community Impact</h1>
          <p className="section-subtitle">
            Real recharge projects making a difference — check dams, farm ponds, lake revivals, and borewell recharge shafts.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Litres Recharged", value: totals.litres, icon: Droplets },
            { label: "Villages Impacted", value: totals.villages, icon: MapPin },
            { label: "Families Benefited", value: totals.families, icon: Users },
            { label: "Active Projects", value: totals.projects, icon: TreePine },
          ].map((s, i) => (
            <div key={i} className="stat-card text-center">
              <s.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
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
                  <div className="text-xs text-muted-foreground">Litres</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-display font-bold text-primary">{p.villages}</div>
                  <div className="text-xs text-muted-foreground">Villages</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-display font-bold text-primary">{p.participation}</div>
                  <div className="text-xs text-muted-foreground">Participation</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-destructive font-medium flex-shrink-0">Before:</span>
                  <span className="text-muted-foreground">{p.before}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent font-medium flex-shrink-0">After:</span>
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
