import React from 'react';
import { ShieldCheck, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation?: string;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence, explanation }) => {
  const getBadgeConfig = () => {
    switch (confidence) {
      case 'HIGH':
        return {
          bg: 'bg-emerald-950/90 border-emerald-600/80 text-emerald-300',
          dot: 'bg-emerald-400',
          label: 'HIGH RETRIEVAL CONFIDENCE',
          icon: ShieldCheck
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-950/90 border-amber-600/80 text-amber-300',
          dot: 'bg-amber-400',
          label: 'MEDIUM CONFIDENCE (FURTHER DATA HELPFUL)',
          icon: Info
        };
      case 'LOW':
        return {
          bg: 'bg-rose-950/90 border-rose-600/80 text-rose-300',
          dot: 'bg-rose-400',
          label: 'LOW CONFIDENCE (CLARIFICATION REQUIRED)',
          icon: ShieldAlert
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-xl border ${config.bg} shadow-sm`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="font-mono text-xs font-bold tracking-wider">
          {config.label}
        </span>
      </div>
      <p className="text-[11px] leading-relaxed opacity-90">
        {explanation || 'Confidence reflects source retrieval quality, textual grounding, and statutory alignment. It does not represent an official legal or patent office determination.'}
      </p>
    </div>
  );
};
