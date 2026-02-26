import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const AccessDenied = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center max-w-md mx-4">
        <ShieldX className="w-20 h-20 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-display font-bold text-primary mb-3">{t("Access Denied", "पहुँच अस्वीकृत")}</h1>
        <p className="text-muted-foreground mb-6">
          {t(
            "You don't have permission to access the Admin Dashboard. Only verified Government Officials (@nic.in) can access this section.",
            "आपके पास व्यवस्थापक डैशबोर्ड तक पहुँचने की अनुमति नहीं है। केवल सत्यापित सरकारी अधिकारी (@nic.in) ही इस अनुभाग तक पहुँच सकते हैं।"
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" className="px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all">
            {t("Go to Public Dashboard", "सार्वजनिक डैशबोर्ड पर जाएं")}
          </Link>
          <Link to="/login" className="px-6 py-2.5 rounded-xl border border-input text-primary font-semibold text-sm hover:bg-muted transition-all">
            {t("Login as Admin", "व्यवस्थापक के रूप में लॉगिन")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
