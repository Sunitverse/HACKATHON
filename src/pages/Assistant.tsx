import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  Compass,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  FileText,
  Shield,
  ArrowRight,
  Play
} from 'lucide-react';
import { Jurisdiction, Language, PipelineStage, RAGResponse } from '../types';
import { AIService } from '../services/aiService';
import { INITIAL_PIPELINE_STAGES } from '../services/ragService';
import { SourceCard } from '../components/SourceCard';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { RiskCard } from '../components/RiskCard';
import { ExplainabilityPanel } from '../components/ExplainabilityPanel';
import { RetrievalPipeline } from '../components/RetrievalPipeline';
import { TRANSLATIONS } from '../data/translations';
import { TabId } from '../components/Sidebar';

interface AssistantProps {
  jurisdiction: Jurisdiction;
  onSetJurisdiction: (j: Jurisdiction) => void;
  language: Language;
  onNavigate: (tab: TabId) => void;
  initialQuery?: string;
}

export const Assistant: React.FC<AssistantProps> = ({
  jurisdiction,
  onSetJurisdiction,
  language,
  onNavigate,
  initialQuery = ''
}) => {
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState(initialQuery || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(INITIAL_PIPELINE_STAGES);
  const [activeResponse, setActiveResponse] = useState<RAGResponse | null>(null);

  const handleStageUpdate = (stageId: string, status: 'running' | 'done', detail?: string) => {
    setPipelineStages(prev =>
      prev.map(stage => {
        if (stage.id === stageId) {
          return {
            ...stage,
            status,
            detail: detail || stage.detail
          };
        }
        return stage;
      })
    );
  };

  const handleSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsProcessing(true);

    // Reset pipeline stage visuals to idle
    setPipelineStages(INITIAL_PIPELINE_STAGES.map(s => ({ ...s, status: 'idle' })));

    try {
      const response = await AIService.askQuestion(
        queryText,
        jurisdiction,
        language,
        handleStageUpdate
      );
      setActiveResponse(response);
    } catch (err) {
      console.error('Failed to execute AI pipeline:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleQuickPrompt = (promptQuery: string) => {
    setQuery(promptQuery);
    handleSearch(promptQuery);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
              <Bot className="w-3.5 h-3.5" />
              <span>Grounded RAG Assistant • Active Regime: {jurisdiction}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
              {t.assistantTitle}
            </h1>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              {t.assistantSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setQuery("I developed a novel herbal extraction process for an Ayurvedic formulation using an Indian medicinal plant.");
                handleSearch("I developed a novel herbal extraction process for an Ayurvedic formulation using an Indian medicinal plant.");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load SIH Demo Query</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="relative">
            <textarea
              rows={3}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full bg-stone-950 border border-stone-700/80 rounded-xl p-4 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none shadow-inner"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="submit"
                disabled={isProcessing || !query.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-emerald-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Analyzing...' : t.askButton}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Quick Prompts Bar */}
        <div className="mt-4">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mb-2">
            Quick Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {t.quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(p.query)}
                className="px-2.5 py-1 rounded-lg bg-stone-950/80 hover:bg-stone-800 border border-stone-800 hover:border-emerald-700/60 text-stone-300 text-xs transition-all flex items-center gap-1.5"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Retrieval Pipeline Visualizer */}
      <RetrievalPipeline stages={pipelineStages} isProcessing={isProcessing} />

      {/* RAG Response Area */}
      {activeResponse && (
        <div className="space-y-6">
          {/* Quick Answer Banner */}
          <div className="bg-gradient-to-br from-emerald-950/90 via-stone-900 to-stone-900 border border-emerald-800/80 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-emerald-800/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  {t.answerTitle}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                Jurisdiction: {activeResponse.jurisdiction}
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-stone-100 leading-relaxed mb-4">
              {activeResponse.quickAnswer}
            </p>

            <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800/80 text-xs text-stone-300 leading-relaxed">
              <span className="font-bold text-amber-400 block mb-1 font-serif">
                {t.whyItMattersTitle}:
              </span>
              {activeResponse.whyItMatters}
            </div>
          </div>

          {/* Relevant Areas & Potential Concerns (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Relevant Domains */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-stone-200 font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.relevantAreasTitle}</span>
              </h3>

              <div className="space-y-3">
                {activeResponse.relevantAreas.map((area, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-amber-200">
                        {area.title}
                      </h4>
                      {area.tag && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                          {area.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Potential Concerns */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-stone-200 font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>{t.potentialConcernsTitle}</span>
              </h3>

              <div className="space-y-3">
                {activeResponse.potentialConcerns.map((concern, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-stone-200">
                        {concern.title}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
                        concern.severity === 'HIGH'
                          ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                          : concern.severity === 'MEDIUM'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                      }`}>
                        {concern.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      {concern.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Profile Indicators */}
          <RiskCard risks={activeResponse.risks} />

          {/* Recommended Next Steps */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-stone-200 font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t.nextStepsTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeResponse.recommendedNextSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onNavigate('checklist')}
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Add these steps to Compliance Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('classification')}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Run Product Classification Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Verified Source Citations */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
              <h3 className="text-xs font-bold text-stone-200 font-mono uppercase tracking-wider">
                {t.sourcesTitle} ({activeResponse.sources.length} Cited)
              </h3>
              <span className="text-[10px] text-stone-500 font-mono">
                Official Gazettes & Institutional Portals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeResponse.sources.map((src, idx) => (
                <SourceCard key={src.id} source={src} citationIndex={idx + 1} />
              ))}
            </div>
          </div>

          {/* Confidence Badge & Explainability */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <ConfidenceBadge
                confidence={activeResponse.confidence}
                explanation={activeResponse.confidenceReason}
              />
            </div>
            <div className="lg:col-span-2">
              <ExplainabilityPanel response={activeResponse} />
            </div>
          </div>

          {/* Legal Guardrail Disclaimer */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
            <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>{t.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
