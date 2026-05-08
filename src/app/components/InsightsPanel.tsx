import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

interface Insight {
  type: "up" | "down" | "alert" | "tip";
  title: string;
  description: string;
  action?: string;
}

interface Props {
  insights: Insight[];
}

const iconMap = {
  up:    { icon: TrendingUp    },
  down:  { icon: TrendingDown  },
  alert: { icon: AlertTriangle },
  tip:   { icon: Lightbulb     },
};

const panel: React.CSSProperties = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const insightCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

export function InsightsPanel({ insights }: Props) {
  return (
    <div className="rounded-2xl p-6 mb-8 shadow-sm" style={panel}>
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <h2 className="text-base font-semibold text-gray-800">Insights Inteligentes</h2>
        <span className="ml-auto text-xs text-gray-400 bg-white/50 px-2 py-1 rounded-full">
          Actualizado agora
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight, i) => {
          const { icon: Icon } = iconMap[insight.type];
          return (
            <div key={i} className="flex gap-3 p-4 rounded-xl" style={insightCard}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-white/70 shadow-sm">
                <Icon className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{insight.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{insight.description}</p>
                {insight.action && (
                  <button className="mt-2 text-xs font-medium flex items-center gap-1 text-orange-500 hover:underline">
                    {insight.action}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
