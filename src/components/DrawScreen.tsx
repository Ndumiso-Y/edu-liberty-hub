import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronDown, ChevronUp, Gift, Users, Calendar, Star } from "lucide-react";

const faqItems = [
  {
    q: "How does the Appreciation Draw work?",
    a: "Every R1 you contribute earns you one entry into our monthly prize draw. The more you contribute, the higher your chances. Winners are selected randomly using a verified, transparent system.",
  },
  {
    q: "When are draws held?",
    a: "Draws are held on the last Friday of every month at 6PM SAST. Results are announced live on our community page and winners are notified via email.",
  },
  {
    q: "What are the prizes?",
    a: "Our Grand Prize is R2,000 cash. We also award 5 runner-up prizes of R200 each and 10 bonus prizes of R50 airtime vouchers.",
  },
  {
    q: "How do I claim my winnings?",
    a: "Winners are notified via email and in-app notification. Winnings are deposited directly into your linked bank account within 3 business days.",
  },
];

const pastWinners = [
  { rank: 1, name: "Thabo M.", amount: "R2,000", date: "Feb 2026", entries: 45 },
  { rank: 2, name: "Naledi K.", amount: "R200", date: "Feb 2026", entries: 32 },
  { rank: 3, name: "James P.", amount: "R200", date: "Feb 2026", entries: 28 },
  { rank: 4, name: "Amahle D.", amount: "R200", date: "Jan 2026", entries: 51 },
  { rank: 5, name: "Sipho N.", amount: "R200", date: "Jan 2026", entries: 19 },
];

const DrawScreen = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center gold-glow" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
          <Trophy className="w-8 h-8 gold-text" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">Appreciation Draw</h1>
        <p className="text-silver text-sm mt-1">Give back. Get rewarded.</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: Gift, label: "Total Prizes", value: "R3,500" },
          { icon: Users, label: "Participants", value: "2,340" },
          { icon: Calendar, label: "Next Draw", value: "4 Days" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-3 text-center">
            <stat.icon className="w-4 h-4 gold-text mx-auto mb-1" strokeWidth={1.5} />
            <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-silver">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">How It Works</h3>
        <div className="space-y-2 mb-6">
          {faqItems.map((item, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-foreground pr-4">{item.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 gold-text flex-shrink-0" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="w-4 h-4 text-silver flex-shrink-0" strokeWidth={1.5} />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-sm text-silver leading-relaxed">{item.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Past Winners</h3>
        <div className="space-y-2">
          {pastWinners.map((winner) => (
            <div key={winner.rank} className={`glass-card p-4 flex items-center gap-3 ${winner.rank === 1 ? "gold-border animate-pulse-gold" : ""}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${winner.rank === 1 ? "gold-text" : "text-silver"}`} style={{ background: winner.rank === 1 ? "hsl(47 91% 52% / 0.2)" : "hsl(0 0% 100% / 0.06)" }}>
                {winner.rank === 1 ? <Star className="w-4 h-4" fill="currentColor" /> : `#${winner.rank}`}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{winner.name}</p>
                <p className="text-[10px] text-silver">{winner.date} · {winner.entries} entries</p>
              </div>
              <span className={`font-display text-sm font-bold ${winner.rank === 1 ? "gradient-gold" : "text-silver"}`}>{winner.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DrawScreen;
