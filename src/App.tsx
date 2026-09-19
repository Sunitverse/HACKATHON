import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabId } from './components/Sidebar';
import { Jurisdiction, Language } from './types';
import { JudgeDemoModal } from './components/JudgeDemoModal';
import { FullDemoModal } from './components/FullDemoModal';
import { FacilitatorModal } from './components/FacilitatorModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Assistant } from './pages/Assistant';
import { Classification } from './pages/Classification';
import { IPProtection } from './pages/IPProtection';
import { TraditionalKnowledge } from './pages/TraditionalKnowledge';
import { ABS } from './pages/ABS';
import { International } from './pages/International';
import { Documents } from './pages/Documents';
import { Sources } from './pages/Sources';
import { Checklist } from './pages/Checklist';
import { Requests } from './pages/Requests';
import { Architecture } from './pages/Architecture';
import { Settings } from './pages/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('INDIA');
  const [language, setLanguage] = useState<Language>('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState(false);
  const [isFullDemoOpen, setIsFullDemoOpen] = useState(false);
  const [isFacilitatorOpen, setIsFacilitatorOpen] = useState(false);

  // Cross-component query triggers
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string>('');

  const handleSelectCase = (query: string, regime: Jurisdiction) => {
    setJurisdiction(regime);
    setAssistantInitialQuery(query);
    setActiveTab('assistant');
  };

  const handleCompleteDemo = (targetTab: TabId) => {
    setJurisdiction('INDIA');
    setAssistantInitialQuery(
      'I developed a novel herbal extraction process for an Ayurvedic formulation using an Indian medicinal plant. I want to commercialise it in India and later export it.'
    );
    setActiveTab(targetTab);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={setActiveTab}
            jurisdiction={jurisdiction}
            onSetJurisdiction={setJurisdiction}
            language={language}
            onOpenFullDemo={() => setIsFullDemoOpen(true)}
          />
        );
      case 'assistant':
        return (
          <Assistant
            jurisdiction={jurisdiction}
            onSetJurisdiction={setJurisdiction}
            language={language}
            onNavigate={setActiveTab}
            initialQuery={assistantInitialQuery}
          />
        );
      case 'classification':
        return <Classification onNavigate={setActiveTab} />;
      case 'ip_protection':
        return <IPProtection onNavigate={setActiveTab} />;
      case 'traditional_knowledge':
        return <TraditionalKnowledge onNavigate={setActiveTab} />;
      case 'abs':
        return <ABS onNavigate={setActiveTab} />;
      case 'international':
        return (
          <International
            onNavigate={setActiveTab}
            onSetJurisdiction={setJurisdiction}
          />
        );
      case 'documents':
        return <Documents onNavigate={setActiveTab} />;
      case 'sources':
        return <Sources />;
      case 'checklist':
        return <Checklist />;
      case 'requests':
        return (
          <Requests
            onOpenFacilitatorModal={() => setIsFacilitatorOpen(true)}
          />
        );
      case 'architecture':
        return <Architecture />;
      case 'settings':
        return (
          <Settings
            language={language}
            onSetLanguage={setLanguage}
            jurisdiction={jurisdiction}
            onSetJurisdiction={setJurisdiction}
          />
        );
      default:
        return (
          <Dashboard
            onNavigate={setActiveTab}
            jurisdiction={jurisdiction}
            onSetJurisdiction={setJurisdiction}
            language={language}
            onOpenFullDemo={() => setIsFullDemoOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-emerald-950">
      {/* Top Application Header */}
      <Header
        jurisdiction={jurisdiction}
        onJurisdictionChange={setJurisdiction}
        language={language}
        onLanguageChange={setLanguage}
        onOpenJudgeDemo={() => setIsJudgeDemoOpen(true)}
        onOpenFullDemo={() => setIsFullDemoOpen(true)}
        onOpenFacilitator={() => setIsFacilitatorOpen(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={tab => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
          language={language}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Scrollable Page Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 bg-stone-950/60">
          <div className="max-w-6xl mx-auto">
            {renderActivePage()}
          </div>
        </main>
      </div>

      {/* Interactive Modals */}
      <JudgeDemoModal
        isOpen={isJudgeDemoOpen}
        onClose={() => setIsJudgeDemoOpen(false)}
        onSelectCase={handleSelectCase}
      />

      <FullDemoModal
        isOpen={isFullDemoOpen}
        onClose={() => setIsFullDemoOpen(false)}
        onCompleteDemo={handleCompleteDemo}
      />

      <FacilitatorModal
        isOpen={isFacilitatorOpen}
        onClose={() => setIsFacilitatorOpen(false)}
        activeJurisdiction={jurisdiction}
      />
    </div>
  );
}
