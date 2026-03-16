import { motion } from "framer-motion";
import { LayoutDashboard, Users, User } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "community", icon: Users, label: "Community" },
  { id: "profile", icon: User, label: "Profile" },
];

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30">
      <div className="glass-card rounded-none" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.1)", borderRadius: 0, backdropFilter: "blur(30px)" }}>
        <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center gap-0.5 px-6 py-1.5 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-0.5 w-8 h-0.5 rounded-full"
                    style={{ background: "hsl(47, 91%, 52%)" }}
                  />
                )}
                <tab.icon
                  className={`w-5 h-5 transition-colors duration-200 ${isActive ? "gold-text" : "text-silver"}`}
                  strokeWidth={1.5}
                />
                <span className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? "gold-text" : "text-silver"}`}>
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
