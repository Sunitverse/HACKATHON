import React from 'react';
import { Shield, Globe, Award, Sparkles, UserCheck, Play, Compass, CheckCircle2 } from 'lucide-react';
import { Jurisdiction, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  jurisdiction: Jurisdiction;
  onJurisdictionChange: (j: Jurisdiction) => void;
  language: Language;
  onLanguageChange: (l: Language) => void;
  onOpenJudgeDemo: () => void;
  onOpenFullDemo: () => void;
  onOpenFacilitator: () => void;
  onMenuToggle?: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  jurisdiction,
  onJurisdictionChange,
  language,
  onLanguageChange,
  onOpenJudgeDemo,
  onOpenFullDemo,
  onOpenFacilitator,
  onMenuToggle,
  onToggleSidebar
}) => {
  const t = TRANSLATIONS[language];
  const handleToggle = onToggleSidebar || onMenuToggle;

  return (
    <header className="sticky top-0 z-30 bg-emerald-950 text-white border-b border-emerald-800/80 shadow-md">
      {/* Top micro-bar */}
      <div className="bg-emerald-900/60 px-4 py-1 text-xs border-b border-emerald-800/50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-emerald-200">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold tracking-wide text-amber-300">Smart India Hackathon 2026</span>
          <span className="text-emerald-400">•</span>
          <span className="text-emerald-300">Problem Statement SIH26045</span>
          <span className="hidden md:inline text-emerald-400">•</span>
          <span className="hidden md:inline text-emerald-300/80">Multilingual RAG for Ayurvedic IP & Regulatory Systems</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[11px]">RAG Engine: Active</span>
          </div>
          <button 
            onClick={onOpenFacilitator}
            className="text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 font-medium transition-colors"
          >
            <UserCheck className="w-3 h-3" />
            <span className="hidden sm:inline">Ayush Facilitator</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          {handleToggle && (
            <button
              onClick={handleToggle}
              className="lg:hidden p-2 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-800/60 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-700 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-amber-100 tracking-tight">IP-SAKTI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 font-sans font-medium border border-emerald-700">Sahayak</span>
              </div>
              <p className="text-[11px] text-emerald-300/90 leading-none hidden sm:block">
                AI-powered Intellectual Property & Regulatory Guidance for Ayurveda
              </p>
            </div>
          </div>
        </div>

        {/* Center: Jurisdiction Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-900/90 p-1 rounded-xl border border-emerald-700/80 flex items-center shadow-inner">
            <button
              onClick={() => onJurisdictionChange('INDIA')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                jurisdiction === 'INDIA'
                  ? 'bg-amber-500 text-emerald-950 shadow-md font-bold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <span className="text-sm">🇮🇳</span>
              <span>INDIA</span>
            </button>
            <button
              onClick={() => onJurisdictionChange('INTERNATIONAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                jurisdiction === 'INTERNATIONAL'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL / WIPO</span>
            </button>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector */}
          <div className="flex items-center rounded-lg bg-emerald-900/80 border border-emerald-700/70 p-0.5 text-xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                language === 'en' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-emerald-300 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                language === 'hi' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-emerald-300 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                language === 'mr' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-emerald-300 hover:text-white'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Try Full Demo Button */}
          <button
            onClick={onOpenFullDemo}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 shadow-md hover:shadow-amber-500/20 transition-all transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Try Full Demo</span>
          </button>

          {/* Judge Demo Button */}
          <button
            onClick={onOpenJudgeDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-semibold text-xs border border-amber-400/40 shadow-sm transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">🎯 Judge Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        </div>
      </div>

      {/* Jurisdiction Status Notification Strip */}
      <div className={`px-4 py-1 text-xs font-medium flex items-center justify-between border-t ${
        jurisdiction === 'INDIA' 
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
          : 'bg-blue-900/30 border-blue-500/30 text-blue-200'
      }`}>
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-3.5 h-3.5 ${jurisdiction === 'INDIA' ? 'text-amber-400' : 'text-blue-400'}`} />
          <span>
            {jurisdiction === 'INDIA' ? t.indiaSpecificBadge : t.internationalBadge}
          </span>
        </div>
        <span className="text-[10px] text-emerald-300/80 font-mono hidden md:inline">
          Strict Separation Mode Active • Zero Regulatory Cross-Pollution
        </span>
      </div>
    </header>
  );
};
