import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import AuthScreen from "@/components/AuthScreen";
import Dashboard from "@/components/Dashboard";
import DrawScreen from "@/components/DrawScreen";
import CommunityScreen from "@/components/CommunityScreen";
import ProfileScreen from "@/components/ProfileScreen";
import BottomNav from "@/components/BottomNav";
import ChatBot from "@/components/ChatBot";

type AppState = "onboarding" | "auth" | "app";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [activeTab, setActiveTab] = useState("dashboard");

  if (appState === "onboarding") {
    return <Onboarding onComplete={() => setAppState("auth")} />;
  }

  if (appState === "auth") {
    return <AuthScreen onLogin={() => setAppState("app")} />;
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.07] blur-[120px] pointer-events-none" style={{ background: "hsl(47, 91%, 52%)" }} />

      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "community" && <CommunityScreen />}
      {activeTab === "profile" && <ProfileScreen onLogout={() => setAppState("auth")} />}
      {activeTab === "draw" && <DrawScreen />}

      <ChatBot />
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
