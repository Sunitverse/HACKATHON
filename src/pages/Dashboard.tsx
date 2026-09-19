import React from 'react';
import {
  FlaskConical,
  Lightbulb,
  Sprout,
  Bot,
  ArrowRight,
  Shield,
  BookOpen,
  CheckCircle2,
  Globe2,
  AlertTriangle,
  FileText,
  Play,
  Cpu,
  Sparkles,
  Search
} from 'lucide-react';
import { TabId } from '../components/Sidebar';
import { Jurisdiction, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DashboardProps {
  onNavigate: (tab: TabId) => void;
  jurisdiction: Jurisdiction;
  onSetJurisdiction: (j: Jurisdiction) => void;
  language: Language;
  onOpenFullDemo: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  jurisdiction,
  onSetJurisdiction,
  language,
  onOpenFullDemo
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero / Value Proposition Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 border border-emerald-800/60 p-6 md:p-8 shadow-xl">
        {/* Subtle Indian geometric/botanical background accent */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400 via-emerald-500 to-transparent"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-semibold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH26045 • SMART INDIA HACKATHON 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-100 tracking-tight leading-tight">
            Welcome to IP-SAKTI Sahayak
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
            Navigate Ayurveda innovation from idea to intellectual property protection and regulatory compliance across national and international regimes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('assistant')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-lg shadow-amber-500/10 transition-all transform active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Assistant</span>
            </button>

            <button
              onClick={onOpenFullDemo}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-emerald-700/80 text-xs font-semibold shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run operation</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-400 font-mono">
              <span>Active Regime:</span>
              <span className={`font-bold ${jurisdiction === 'INDIA' ? 'text-amber-400' : 'text-blue-400'}`}>
                {jurisdiction === 'INDIA' ? '🇮🇳 India (Patents Act & NBA)' : '🌍 Global (WIPO & Treaties)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Four Major Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">
            Core Innovation Workflows
          </h2>
          <span className="text-[11px] text-stone-500 font-mono">
            Ask → Classify → Retrieve → Verify → Act
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Classify */}
          <div
            onClick={() => onNavigate('classification')}
            className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-700/80 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
                🧪 CLASSIFY PRODUCT
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Understand the likely product and regulatory category (Classical, Proprietary, Phytopharmaceutical, or Ayurveda-Aahar).
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Start 6-Step Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Explore IP */}
          <div
            onClick={() => onNavigate('ip_protection')}
            className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-700/80 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
                💡 EXPLORE IP
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Identify potentially relevant IP protection pathways across Patents, Trademarks, Designs, GI, and Trade Secrets.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Open Protection Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Check ABS */}
          <div
            onClick={() => onNavigate('abs')}
            className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-700/80 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
                🌱 CHECK ABS
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Screen potential biological-resource and Access & Benefit Sharing (ABS) mandates under Section 6 of Biological Diversity Act.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Screen NBA Mandates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Ask AI */}
          <div
            onClick={() => onNavigate('assistant')}
            className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-700/80 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
                🤖 ASK AI
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Ask a source-grounded question with transparent retrieval, explainable reasoning, and verifiable statutory citations.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Launch RAG Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Positioning Pillars: UNDERSTAND • PROTECT • COMPLY • GLOBAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
            01 • UNDERSTAND
          </div>
          <h4 className="text-xs font-bold text-stone-100 mb-1">
            Plain Language Synthesis
          </h4>
          <p className="text-[11px] text-stone-400 leading-relaxed">
            Turn complex IP sections and AYUSH gazette notifications into clear, actionable guidance without legal jargon.
          </p>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
            02 • PROTECT
          </div>
          <h4 className="text-xs font-bold text-stone-100 mb-1">
            TK & Patent Harmonization
          </h4>
          <p className="text-[11px] text-stone-400 leading-relaxed">
            Identify patentable technical processes while respecting sovereign Traditional Knowledge (TKDL) and Section 3(p) bars.
          </p>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider mb-1">
            03 • COMPLY
          </div>
          <h4 className="text-xs font-bold text-stone-100 mb-1">
            Pre-Commercialisation Audit
          </h4>
          <p className="text-[11px] text-stone-400 leading-relaxed">
            Surface mandatory National Biodiversity Authority (NBA) approvals and ASU drug licensing before manufacturing.
          </p>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
            04 • GLOBAL
          </div>
          <h4 className="text-xs font-bold text-stone-100 mb-1">
            Strict Regime Separation
          </h4>
          <p className="text-[11px] text-stone-400 leading-relaxed">
            Keep Indian laws (Patents Act, BDA) and international treaties (WIPO GRATK, PCT, Madrid, THMPD) clearly segregated.
          </p>
        </div>
      </div>

      {/* Two Column Section: Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (2 Cols) */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-800">
            <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono">
              Recent Innovation Activity & Audit Cases
            </h3>
            <span className="text-[10px] text-stone-500 font-mono">
              Live Interactive Prototype Log
            </span>
          </div>

          <div className="space-y-3">
            {/* Item 1 */}
            <div
              onClick={() => onNavigate('classification')}
              className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 hover:border-emerald-700/60 transition-all cursor-pointer flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mt-0.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100">
                    Ayurvedic Formulation Classification
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Screened Shastric classical vs. proprietary extract under Rule 158-B.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                Classified: Proprietary
              </span>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => onNavigate('ip_protection')}
              className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 hover:border-amber-700/60 transition-all cursor-pointer flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center mt-0.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100">
                    Patentability Screening (Extraction Process)
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Evaluated Section 3(p) non-obviousness & bio-enhancement chromatographic proof.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-mono border border-amber-800">
                Process Eligible
              </span>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => onNavigate('abs')}
              className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 hover:border-emerald-700/60 transition-all cursor-pointer flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mt-0.5">
                  <Sprout className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100">
                    ABS & Biodiversity Screening (Western Ghats Flora)
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Identified mandatory NBA Form III clearance requirement prior to patent filing.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 font-mono border border-rose-800">
                Action Required
              </span>
            </div>

            {/* Item 4 */}
            <div
              onClick={() => onNavigate('international')}
              className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 hover:border-blue-700/60 transition-all cursor-pointer flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mt-0.5">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100">
                    International Protection Query (EU THMPD & WIPO GRATK)
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Assessed 15-year EU traditional use threshold vs. EFSA Food Supplement path.
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 font-mono border border-blue-800">
                Global Routed
              </span>
            </div>
          </div>
        </div>

        {/* System Status (1 Col) */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-800">
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono">
                System Status
              </h3>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Operational
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">AI Engine:</span>
                  <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    ● Demo Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Knowledge Base:</span>
                  <span className="text-stone-200 font-mono">
                    ● 20+ structured sources
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Jurisdictions:</span>
                  <span className="text-stone-200 font-mono">
                    ● India + International
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Citation Engine:</span>
                  <span className="text-emerald-400 font-mono">
                    ● Enabled (Anti-Hallucination)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Multilingual:</span>
                  <span className="text-amber-400 font-mono">
                    ● English / Hindi / Marathi
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-stone-300">
                <span className="font-bold text-amber-300 block mb-0.5">
                  Smart India Hackathon 2026 Focus:
                </span>
                Demonstrating that Ayurvedic IP protection requires a multi-domain pipeline rather than a generic text generator.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800">
            <button
              onClick={() => onNavigate('architecture')}
              className="w-full py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Technical Architecture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
