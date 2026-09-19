import React from 'react';
import { CheckCircle, Loader2, CircleDot, AlertTriangle, ShieldCheck, Database, Search, Cpu } from 'lucide-react';
import { PipelineStage } from '../types';

interface RetrievalPipelineProps {
  stages: PipelineStage[];
  isProcessing: boolean;
  currentStepIndex?: number;
}

export const RetrievalPipeline: React.FC<RetrievalPipelineProps> = ({
  stages,
  isProcessing
}) => {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono">
              Knowledge Retrieval & Verification Pipeline
            </h3>
            <p className="text-[11px] text-stone-400">
              Deterministic RAG with legal threshold verification & anti-hallucination guardrails
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isProcessing ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-medium animate-pulse border border-amber-500/30">
              <Loader2 className="w-3 h-3 animate-spin" />
              Pipeline Executing
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-medium border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified Output
            </span>
          )}
        </div>
      </div>

      {/* Pipeline Visual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {stages.map((stage, idx) => {
          const isDone = stage.status === 'done';
          const isRunning = stage.status === 'running';

          return (
            <div
              key={stage.id}
              className={`p-2.5 rounded-xl border text-xs transition-all ${
                isRunning
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-sm text-stone-100 ring-1 ring-amber-500/30'
                  : isDone
                  ? 'bg-stone-950/80 border-emerald-800/60 text-stone-200'
                  : 'bg-stone-950/40 border-stone-800/80 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-stone-400 font-bold">
                  STEP 0{idx + 1}
                </span>
                {isRunning ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                ) : isDone ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <CircleDot className="w-3.5 h-3.5 text-stone-600" />
                )}
              </div>
              <div className={`font-semibold mb-1 truncate ${isRunning ? 'text-amber-200' : isDone ? 'text-emerald-300' : 'text-stone-400'}`}>
                {stage.name}
              </div>
              <div className="text-[10px] text-stone-400 leading-snug line-clamp-2">
                {stage.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
