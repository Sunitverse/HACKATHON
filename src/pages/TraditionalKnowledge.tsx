import React, { useState } from 'react';
import { Leaf, Search, Shield, AlertTriangle, BookOpen, ExternalLink, CheckCircle2, RotateCcw } from 'lucide-react';
import { TabId } from '../components/Sidebar';

interface TraditionalKnowledgeProps {
  onNavigate: (tab: TabId) => void;
}

export const TraditionalKnowledge: React.FC<TraditionalKnowledgeProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('Ashwagandha formulation');
  const [hasSearched, setHasSearched] = useState(true);

  const sampleSearches = [
    { label: 'Ashwagandha formulation', query: 'Ashwagandha root extract for stress and vitality' },
    { label: 'Turmeric wound healing', query: 'Curcuma longa rhizome topical paste for wound healing' },
    { label: 'Triphala digestive formula', query: 'Triphala classical churna with Emblica, Terminalia chebula, Terminalia bellirica' },
    { label: 'Curcumin bio-enhancement', query: 'Curcumin combined with Piperine (black pepper) for enhanced bioavailability' },
    { label: 'Brahmi cognitive extract', query: 'Bacopa monnieri standardized bacoside extract for cognitive memory enhancement' }
  ];

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setHasSearched(true);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
          <Leaf className="w-3.5 h-3.5" />
          <span>Traditional Knowledge Digital Library (TKDL) Screening</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          Traditional Knowledge & Prior Art Screening
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          Screen formulations, herbs, and Ayurvedic practices against documented ancient treatises and TKDL prior art to avert Section 3(p) objections.
        </p>

        {/* Search Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search formulation, plant, ingredient or Ayurvedic practice (e.g., Ashwagandha formulation)..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Prior Art</span>
          </button>
        </div>

        {/* Quick Sample Queries */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono text-stone-500 uppercase mr-1">Pre-loaded Samples:</span>
          {sampleSearches.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(s.query)}
              className="px-2 py-0.5 rounded-md bg-stone-950 hover:bg-stone-800 border border-stone-800 text-[11px] text-stone-300 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
            {/* Demo Header Notice */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  TRADITIONAL KNOWLEDGE SCREENING
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-mono border border-amber-700 font-bold">
                  DEMO RESULT
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500">
                Simulation Model • Not a Live CSIR TKDL Search
              </span>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                  Potential TK Relevance:
                </span>
                <span className="text-rose-400 font-bold font-mono text-sm">
                  HIGH RELEVANCE
                </span>
                <p className="text-[11px] text-stone-400 mt-1">
                  Documented in classical Samhitas (Charaka Samhita & Bhavaprakasha).
                </p>
              </div>

              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                  Section 3(p) Patent Concern:
                </span>
                <span className="text-amber-400 font-bold font-mono text-sm">
                  High Risk of Direct Rejection
                </span>
                <p className="text-[11px] text-stone-400 mt-1">
                  Formulation composition matches documented traditional use.
                </p>
              </div>

              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                  Recommended Strategy:
                </span>
                <span className="text-emerald-400 font-bold font-mono text-sm">
                  Process Patent or Brand
                </span>
                <p className="text-[11px] text-stone-400 mt-1">
                  Focus on proprietary extraction metrics and Class 5 trademark.
                </p>
              </div>
            </div>

            {/* Classical Treatises Identified in Corpus */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3 mb-5">
              <h4 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider">
                Simulated Classical Literature Citations (Prior Art References)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-200 mb-1">
                    <span>Charaka Samhita, Chikitsasthanam (Rasayana Adhyaya)</span>
                    <span className="font-mono text-amber-400">Verse 1.2.14-16</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Documents traditional processing of Withania somnifera (Ashwagandha) with milk and clarified butter for Balya (strength) and Rasayana (rejuvenation) indications.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-200 mb-1">
                    <span>Ayurvedic Pharmacopoeia of India (API), Part I, Vol. I</span>
                    <span className="font-mono text-emerald-400">Monograph #08</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Defines official pharmacopoeial quality standards, TLC fingerprinting, withanolide marker percentages, and permissible limits.
                  </p>
                </div>
              </div>
            </div>

            {/* Patentability Concern Detail */}
            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed mb-4">
              <span className="font-bold text-amber-400 block mb-1 font-mono uppercase text-[10px]">
                Patent Examiner Analysis (Simulated):
              </span>
              Under Section 3(p) of the Patents Act 1970, an invention which is traditional knowledge or an aggregation of known properties is barred from grant. If your patent specification only claims the therapeutic use of Ashwagandha for stress or vitality, an examiner will cite TKDL references and issue a Section 3(p) objection. To overcome this, your claims must be restricted to an unconventional extraction technique (e.g., subcritical water extraction) yielding a statistically validated improvement in withanolide stability.
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => onNavigate('assistant')}
                className="text-xs text-amber-400 hover:underline font-mono"
              >
                Ask Assistant about overcoming Section 3(p) objections →
              </button>

              <button
                onClick={() => onNavigate('abs')}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold transition-colors"
              >
                Proceed to ABS Biodiversity Screening
              </button>
            </div>
          </div>

          {/* Strict Anti-Fabrication Notice */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              Ethical & Legal Guardrail: This is a DEMO RESULT for hackathon demonstration. IP-SAKTI Sahayak never fabricates actual confidential TKDL database records. Formal TKDL prior-art access is strictly regulated by CSIR and accessible by certified patent examiners under bilateral international agreements.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
