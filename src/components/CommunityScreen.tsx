import { motion } from "framer-motion";
import { Users, MessageSquare, TrendingUp, Heart, Share2 } from "lucide-react";

const posts = [
  { user: "Thabo M.", time: "2h ago", content: "Just made my 30th contribution! Feeling great about supporting education in our community. 🎓", likes: 24, comments: 5 },
  { user: "Naledi K.", time: "5h ago", content: "Won R200 in last month's draw! The best part is knowing my contributions fund real students. 💛", likes: 42, comments: 12 },
  { user: "Amahle D.", time: "1d ago", content: "Visited one of the schools our community funds. The kids were so grateful. This movement is real! 🏫", likes: 67, comments: 18 },
];

const CommunityScreen = () => {
  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-6 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-xl font-bold text-foreground">Community</h1>
        <p className="text-silver text-sm">Connect with fellow members</p>
      </motion.div>

      {/* Stats bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 flex justify-around my-5">
        {[
          { icon: Users, value: "2,340", label: "Members" },
          { icon: TrendingUp, value: "R45K", label: "This Month" },
          { icon: Heart, value: "12.4K", label: "Students" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon className="w-4 h-4 gold-text mx-auto mb-1" strokeWidth={1.5} />
            <p className="font-display text-sm font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-silver">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Posts */}
      <div className="space-y-3">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
                <span className="font-display text-xs font-bold gold-text">{post.user[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.user}</p>
                <p className="text-[10px] text-silver">{post.time}</p>
              </div>
            </div>
            <p className="text-sm text-silver leading-relaxed mb-3">{post.content}</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-[11px] text-silver">
                <Heart className="w-3.5 h-3.5" strokeWidth={1.5} /> {post.likes}
              </button>
              <button className="flex items-center gap-1 text-[11px] text-silver">
                <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} /> {post.comments}
              </button>
              <button className="flex items-center gap-1 text-[11px] text-silver ml-auto">
                <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityScreen;
