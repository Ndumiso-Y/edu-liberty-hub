import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Heart, Users, TrendingUp, ChevronRight, GraduationCap, Building, BookOpen } from "lucide-react";

const Dashboard = () => {
  const [countdown, setCountdown] = useState({ days: 4, hours: 18, minutes: 35, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { icon: CreditCard, label: "Pay Now", color: "hsl(47 91% 52% / 0.15)" },
    { icon: TrendingUp, label: "Impact", color: "hsl(160 60% 45% / 0.15)" },
    { icon: Users, label: "Referral", color: "hsl(220 60% 60% / 0.15)" },
    { icon: Heart, label: "Donate", color: "hsl(340 65% 55% / 0.15)" },
  ];

  const impacts = [
    { icon: Building, title: "Community Schools", amount: "R650", date: "Oct 12" },
    { icon: GraduationCap, title: "Rural Grants", amount: "R310", date: "Sep 28" },
    { icon: BookOpen, title: "Mentor Program", amount: "R300", date: "Sep 15" },
  ];

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <p className="text-silver text-xs">Welcome back</p>
          <h2 className="font-display text-xl font-bold text-foreground">Hello, Sarah! 👋</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">Sarah M.</p>
            <p className="text-[10px] gold-text">Premium Member</p>
          </div>
          <div className="w-10 h-10 rounded-full gold-border flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
            <span className="font-display font-bold text-sm gold-text">SM</span>
          </div>
        </div>
      </motion.div>

      {/* Side by side cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Contributions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-silver mb-1">Contribution Total</p>
          {/* Mini sparkline */}
          <svg className="w-full h-8 mb-2" viewBox="0 0 100 30">
            <polyline fill="none" stroke="hsl(47, 91%, 52%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              points="0,25 15,22 30,18 45,20 60,12 75,14 90,6 100,8" />
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(47, 91%, 52%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(47, 91%, 52%)" stopOpacity="0" />
            </linearGradient>
            <polygon fill="url(#sparkGrad)" points="0,25 15,22 30,18 45,20 60,12 75,14 90,6 100,8 100,30 0,30" />
          </svg>
          <h3 className="font-display text-2xl font-bold gradient-gold">R1,260</h3>
          <p className="text-[9px] text-silver mt-1 leading-tight">You've contributed R1,260 towards education this year.</p>
          <button className="flex items-center gap-1 mt-2 text-[10px] gold-text font-medium">
            Details <ChevronRight className="w-3 h-3" />
          </button>
        </motion.div>

        {/* Prize Draw */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card gold-border p-4 shimmer animate-pulse-gold">
          <p className="text-[10px] uppercase tracking-widest text-silver mb-2">Prize Draw</p>
          <h3 className="font-display text-3xl font-bold gradient-gold text-center">R2,000</h3>
          <p className="text-[10px] text-silver text-center mt-1">Grand Prize Draw</p>
          <div className="flex justify-center gap-1.5 mt-3">
            {[
              { val: pad(countdown.days), label: "D" },
              { val: pad(countdown.hours), label: "H" },
              { val: pad(countdown.minutes), label: "M" },
              { val: pad(countdown.seconds), label: "S" },
            ].map((t) => (
              <div key={t.label} className="glass-card px-2 py-1.5 text-center min-w-[36px]">
                <span className="font-display text-sm font-bold text-foreground">{t.val}</span>
                <span className="text-[8px] text-silver block">{t.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions - 2x2 Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="glass-card-hover p-4 flex flex-col items-center gap-2"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: action.color }}>
                <action.icon className="w-5 h-5 gold-text" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Impact Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Impact Overview</h3>
        <div className="glass-card p-4 space-y-3">
          {impacts.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 ${i !== impacts.length - 1 ? "pb-3" : ""}`} style={{ borderBottom: i !== impacts.length - 1 ? "1px solid hsl(0 0% 100% / 0.08)" : "none" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.1)" }}>
                <item.icon className="w-4 h-4 gold-text" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-[10px] text-silver">{item.date}</p>
              </div>
              <span className="font-display text-sm font-semibold gold-text">{item.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
