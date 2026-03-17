import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Trophy, Heart } from "lucide-react";
import GenerativeMountainScene from "./GenerativeMountainScene";

const slides = [
  {
    icon: GraduationCap,
    badge: "Education First",
    title: "R1/DAY",
    subtitle: "Can Change a Life",
    description: "Just R1 a day funds education for those who need it most. Join thousands making a difference.",
    highlight: "R30/month changes everything",
  },
  {
    icon: Trophy,
    badge: "Win Big",
    title: "R2,000",
    subtitle: "Monthly Prize Draw",
    description: "Every contribution enters you into our appreciation draw. Give back and get rewarded.",
    highlight: "Next draw in 4 days",
  },
  {
    icon: Heart,
    badge: "Your Impact",
    title: "12,400+",
    subtitle: "Students Funded",
    description: "Our community has funded thousands of students across South Africa. You can be part of the story.",
    highlight: "98% completion rate",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else onComplete();
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background overflow-hidden">
      <GenerativeMountainScene />
      {/* Gold ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 blur-[100px]" style={{ background: "hsl(47, 91%, 52%)" }} />

      {/* Brand Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-10"
      >
        <img src="/edu-liberty-hub/logo.png" alt="Edu Liberty" className="h-10 w-auto object-contain" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center px-8 w-full max-w-sm"
        >
          {/* Glass card */}
          <div className="glass-card gold-border p-8 w-full text-center mb-8 shimmer">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
              <Icon className="w-7 h-7 gold-text" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium tracking-widest uppercase gold-text">{slide.badge}</span>
            <h1 className="font-display text-5xl font-bold mt-3 gradient-gold">{slide.title}</h1>
            <p className="font-display text-lg font-semibold mt-1 text-foreground">{slide.subtitle}</p>
            <p className="text-sm text-silver mt-4 leading-relaxed">{slide.description}</p>
            <div className="mt-5 glass-card px-4 py-2 inline-block">
              <span className="text-xs font-medium gold-text">{slide.highlight}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i === current ? "hsl(47, 91%, 52%)" : "hsl(0 0% 100% / 0.2)",
              width: i === current ? "24px" : "10px",
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <button onClick={next} className="btn-gold w-72 text-center text-sm font-bold tracking-wide">
        {current === slides.length - 1 ? "Get Started" : "Continue"}
      </button>

      <button onClick={onComplete} className="mt-4 text-xs text-silver transition-colors" style={{ fontFamily: "var(--font-body)" }}>
        Skip
      </button>
    </div>
  );
};

export default Onboarding;
