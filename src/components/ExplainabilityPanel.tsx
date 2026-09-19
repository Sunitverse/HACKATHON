import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Compass, HelpCircle, Layers } from 'lucide-react';
import { RAGResponse } from '../types';

interface ExplainabilityPanelProps {
  response: RAGResponse;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ response }) => {
  const [isOpen, setIsOpen] = useState(false);
  const exp = response.explainability;

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-stone-900 hover:bg-stone-850 flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-stone-200 font-mono uppercase tracking-wider">
            Why am I seeing this answer? (Explainability & Grounding)
          </span>
        </div>
        <div className="flex items-center gap-2 text-stone-400 text-xs">
          <span className="font-mono text-[11px] text-amber-400">
            {exp.sourcesUsed} Sources Used
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-stone-800 bg-stone-950/90 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Query Interpretation
              </span>
              <p className="text-stone-200 leading-snug">
                {exp.queryInterpretation}
              </p>
            </div>

            <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Active Legal Regime & Routing
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[11px] border border-emerald-800">
                  {exp.jurisdiction}
                </span>
                <span className="text-stone-400 text-[11px]">
                  {exp.jurisdiction === 'INDIA' ? 'National Laws & Treaties' : 'WIPO, PCT & Global Treaties'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Detected Domains
              </span>
              <div className="flex flex-wrap gap-1">
                {exp.detectedDomains.map((d, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-stone-800 text-amber-300 font-mono text-[10px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Retrieval Filtering
              </span>
              <p className="text-stone-300 font-mono text-[11px]">
                {exp.sourcesRetrieved} retrieved → {exp.sourcesUsed} passed threshold
              </p>
            </div>

            <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Relevance Model
              </span>
              <p className="text-emerald-400 font-mono text-[11px]">
                {exp.relevanceThreshold}
              </p>
            </div>
          </div>

          <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 text-stone-300 leading-relaxed text-[11px]">
            <span className="font-bold text-amber-400 block mb-1 font-mono text-[10px] uppercase">
              Algorithmic Reasoning Summary:
            </span>
            {exp.reasoning}
          </div>
        </div>
      )}
    </div>
  );
};
