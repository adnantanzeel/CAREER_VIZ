import { Sparkles } from "lucide-react";

const Logo = ({ size = "md", showText = true }) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 48, text: "text-4xl" },
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-50" />
        <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 p-2 rounded-xl border border-primary/30">
          <Sparkles
            size={sizes[size].icon}
            className="text-primary"
            strokeWidth={2}
          />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold ${sizes[size].text} neon-text`}>
            CareerViz
          </span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Visualize Your Future
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

