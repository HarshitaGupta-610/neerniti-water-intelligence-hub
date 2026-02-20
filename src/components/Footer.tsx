import { Droplets, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-aqua-gradient flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">NeerNiti</span>
          </div>
          <p className="text-primary-foreground/70 text-sm max-w-md mb-4">
            Beyond Usage. Toward Regeneration. NeerNiti is a water intelligence platform
            helping businesses achieve sustainable water governance and 1.5x replenishment.
          </p>
          <p className="text-primary-foreground/50 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-ocean-aqua" /> for a water-positive future
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Platform</h4>
          <div className="space-y-2">
            <Link to="/crisis" className="block text-sm text-primary-foreground/70 hover:text-ocean-aqua transition-colors">The Crisis</Link>
            <Link to="/dashboard" className="block text-sm text-primary-foreground/70 hover:text-ocean-aqua transition-colors">Dashboard</Link>
            <Link to="/simulation" className="block text-sm text-primary-foreground/70 hover:text-ocean-aqua transition-colors">Simulation Lab</Link>
            <Link to="/game" className="block text-sm text-primary-foreground/70 hover:text-ocean-aqua transition-colors">Game</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Impact</h4>
          <div className="space-y-2">
            <Link to="/community" className="block text-sm text-primary-foreground/70 hover:text-ocean-aqua transition-colors">Community</Link>
            <Link to="/esg" className="block text-sm text-primary-foreground/70 hover:text-ocean-aqua transition-colors">ESG & Compliance</Link>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center">
        <p className="text-primary-foreground/40 text-xs">
          © 2026 NeerNiti. Committed to transparent water governance and planetary regeneration.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
