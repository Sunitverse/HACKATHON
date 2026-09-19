import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Shield,
  Filter,
  CheckCircle2,
  Globe2,
  Building2,
  Calendar
} from 'lucide-react';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';
import { Jurisdiction, KnowledgeRecord, IPDomain } from '../types';

export const Sources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'ALL' | Jurisdiction>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const filteredSources = KNOWLEDGE_BASE.filter(src => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      src.title.toLowerCase().includes(term) ||
      (src.statutoryRef && src.statutoryRef.toLowerCase().includes(term)) ||
      src.authority.toLowerCase().includes(term) ||
      src.content.toLowerCase().includes(term);

    const matchesJurisdiction =
      selectedJurisdiction === 'ALL' || src.jurisdiction === selectedJurisdiction;

    const matchesDomain =
      selectedDomain === 'ALL' || src.domain === selectedDomain;

    return matchesSearch && matchesJurisdiction && matchesDomain;
  });

  const domains = Array.from(new Set(KNOWLEDGE_BASE.map(s => s.domain)));

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Statutory & Regulatory Knowledge Base ({KNOWLEDGE_BASE.length} Official Records)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          Grounded Statutory Corpus & Gazette Library
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          Browse the underlying verified corpus used by the IP-SAKTI RAG engine. Every AI response is deterministically anchored in these statutory provisions to prevent hallucinations.
        </p>

        {/* Search & Filters */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search legal provisions, acts, or keywords..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <select
              value={selectedJurisdiction}
              onChange={e => setSelectedJurisdiction(e.target.value as any)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Regimes (India & International)</option>
              <option value="INDIA">🇮🇳 Indian Domestic Regime (Patents Act & NBA)</option>
              <option value="INTERNATIONAL">🌍 International Regime (WIPO & Treaties)</option>
            </select>
          </div>

          <div>
            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Legal Domains</option>
              {domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-stone-400 font-mono px-1">
        <span>Showing {filteredSources.length} of {KNOWLEDGE_BASE.length} verified statutory records</span>
        <span>Anti-Hallucination Verified</span>
      </div>

      {/* Source Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map(src => (
          <div
            key={src.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-emerald-800/80 transition-all"
          >
            <div>
              {/* Badges Bar */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-800">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    src.jurisdiction === 'INDIA'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {src.jurisdiction === 'INDIA' ? '🇮🇳 INDIA' : '🌍 GLOBAL'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-emerald-400 font-mono border border-stone-800">
                    {src.domain}
                  </span>
                </div>

                <span className="text-[10px] text-stone-500 font-mono">
                  {src.version}
                </span>
              </div>

              {/* Title & Ref */}
              <h3 className="text-sm font-bold text-stone-100 font-serif mb-1">
                {src.title}
              </h3>
              <div className="text-[11px] font-mono text-amber-400 font-semibold mb-2">
                {src.statutoryRef}
              </div>

              {/* Summary / Content */}
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                {src.content}
              </p>
            </div>

            {/* Footer / Meta */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
              <div className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-stone-500" />
                <span>{src.authority}</span>
              </div>

              <a
                href={src.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
