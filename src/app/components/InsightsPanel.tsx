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

export function InsightsPanel({ insights }: Props) {
  return (
    <div className="ds-card ds-card--elevated" style={{ marginBottom: "2rem" }}>
      <div className="ds-card__container">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="ds-icon ds-icon--sm text-coral" />
          <h2 className="text-base font-semibold" style={{ color: "var(--ds-content-default)" }}>Insights Inteligentes</h2>
          <span className="ds-badge ds-badge--neutral ds-badge--subtle" style={{ marginLeft: "auto" }}>
            Actualizado agora
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((insight, i) => {
            const { icon: Icon } = iconMap[insight.type];
            return (
              <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "var(--ds-background-subtle)" }}>
                <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "9999px", background: "var(--ds-surface-default)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon className="ds-icon ds-icon--sm text-coral" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--ds-content-default)" }}>{insight.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ds-content-subtle)" }}>{insight.description}</p>
                  {insight.action && (
                    <button className="ds-button ds-button--ghost ds-button--sm" style={{ marginTop: "0.5rem", padding: 0, height: "auto" }}>
                      <span className="ds-button__label" style={{ color: "var(--ds-primary-content-default)" }}>{insight.action}</span>
                      <ArrowRight className="ds-icon ds-icon--sm" style={{ color: "var(--ds-primary-content-default)" }} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
