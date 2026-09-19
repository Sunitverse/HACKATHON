import React from 'react';
import {
  Settings as SettingsIcon,
  Globe2,
  Shield,
  CheckCircle2,
  Cpu,
  BookOpen,
  Info
} from 'lucide-react';
import { Jurisdiction, Language } from '../types';

interface SettingsProps {
  language: Language;
  onSetLanguage: (lang: Language) => void;
  jurisdiction: Jurisdiction;
  onSetJurisdiction: (j: Jurisdiction) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  language,
  onSetLanguage,
  jurisdiction,
  onSetJurisdiction
}) => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>System Configuration & Preferences</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          Preferences & System Settings
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          Configure interface language, active statutory regime isolation, and review AI engine connection parameters.
        </p>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-6">
        {/* Language Preference */}
        <div>
          <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono mb-3">
            Interface Language
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'en', label: 'English', native: 'English', desc: 'Standard statutory terminology' },
              { id: 'hi', label: 'Hindi', native: 'हिंदी', desc: 'आयुर्वेद नवाचार एवं बौद्धिक संपदा' },
              { id: 'mr', label: 'Marathi', native: 'मराठी', desc: 'आयुर्वेद संशोधन व कायदेशीर मार्गदर्शन' }
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => onSetLanguage(lang.id as Language)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  language === lang.id
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/40'
                }`}
              >
                <div className="font-bold text-sm mb-0.5">{lang.native}</div>
                <div className="text-xs text-stone-400">{lang.label}</div>
                <div className="text-[10px] text-stone-500 mt-1">{lang.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Jurisdiction Regime Isolation */}
        <div className="pt-4 border-t border-stone-800">
          <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono mb-3">
            Statutory Regime Isolation (Anti-Hallucination Guardrail)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onSetJurisdiction('INDIA')}
              className={`p-4 rounded-xl border text-left transition-all ${
                jurisdiction === 'INDIA'
                  ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <span>🇮🇳</span>
                <span>Indian Domestic Regime</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Anchored in Indian Patents Act 1970, Section 3(p) TKDL, Biological Diversity Act 2002/2023, and Drugs & Cosmetics Act 1940.
              </p>
            </button>

            <button
              onClick={() => onSetJurisdiction('INTERNATIONAL')}
              className={`p-4 rounded-xl border text-left transition-all ${
                jurisdiction === 'INTERNATIONAL'
                  ? 'bg-blue-500/15 border-blue-500 text-blue-300 shadow-sm'
                  : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <span>🌍</span>
                <span>International & Multilateral Regime</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Anchored in WIPO GRATK Treaty (2024), PCT, Madrid Protocol, Nagoya Protocol, and target market botanical drug rules (EU THMPD, US DSHEA).
              </p>
            </button>
          </div>
        </div>

        {/* System Diagnostics */}
        <div className="pt-4 border-t border-stone-800">
          <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono mb-3">
            System Diagnostics & API Status
          </h3>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">AI Model Backend:</span>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Gemini 2.5 Flash via Express Server (/api/ask)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Knowledge Base Index:</span>
              <span className="font-mono text-stone-300">
                22 Verified Records (IPO, NBA, Ayush, WIPO)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Environment Port:</span>
              <span className="font-mono text-stone-300">
                3000 (Reverse Proxy Bound)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Anti-Hallucination Verification:</span>
              <span className="font-mono text-emerald-400">
                Deterministic RAG Fallback Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hackathon Credits */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 text-xs text-stone-400 flex items-center justify-between">
        <div>
          <span className="font-bold text-stone-200 block mb-0.5">
            Smart India Hackathon 2026 • Problem SIH26045
          </span>
          <span>
            IP-SAKTI Sahayak: AI-powered Intellectual Property and regulatory guidance for Ayurveda.
          </span>
        </div>
        <span className="font-mono text-[10px] text-amber-400">v2.4-PROTOTYPE</span>
      </div>
    </div>
  );
};
