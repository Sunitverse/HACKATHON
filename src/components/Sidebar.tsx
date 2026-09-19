import React from 'react';
import {
  Home,
  Bot,
  FlaskConical,
  Lightbulb,
  Leaf,
  Sprout,
  Globe2,
  FileText,
  BookOpen,
  CheckSquare,
  Users,
  Settings,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

export type TabId = 
  | 'dashboard'
  | 'assistant'
  | 'classification'
  | 'ip_protection'
  | 'traditional_knowledge'
  | 'abs'
  | 'international'
  | 'documents'
  | 'sources'
  | 'checklist'
  | 'requests'
  | 'architecture'
  | 'settings';

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  language?: Language;
  completedChecksCount?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  language = 'en',
  completedChecksCount = 6,
  isOpen = false,
  onClose
}) => {
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'dashboard' as TabId, label: t.navDashboard, icon: Home, badge: null },
    { id: 'assistant' as TabId, label: t.navAssistant, icon: Bot, badge: 'RAG' },
    { id: 'classification' as TabId, label: t.navClassification, icon: FlaskConical, badge: 'Wizard' },
    { id: 'ip_protection' as TabId, label: t.navIPProtection, icon: Lightbulb, badge: 'Map' },
    { id: 'traditional_knowledge' as TabId, label: t.navTK, icon: Leaf, badge: 'TKDL' },
    { id: 'abs' as TabId, label: t.navABS, icon: Sprout, badge: 'NBA' },
    { id: 'international' as TabId, label: t.navInternational, icon: Globe2, badge: 'WIPO' },
    { id: 'documents' as TabId, label: t.navDocuments, icon: FileText, badge: 'AI Scan' },
    { id: 'sources' as TabId, label: t.navSources, icon: BookOpen, badge: '22+' },
    { id: 'checklist' as TabId, label: t.navChecklist, icon: CheckSquare, badge: `${completedChecksCount}/10` },
    { id: 'requests' as TabId, label: t.navRequests, icon: Users, badge: null },
    { id: 'architecture' as TabId, label: t.navArchitecture, icon: Cpu, badge: 'SIH' },
    { id: 'settings' as TabId, label: t.navSettings, icon: Settings, badge: null }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-200 border-r border-stone-800 flex flex-col flex-shrink-0 h-[calc(100vh-84px)] top-[84px] overflow-y-auto transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      {/* Core Flow Tagline */}
      <div className="p-3.5 border-b border-stone-800 bg-stone-950/50">
        <div className="text-[11px] font-mono text-amber-400 font-semibold tracking-wider uppercase mb-1">
          Structured AI Pipeline
        </div>
        <div className="text-[11px] text-stone-400 leading-snug flex items-center gap-1 font-medium">
          Ask → Classify → Retrieve → Verify → Act
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-2 space-y-1 flex-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-emerald-900/80 text-amber-200 font-semibold border border-emerald-700/60 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-amber-400' : 'text-stone-400 group-hover:text-emerald-400'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    : 'bg-stone-800 text-stone-400 group-hover:bg-stone-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer System Status Card */}
      <div className="p-3 border-t border-stone-800 bg-stone-950/70">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="text-stone-400 font-medium">Statutory Engine</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified
          </span>
        </div>
        <div className="bg-stone-900 rounded-lg p-2 border border-stone-800 text-[10px] text-stone-400 space-y-1">
          <div className="flex justify-between">
            <span>Grounding Corpus:</span>
            <span className="text-stone-200 font-mono">22+ Statutory Acts</span>
          </div>
          <div className="flex justify-between">
            <span>Anti-Hallucination:</span>
            <span className="text-emerald-400 font-mono">Enforced</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};
