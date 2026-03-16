import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-15 blur-[80px]" style={{ background: "hsl(47, 91%, 52%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold">
            <span className="gradient-gold">Edu</span> <span className="text-foreground">Liberty</span>
          </h1>
          <p className="text-silver text-sm mt-2">Education changes everything</p>
        </div>

        {/* Toggle */}
        <div className="glass-card p-1 flex mb-8">
          <button
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${!isSignup ? "btn-gold" : "text-silver"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isSignup ? "btn-gold" : "text-silver"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" strokeWidth={1.5} />
                <input
                  className="input-aura w-full pl-11"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </motion.div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" strokeWidth={1.5} />
            <input
              className="input-aura w-full pl-11"
              placeholder="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" strokeWidth={1.5} />
            <input
              className="input-aura w-full pl-11 pr-11"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff className="w-4 h-4 text-silver" strokeWidth={1.5} /> : <Eye className="w-4 h-4 text-silver" strokeWidth={1.5} /> }
            </button>
          </div>

          {!isSignup && (
            <div className="text-right">
              <button type="button" className="text-xs gold-text">Forgot Password?</button>
            </div>
          )}

          <button type="submit" className="btn-gold w-full text-sm font-bold tracking-wide mt-2">
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-silver mt-8">
          By continuing, you agree to our <span className="gold-text">Terms</span> & <span className="gold-text">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
