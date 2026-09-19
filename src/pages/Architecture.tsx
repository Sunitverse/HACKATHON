import React from 'react';
import {
  Cpu,
  Database,
  ShieldCheck,
  Sparkles,
  GitMerge,
  ArrowDown,
  Layers,
  CheckCircle2,
  Terminal,
  Globe2,
  BookOpen
} from 'lucide-react';

export const Architecture: React.FC = () => {
  const pipelineSteps = [
    { num: '01', title: 'Client & Multi-Modal Input', desc: 'React 18 TypeScript web client + document intake parser. Accepts natural language queries and R&D proposal PDFs.' },
    { num: '02', title: 'Query Deconstruction & Intent Classifier', desc: 'Identifies core innovation type, chemical markers, formulation classes, and commercial intent (Research vs Domestic Sale vs Export).' },
    { num: '03', title: 'Jurisdiction Router (Strict Separation)', desc: 'Routes query deterministically to either Indian statutory corpus (Patents Act 1970, BDA 2002, DCA 1940) or International corpus (WIPO GRATK, PCT, Madrid, Nagoya Protocol).' },
    { num: '04', title: 'Semantic Retrieval & Metadata Filter', desc: 'Filters statutory records by legal domain (Patents, TK, ABS, ASU Regulatory, Trademarks) to eliminate cross-domain hallucination.' },
    { num: '05', title: 'BM25 + Semantic Cross-Encoder Re-ranking', desc: 'Scores retrieved statutory sections by relevance and recency (prioritizing 2023 Biodiversity Amendment & 2024 WIPO GRATK Treaty).' },
    { num: '06', title: 'Grounding & Strict Anti-Hallucination Guardrail', desc: 'Server-side Gemini 2.5 Flash synthesis constrained exclusively to retrieved statutory texts with mandatory why-it-matters and concern sections.' },
    { num: '07', title: 'Automated Citation Audit & Risk Profiler', desc: 'Verifies every cited section against the statutory gazette index; flags Section 3(p) TK risk, Section 6 NBA risk, and Rule 158-B risk.' },
    { num: '08', title: 'Multi-Modal Explainable Output', desc: 'Generates plain-language guidance, compliance checklist, risk severity indicators, verifiable source badges, and human facilitator escalation path.' }
  ];

  const roadmapItems = [
    { title: 'Vector Database Migration', desc: 'Transitioning from in-memory statutory embeddings to high-throughput Qdrant / FAISS vector stores with hybrid HNSW indexing.' },
    { title: 'Neo4j Ayurvedic Knowledge Graph', desc: 'Building ontological graph relations linking 500+ classical Sanskrit herb names (Dravyaguna Vijnana) to botanical Latin binomials and modern chromatographic biomarkers.' },
    { title: 'Bhashini AI Language Integration', desc: 'Deep voice-to-text and multi-dialect translation for 12 Indian languages to support rural vaidyas, MSME cooperatives, and tribal conservers.' },
    { title: 'Automated InPASS & IP India Webhook', desc: 'Live bi-directional integration with the Indian Patent Office and Trademark Registry for real-time status tracking and pre-grant opposition alerts.' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>System Architecture & Technical Specifications</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          How IP-SAKTI Works: The 8-Stage RAG Pipeline
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          A transparent, deterministic architecture engineered specifically to eliminate hallucinations in complex legal and regulatory Ayurvedic domains.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-800">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
            End-to-End Processing Architecture Flow
          </h3>
          <span className="text-[10px] text-stone-500 font-mono">
            Smart India Hackathon 2026 • Problem SIH26045
          </span>
        </div>

        {/* Architecture Pipeline Cards */}
        <div className="space-y-3">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.num}
              className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-emerald-700/60 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                  {step.num}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block text-right flex-shrink-0">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                  {idx === 2 ? 'Regime Isolation' : idx === 5 ? 'Gemini 2.5 Flash' : 'Deterministic'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Five Core Deliverables */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-4 pb-2 border-b border-stone-800">
          Core Diagnostic Deliverables Generated
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <span className="font-bold text-amber-400 block mb-1">01. IP Guidance</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Synthesis of patent, trademark, GI, and trade secret pathways in plain language.
            </p>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <span className="font-bold text-emerald-400 block mb-1">02. Compliance Sheet</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              10-point actionable audit covering NBA Form III, SBB intimation, and Rule 158-B.
            </p>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <span className="font-bold text-rose-400 block mb-1">03. Risk Detection</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Automated high/medium/low severity statutory alerts to prevent costly rejections.
            </p>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <span className="font-bold text-blue-400 block mb-1">04. Source Citations</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Verifiable links to official gazette notifications and institutional portals.
            </p>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <span className="font-bold text-purple-400 block mb-1">05. Confidence Metric</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Transparent reasoning score with human expert escalation if below confidence threshold.
            </p>
          </div>
        </div>
      </div>

      {/* Production Roadmap Transparency */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-4 pb-2 border-b border-stone-800">
          Production Deployment Roadmap (Post-Hackathon Scaling)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmapItems.map((road, idx) => (
            <div key={idx} className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <h4 className="text-xs font-bold text-stone-100">{road.title}</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {road.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
