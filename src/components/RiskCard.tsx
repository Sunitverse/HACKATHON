import React from 'react';
import { AlertTriangle, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { RiskProfile } from '../types';

interface RiskCardProps {
  risks: RiskProfile;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risks }) => {
  const getBadge = (level: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (level) {
      case 'HIGH':
        return 'bg-rose-950/80 text-rose-300 border-rose-700 font-bold';
      case 'MEDIUM':
        return 'bg-amber-950/80 text-amber-300 border-amber-700 font-semibold';
      case 'LOW':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700 font-semibold';
    }
  };

  const riskCategories = [
    { label: 'Patentability Risk', key: 'patentability', val: risks.patentability, note: 'Sec 3(p) & prior art bar' },
    { label: 'Traditional Knowledge Risk', key: 'tk', val: risks.traditionalKnowledge, note: 'TKDL overlap potential' },
    { label: 'ABS & Biodiversity Risk', key: 'abs', val: risks.abs, note: 'NBA Section 6 Form III status' },
    { label: 'Regulatory ASU Risk', key: 'reg', val: risks.regulatory, note: 'Rule 158-B vs Schedule I' },
    { label: 'Jurisdiction Mismatch Risk', key: 'jur', val: risks.jurisdiction, note: 'India vs Export divergence' },
    { label: 'Citation Quality Score', key: 'cit', val: risks.citationConfidence, note: 'Grounded against official gazettes' }
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono">
            Potential Statutory Risk Indicators
          </h3>
        </div>
        <span className="text-[10px] text-stone-400 font-mono">
          Screening indicators • Not definitive legal findings
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {riskCategories.map(cat => (
          <div key={cat.key} className="bg-stone-950/90 border border-stone-800/80 rounded-lg p-2.5 flex flex-col justify-between">
            <span className="text-[11px] text-stone-300 font-medium mb-1 truncate">
              {cat.label}
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${getBadge(cat.val as any)}`}>
                {cat.val}
              </span>
              <span className="text-[9px] text-stone-500 truncate max-w-[90px]" title={cat.note}>
                {cat.note}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
