import { Shield, FileText, CheckCircle, AlertTriangle, Download, ExternalLink, Eye } from "lucide-react";

const complianceItems = [
  { item: "CGWA Registration", status: "compliant", detail: "All plants registered under 2026 framework" },
  { item: "Groundwater Metering", status: "compliant", detail: "IoT meters installed at all extraction points" },
  { item: "1.5x Replenishment", status: "in-progress", detail: "Currently at 1.23x — on track for Q3 target" },
  { item: "Community NOC", status: "compliant", detail: "No-objection certificates from all host villages" },
  { item: "Annual Water Audit", status: "compliant", detail: "Third-party audit completed Feb 2026" },
  { item: "Effluent Treatment", status: "compliant", detail: "Zero liquid discharge achieved at 3/4 plants" },
];

const brsrItems = [
  { metric: "Water Intensity (KL/unit)", value: "0.032", trend: "↓12%" },
  { metric: "Groundwater as % of Total", value: "28%", trend: "↓15%" },
  { metric: "Water Recycled (%)", value: "64%", trend: "↑8%" },
  { metric: "Community Water Projects", value: "4 active", trend: "↑2" },
  { metric: "Third-Party Verified", value: "Yes", trend: "✓" },
];

const ESGPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-secondary" />
            <h1 className="section-title mb-0">ESG & Compliance</h1>
          </div>
          <p className="section-subtitle">
            Transparent governance, regulatory compliance, and sustainability reporting.
          </p>
        </div>

        {/* CGWA Tracker */}
        <div className="glass-card mb-8">
          <h2 className="font-display font-semibold text-primary text-xl mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-secondary" />
            CGWA 2026 Compliance Tracker
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
                  {c.status === "compliant" ? "Compliant" : "In Progress"}
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
              BRSR Alignment Summary
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
              <h3 className="font-display font-semibold text-primary mb-4">Reports & Downloads</h3>
              <div className="space-y-2">
                {[
                  "Sustainability Report 2026",
                  "Water Audit Certificate",
                  "CGWA Compliance Letter",
                  "Community Impact Report",
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
                Transparency Statement
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                NeerNiti is committed to full transparency in water governance. All data is verified
                by independent third-party auditors and updated quarterly.
              </p>
              <div className="flex items-center gap-2 text-xs text-accent font-medium">
                <CheckCircle className="w-4 h-4" />
                Third-party audit validated — February 2026
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESGPage;
