import React, { useState } from 'react';
import { ExternalLink, BookOpen, Check, Copy, ShieldAlert, Award } from 'lucide-react';
import { KnowledgeRecord } from '../types';

interface SourceCardProps {
  source: KnowledgeRecord;
  citationIndex?: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, citationIndex }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const citationText = `[${citationIndex || 1}] ${source.title}. ${source.authority}. Ref: ${source.statutoryRef || source.sourceName}. (${source.lastUpdated})`;
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOfficial = source.sourceType === 'OFFICIAL SOURCE';

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-all flex flex-col justify-between group">
      <div>
        {/* Header with Source Badge & Citation Number */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {citationIndex !== undefined && (
              <span className="w-5 h-5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center justify-center font-mono font-bold text-[11px]">
                {citationIndex}
              </span>
            )}
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wide border ${
                isOfficial
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700'
                  : 'bg-amber-950/80 text-amber-300 border-amber-700'
              }`}
            >
              {isOfficial ? 'Official Source' : 'Demo Knowledge'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono">
              {source.jurisdiction}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="p-1 text-stone-400 hover:text-amber-300 rounded transition-colors"
            title="Copy Citation"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Title */}
        <h4 className="text-xs font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
          {source.title}
        </h4>

        {/* Authority & Statutory Ref */}
        <p className="text-[11px] text-amber-400/90 font-medium mb-1">
          {source.authority}
        </p>
        {source.statutoryRef && (
          <p className="text-[10px] font-mono text-emerald-400 mb-2">
            § {source.statutoryRef}
          </p>
        )}

        {/* Content Snippet */}
        <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
          {source.content}
        </p>

        {source.keyRule && (
          <div className="bg-stone-950 p-2 rounded-lg border border-stone-800 text-[10px] text-amber-200/90 mb-3">
            <span className="font-bold text-amber-400">Core Provision: </span>
            {source.keyRule}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
        <span className="truncate max-w-[170px]" title={source.sourceName}>
          {source.sourceName}
        </span>
        <a
          href={source.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
