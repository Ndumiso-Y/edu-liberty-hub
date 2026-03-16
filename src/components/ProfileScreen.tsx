import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, CreditCard, ChevronRight, LogOut } from "lucide-react";

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen = ({ onLogout }: ProfileScreenProps) => {
  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: CreditCard, label: "Payment Methods" },
    { icon: Shield, label: "Privacy & Security" },
    { icon: Settings, label: "App Settings" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="w-20 h-20 rounded-full mx-auto mb-3 gold-border flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.12)" }}>
          <span className="font-display text-2xl font-bold gradient-gold">SM</span>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Sarah Mokwena</h2>
        <p className="text-silver text-sm">Premium Member since Jan 2025</p>
        <div className="flex justify-center gap-4 mt-4">
          {[
            { label: "Contributed", value: "R1,260" },
            { label: "Entries", value: "42" },
            { label: "Impact", value: "3 Schools" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card px-4 py-2 text-center">
              <p className="font-display text-sm font-bold gold-text">{stat.value}</p>
              <p className="text-[9px] text-silver">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card-hover w-full p-4 flex items-center gap-3"
          >
            <item.icon className="w-5 h-5 gold-text" strokeWidth={1.5} />
            <span className="flex-1 text-sm font-medium text-foreground text-left">{item.label}</span>
            {item.badge && (
              <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: "hsl(47 91% 52%)", color: "hsl(220 69% 14%)" }}>{item.badge}</span>
            )}
            <ChevronRight className="w-4 h-4 text-silver" strokeWidth={1.5} />
          </motion.button>
        ))}

        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onLogout}
          className="glass-card-hover w-full p-4 flex items-center gap-3 mt-4"
        >
          <LogOut className="w-5 h-5" style={{ color: "hsl(0, 70%, 55%)" }} strokeWidth={1.5} />
          <span className="flex-1 text-sm font-medium text-left" style={{ color: "hsl(0, 70%, 55%)" }}>Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileScreen;
