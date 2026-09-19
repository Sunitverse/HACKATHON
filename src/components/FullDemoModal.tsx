import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  Globe2,
  CheckSquare
} from 'lucide-react';
import { FULL_DEMO_QUERY } from '../data/demoCases';
import { TabId } from './Sidebar';
import { Jurisdiction } from '../types';

interface FullDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDemo: (tab: TabId) => void;
}

export const FullDemoModal: React.FC<FullDemoModalProps> = ({
  isOpen,
  onClose,
  onCompleteDemo
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const demoSteps = [
    { num: 1, title: 'Understanding query', detail: 'Deconstructed novel extraction process + Indian medicinal plant + dual commercialisation intent' },
    { num: 2, title: 'Detecting jurisdiction', detail: 'Primary: INDIA (Patents Act / BDA) → Target export: INTERNATIONAL (WIPO GRATK / PCT / Madrid)' },
    { num: 3, title: 'Classifying product/innovation', detail: 'Result: Phytopharmaceutical / Novel Botanical Extract (Non-Shastric technical innovation)' },
    { num: 4, title: 'Identifying IP domains', detail: 'Process Patent (Section 3(d)/3(e)), Trademark Class 5, Packaging Industrial Design' },
    { num: 5, title: 'Checking Traditional Knowledge', detail: 'TKDL Screen: Baseline formulation documented; Extraction parameters require non-obvious synergy proof' },
    { num: 6, title: 'Screening ABS considerations', detail: 'CRITICAL FLAG: Section 6 Biological Diversity Act requires NBA Form III approval BEFORE patent filing' },
    { num: 7, title: 'Retrieving sources', detail: 'Retrieved 6 statutory records from Indian Patent Office, NBA Chennai, and WIPO Geneva corpus' },
    { num: 8, title: 'Generating grounded response', detail: 'Synthesized plain-language guidance with anti-hallucination statutory grounding' },
    { num: 9, title: 'Attaching citations', detail: 'Attached 3 verified gazette citations (§ 3(p) Patents Act, § 6 BDA, WIPO GRATK Treaty)' },
    { num: 10, title: 'Generating compliance checklist', detail: 'Populated 10-point actionable audit items (Prior Art, NBA Form III, NABL CoA, Rule 158-B)' },
    { num: 11, title: 'Showing international pathway', detail: 'Generated PCT priority timeline (12-month window) & target country botanical classifications' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
      setIsDone(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current <= demoSteps.length) {
        setActiveStep(current);
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-emerald-950 px-5 py-4 border-b border-emerald-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/40">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-100 font-serif">
                Full End-to-End AI Workflow Execution
              </h3>
              <p className="text-[11px] text-emerald-300">
                Live simulation of 11-step structured reasoning pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Query Banner */}
        <div className="bg-stone-950 px-5 py-3 border-b border-stone-800 text-xs">
          <span className="font-mono text-amber-400 font-bold uppercase block text-[10px] mb-1">
            Input Query:
          </span>
          <p className="text-stone-200 italic font-serif">
            "{FULL_DEMO_QUERY}"
          </p>
        </div>

        {/* Animated Steps Container */}
        <div className="p-5 max-h-[420px] overflow-y-auto space-y-2 text-xs">
          {demoSteps.map((step, idx) => {
            const isCompleted = activeStep > idx;
            const isCurrent = activeStep === idx + 1;

            return (
              <div
                key={step.num}
                className={`p-2.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/50 text-stone-100 shadow-sm'
                    : isCompleted
                    ? 'bg-stone-950/80 border-emerald-800/60 text-stone-200'
                    : 'bg-stone-950/30 border-stone-800/60 text-stone-600 opacity-60'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCurrent ? (
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-stone-700 flex items-center justify-center text-[10px] text-stone-500 font-mono">
                      {step.num}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold uppercase tracking-wider text-[10px] font-mono text-stone-400">
                      STEP {step.num}: {step.title}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-mono text-emerald-400">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-300 leading-snug">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-5 py-3.5 border-t border-stone-800 flex items-center justify-between">
          <div className="text-[11px] text-stone-400 font-mono">
            {isDone ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All 11 Stages Successfully Synthesized
              </span>
            ) : (
              <span>Executing step {activeStep} of 11...</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-stone-400 hover:text-white text-xs transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                onClose();
                onCompleteDemo('assistant');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-emerald-950 font-bold text-xs hover:opacity-90 transition-all shadow"
            >
              <span>Explore AI Guidance & Sources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
