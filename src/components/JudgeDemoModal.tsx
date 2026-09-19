import React, { useState } from 'react';
import {
  X,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Play,
  FileCheck,
  ShieldAlert,
  Globe2,
  Users
} from 'lucide-react';
import { TabId } from './Sidebar';
import { Jurisdiction } from '../types';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: TabId) => void;
  onSetJurisdiction?: (j: Jurisdiction) => void;
  onRunQuery?: (query: string, jur: Jurisdiction) => void;
  onSelectCase?: (query: string, jur: Jurisdiction) => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab = () => {},
  onSetJurisdiction = () => {},
  onRunQuery,
  onSelectCase
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const triggerQuery = onSelectCase || onRunQuery || (() => {});

  if (!isOpen) return null;

  const steps = [
    {
      number: 1,
      title: "Problem Statement (SIH26045)",
      headline: "The Innovation-to-IP Gap in Ayurveda",
      desc: "Ayurveda innovators frequently face patent rejections under Section 3(p) (Traditional Knowledge exclusion) or penal violations under Section 6 of the Biological Diversity Act for failing to seek National Biodiversity Authority (NBA) approval. Traditional generic chatbots hallucinate legal outcomes and fail to separate domestic rules from international treaties like WIPO GRATK and EU THMPD.",
      tabTarget: 'dashboard' as TabId,
      actionLabel: "View Dashboard Overview",
      action: () => onNavigateToTab('dashboard')
    },
    {
      number: 2,
      title: "Product Input & Intent",
      headline: "From Vague Idea to Structured Intake",
      desc: "Instead of open-ended conversational fluff, IP-SAKTI starts with structured intake. The user inputs their technical idea or formulation parameters to trigger parallel classification, statutory retrieval, and compliance screening.",
      tabTarget: 'assistant' as TabId,
      actionLabel: "Test Input in AI Assistant",
      action: () => {
        onNavigateToTab('assistant');
        onSetJurisdiction('INDIA');
      }
    },
    {
      number: 3,
      title: "Smart Product Classification",
      headline: "Classical vs. Proprietary vs. Phytopharmaceutical",
      desc: "The system runs a 6-step wizard mapping the formulation against First Schedule Samhitas under the Drugs and Cosmetics Act 1940, FSSAI Ayurveda-Aahar regulations 2022, or CDSCO New Drugs Rules. This prevents costly misclassification.",
      tabTarget: 'classification' as TabId,
      actionLabel: "Launch Classification Wizard",
      action: () => onNavigateToTab('classification')
    },
    {
      number: 4,
      title: "IP Protection Mapping",
      headline: "Multi-layered Asset Architecture",
      desc: "Patents are only one piece of the puzzle. The visual IP Protection Map routes the innovation to Patents (process vs product), Trademarks (Class 5 avoiding botanical name bans), Industrial Designs (applicators/bottles), and Trade Secrets.",
      tabTarget: 'ip_protection' as TabId,
      actionLabel: "Explore IP Protection Map",
      action: () => onNavigateToTab('ip_protection')
    },
    {
      number: 5,
      title: "ABS & Biodiversity Screening",
      headline: "Mandatory Section 6 NBA Prior Clearance",
      desc: "Any biological resource procured from Indian forests or biological diversity triggers the Biological Diversity Act 2002. IP-SAKTI screens NBA Form III requirements before the user mistakenly applies for patent rights, averting statutory disqualification.",
      tabTarget: 'abs' as TabId,
      actionLabel: "Run ABS Compliance Screening",
      action: () => onNavigateToTab('abs')
    },
    {
      number: 6,
      title: "Deterministic RAG Retrieval Pipeline",
      headline: "Transparent 8-Stage Reasoning",
      desc: "Experience the visible pipeline: Query Understanding → Jurisdiction Routing → Domain Classification → Metadata Filtering → Semantic Retrieval → Re-ranking → LLM Grounding → Anti-Hallucination Citation Audit. Never a black-box answer.",
      tabTarget: 'assistant' as TabId,
      actionLabel: "Run RAG Pipeline Query",
      action: () => {
        onNavigateToTab('assistant');
        triggerQuery("I developed a novel herbal extraction process for an Ayurvedic formulation using an Indian medicinal plant.", 'INDIA');
        onClose();
      }
    },
    {
      number: 7,
      title: "Official Source Citations",
      headline: "Grounding in 22+ Verified Statutory Acts",
      desc: "Every answer cites exact statutory provisions: Patents Act 1970 § 3(p), Biological Diversity Act 2002 § 6, Drugs & Cosmetics Act Chapter IV-A, and WIPO treaties. Clearly differentiates verified official gazettes from demo simulations.",
      tabTarget: 'sources' as TabId,
      actionLabel: "Inspect Knowledge Repository",
      action: () => onNavigateToTab('sources')
    },
    {
      number: 8,
      title: "Strict International Jurisdiction Separation",
      headline: "Seamless Toggle to Global & WIPO Framework",
      desc: "Switching from 🇮🇳 INDIA to 🌍 INTERNATIONAL instantly re-routes retrieval to WIPO GRATK Treaty (2024), Madrid System, PCT, Nagoya Protocol, and EU THMPD (Directive 2004/24/EC). Zero regulatory cross-contamination.",
      tabTarget: 'international' as TabId,
      actionLabel: "Switch to International Navigator",
      action: () => {
        onSetJurisdiction('INTERNATIONAL');
        onNavigateToTab('international');
      }
    },
    {
      number: 9,
      title: "Compliance Checklist & Risk Indicators",
      headline: "Actionable Operational Verification",
      desc: "Interactive 10-point checklist allows researchers to track progress from Prior-Art Search to NBA Form III lodging and NABL laboratory stability testing, supported by dynamic statutory risk indicators.",
      tabTarget: 'checklist' as TabId,
      actionLabel: "Open Compliance Checklist",
      action: () => onNavigateToTab('checklist')
    },
    {
      number: 10,
      title: "Human Escalation (Ayush IP Facilitator)",
      headline: "Connecting Code to Certified Legal Facilitators",
      desc: "AI never replaces legal counsel. IP-SAKTI includes direct routing to Ayush IP Cells (TIFAC / Ministry of Ayush accredited patent facilitators) for complex statutory filings and formal patent prosecution.",
      tabTarget: 'requests' as TabId,
      actionLabel: "View Facilitator Escalation Hub",
      action: () => onNavigateToTab('requests')
    }
  ];

  const current = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 px-5 py-4 border-b border-stone-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/40">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-stone-100 font-serif">
                  Judge Demo Mode • Smart India Hackathon
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                SIH26045 Evaluation: Guided 3-minute architectural walkthrough
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-950 h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-stone-200">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{current.title}</span>
          </div>

          <h2 className="text-lg font-bold text-stone-100 font-serif">
            {current.headline}
          </h2>

          <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/70 p-4 rounded-xl border border-stone-800">
            {current.desc}
          </p>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                current.action();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-emerald-700/60 text-xs font-semibold shadow transition-all"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] text-stone-500 font-mono">
              Live Interactive Prototype
            </span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-stone-950 px-5 py-3.5 border-t border-stone-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentStep ? 'w-5 bg-amber-400' : 'bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => {
                onClose();
                onNavigateToTab('assistant');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-600 text-stone-950 font-bold text-xs hover:opacity-90 transition-all shadow"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Finish Demo: From Question → Evidence → Action</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
