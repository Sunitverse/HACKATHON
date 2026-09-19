import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Shield,
  FileCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TabId } from '../components/Sidebar';

interface ChecklistItem {
  id: number;
  category: 'IP' | 'ABS' | 'REGULATORY' | 'GLOBAL';
  title: string;
  description: string;
  statutoryBasis: string;
  mandatory: boolean;
  completed: boolean;
}

export const Checklist: React.FC = () => {
  const initialItems: ChecklistItem[] = [
    {
      id: 1,
      category: 'IP',
      title: 'Traditional Knowledge & Prior Art Screening',
      description: 'Screen formulations against CSIR-TKDL and Ayurvedic Pharmacopoeia of India to ensure no direct Section 3(p) patent bar.',
      statutoryBasis: 'Section 3(p), The Patents Act 1970',
      mandatory: true,
      completed: true
    },
    {
      id: 2,
      category: 'ABS',
      title: 'National Biodiversity Authority (NBA) Form III Approval',
      description: 'Apply for and obtain prior approval from the NBA Chennai before filing a patent application in India or any PCT territory.',
      statutoryBasis: 'Section 6(1), Biological Diversity Act 2002',
      mandatory: true,
      completed: false
    },
    {
      id: 3,
      category: 'ABS',
      title: 'State Biodiversity Board (SBB) Section 7 Intimation',
      description: 'Intimate the relevant State Biodiversity Board for commercial sourcing of Indian biological herbs and raw materials.',
      statutoryBasis: 'Section 7, Biological Diversity Act 2002',
      mandatory: true,
      completed: true
    },
    {
      id: 4,
      category: 'REGULATORY',
      title: 'Ayush Manufacturing License (Form 25-D)',
      description: 'Obtain manufacturing license from State Licensing Authority under Drugs and Cosmetics Act 1940 with proof of classical text or safety data under Rule 158-B.',
      statutoryBasis: 'Rule 158-B, Drugs and Cosmetics Rules 1945',
      mandatory: true,
      completed: false
    },
    {
      id: 5,
      category: 'REGULATORY',
      title: 'NABL Certificate of Analysis (CoA) for Botanical Raw Herbs',
      description: 'Conduct TLC/HPTLC fingerprinting, heavy metals (Pb, Cd, As, Hg), pesticide residues, and microbial load testing conforming to API standards.',
      statutoryBasis: 'Ayurvedic Pharmacopoeia of India (API) Part I',
      mandatory: true,
      completed: true
    },
    {
      id: 6,
      category: 'IP',
      title: 'Trademark Clearance Search in Class 5',
      description: 'Search IP India public trademark database to confirm coined brand name does not conflict with generic Sanskrit botanical terms or existing registered marks.',
      statutoryBasis: 'Section 9(1)(b) & Section 11, Trade Marks Act 1999',
      mandatory: true,
      completed: true
    },
    {
      id: 7,
      category: 'REGULATORY',
      title: 'Packaging & Label Compliance (Ayush Rules)',
      description: 'Ensure true list of ingredients with botanical Latin names, batch number, manufacturing date, expiry date, and warning labels are printed on carton.',
      statutoryBasis: 'Part XVII (Rule 161), Drugs and Cosmetics Rules 1945',
      mandatory: true,
      completed: false
    },
    {
      id: 8,
      category: 'REGULATORY',
      title: 'FSSAI Ayurveda-Aahar Compliance (If Applicable)',
      description: 'If marketing as wellness food/supplement rather than drug, secure Ayurveda-Aahar license with mandatory Ayush logo and disclaimer.',
      statutoryBasis: 'FSSAI Ayurveda-Aahar Regulations 2022',
      mandatory: false,
      completed: false
    },
    {
      id: 9,
      category: 'GLOBAL',
      title: 'PCT International Patent Priority Tracking (12 Months)',
      description: 'If seeking international patent protection, ensure PCT international application is lodged within 12 months of Indian priority date.',
      statutoryBasis: 'Article 8, Patent Cooperation Treaty (PCT)',
      mandatory: false,
      completed: false
    },
    {
      id: 10,
      category: 'GLOBAL',
      title: 'Nagoya Protocol Cross-Border Due Diligence Clearance',
      description: 'Obtain Internationally Recognized Certificate of Compliance (IRCC) from NBA to satisfy European Union Regulation (EU) No 511/2014.',
      statutoryBasis: 'Nagoya Protocol / EU ABS Due Diligence Regulation',
      mandatory: true,
      completed: false
    }
  ];

  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const toggleItem = (id: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = items.filter(i => i.completed).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  const displayedItems = items.filter(
    item => filterCategory === 'ALL' || item.category === filterCategory
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-xs font-mono border border-amber-800 mb-2">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Statutory Pre-Commercialisation Audit</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
              Ayurvedic IP & Regulatory Compliance Checklist
            </h1>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Track mandatory biological resource approvals, prior art clearances, Ayush manufacturing licenses, and international export criteria.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setItems(initialItems)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 border border-stone-800 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Sheet</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 p-4 rounded-xl bg-stone-950 border border-stone-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-stone-300 font-bold">
              Readiness Score: {completedCount} of {items.length} Compliances Completed
            </span>
            <span className="font-mono font-bold text-amber-400">
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {[
            { id: 'ALL', label: 'All Items (10)' },
            { id: 'IP', label: 'Intellectual Property (2)' },
            { id: 'ABS', label: 'ABS & Biodiversity (2)' },
            { id: 'REGULATORY', label: 'Ayush & DCA (4)' },
            { id: 'GLOBAL', label: 'International & Treaties (2)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                filterCategory === tab.id
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist List */}
      <div className="space-y-3">
        {displayedItems.map(item => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-800/60 shadow-sm'
                : 'bg-stone-900 border-stone-800 hover:border-amber-500/40'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {}} // Handled by parent container click
                className="w-4 h-4 rounded border-stone-700 bg-stone-950 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 className={`text-xs font-bold ${
                  item.completed ? 'text-emerald-300 line-through' : 'text-stone-100'
                }`}>
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    item.mandatory
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                      : 'bg-stone-800 text-stone-400'
                  }`}>
                    {item.mandatory ? 'MANDATORY' : 'RECOMMENDED'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-amber-400 font-mono border border-stone-800">
                    {item.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed mb-1.5">
                {item.description}
              </p>

              <div className="text-[10px] font-mono text-stone-500">
                Statutory Reference: <span className="text-amber-400/80">{item.statutoryBasis}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Legal Note */}
      <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
        <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <span>
          Compliance Notice: This checklist provides a structured operational audit framework. Innovators must obtain formal statutory clearances from the National Biodiversity Authority, State Ayush Licensing Authorities, and the Indian Patent Office before commercial product release.
        </span>
      </div>
    </div>
  );
};
