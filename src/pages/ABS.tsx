import React, { useState } from 'react';
import { Sprout, CheckCircle2, AlertTriangle, Shield, ArrowRight, RotateCcw, FileText, Info } from 'lucide-react';
import { ABSScreeningAnswers, ABSScreeningResult } from '../types';
import { TabId } from '../components/Sidebar';

interface ABSProps {
  onNavigate: (tab: TabId) => void;
}

export const ABS: React.FC<ABSProps> = ({ onNavigate }) => {
  const [answers, setAnswers] = useState<ABSScreeningAnswers>({
    involvesBioResources: 'Yes',
    resourceOrigin: 'Forests / Wild Harvest in India',
    traditionalKnowledgeLinked: 'Yes',
    activityPurpose: 'Commercial manufacturing',
    commercialIntent: 'Yes',
    foreignPartyInvolvement: 'No'
  });

  const [hasScreened, setHasScreened] = useState(true);

  const calculateResult = (ans: ABSScreeningAnswers): ABSScreeningResult => {
    const isBio = ans.involvesBioResources === 'Yes';
    const isWild = ans.resourceOrigin.includes('Forests') || ans.resourceOrigin.includes('Cultivated');
    const isCommercial = ans.commercialIntent === 'Yes' || ans.activityPurpose.includes('Commercial');
    const isForeign = ans.foreignPartyInvolvement === 'Yes';

    if (isBio && isForeign) {
      return {
        relevance: 'HIGH',
        summary: 'Your activity involves biological resources with foreign entity participation or export intent. Under Section 3 of the Biological Diversity Act 2002, foreign individuals or companies must obtain previous approval of the National Biodiversity Authority (Form I). Filing a patent additionally mandates NBA Form III approval under Section 6.',
        statutoryBasis: 'Section 3 & Section 6, Biological Diversity Act, 2002',
        mandatoryApprovals: [
          'NBA Form I (Access to Biological Resources by Non-Indian entities)',
          'NBA Form III (Application for Intellectual Property Rights)',
          'Benefit Sharing Agreement (Up to 0.1% - 0.5% ex-factory sale proceeds)'
        ],
        exemptionsEvaluated: 'No exemption applies. Section 40 Normally Traded Commodities (NTC) exemption is restricted strictly to conventional food/trade and excludes intellectual property or specialized extraction.',
        recommendedAction: 'Submit Form I and Form III applications to the National Biodiversity Authority (NBA Chennai) prior to filing any domestic or PCT patent.'
      };
    }

    if (isBio && isCommercial) {
      return {
        relevance: 'HIGH',
        summary: 'Indian citizens and domestic commercial companies obtaining Indian biological resources for commercial utilization must intimate the concerned State Biodiversity Board (SBB) under Section 7 of the Biological Diversity Act. If applying for any patent based on this research, NBA Form III prior approval under Section 6 remains mandatory.',
        statutoryBasis: 'Section 6 & Section 7, Biological Diversity Act 2002 & 2023 Amendment',
        mandatoryApprovals: [
          'State Biodiversity Board (SBB) Intimation under Section 7',
          'NBA Form III approval prior to patent application lodgment (Section 6)',
          'Benefit Sharing contribution to State Biodiversity Fund'
        ],
        exemptionsEvaluated: 'Biological Diversity (Amendment) Act 2023 exempts registered Ayush practitioners and cultivated medicinal plants from certain SBB commercial intimation, but Section 6 patent approval remains mandatory for all patent applicants.',
        recommendedAction: 'Obtain NBA Form III clearance from National Biodiversity Authority Chennai before lodging a patent application.'
      };
    }

    return {
      relevance: 'LOW',
      summary: 'Pure academic research without commercialization by Indian researchers does not require prior NBA approval, provided biological resources are not transferred to foreign collaborators under Section 20.',
      statutoryBasis: 'Section 5 & Section 20, Biological Diversity Act 2002',
      mandatoryApprovals: [
        'No prior approval needed for purely non-commercial academic study',
        'Prior approval mandatory if transferring research results to foreign entities (Section 20)'
      ],
      exemptionsEvaluated: 'Collaborative research projects between Indian and foreign institutions approved by Central Government are exempt under Section 5.',
      recommendedAction: 'Ensure strict confidentiality and maintain Chain of Custody documentation for all biological specimen collections.'
    };
  };

  const screeningResult = calculateResult(answers);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
          <Sprout className="w-3.5 h-3.5" />
          <span>Access and Benefit Sharing (ABS) Screening Engine</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          Biological Diversity & ABS Statutory Compliance
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          Screen your procurement of Indian medicinal plants and biological resources to determine mandatory National Biodiversity Authority (NBA) and State Biodiversity Board (SBB) approvals.
        </p>
      </div>

      {/* Interactive 6-Question Intake Form */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-4 pb-2 border-b border-stone-800">
          Statutory Questionnaire (Biological Diversity Act 2002 / 2023)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Q1 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <label className="block text-stone-200 font-bold mb-2">
              1. Does your activity involve biological resources?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No', 'Unsure'].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAnswers({ ...answers, involvesBioResources: val })}
                  className={`px-3 py-1.5 rounded-lg border font-medium text-xs transition-all ${
                    answers.involvesBioResources === val
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                      : 'bg-stone-900 text-stone-300 border-stone-800'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <label className="block text-stone-200 font-bold mb-2">
              2. Where was the resource obtained?
            </label>
            <select
              value={answers.resourceOrigin}
              onChange={e => setAnswers({ ...answers, resourceOrigin: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-amber-500"
            >
              <option value="Forests / Wild Harvest in India">Forests / Wild Harvest in India</option>
              <option value="Cultivated by Local Farmers in India">Cultivated by Local Farmers in India</option>
              <option value="Purchased from Mandi / Registered Trader">Purchased from Mandi / Registered Trader</option>
              <option value="Imported from Outside India">Imported from Outside India</option>
            </select>
          </div>

          {/* Q3 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <label className="block text-stone-200 font-bold mb-2">
              3. Is traditional/community knowledge associated?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No', 'Unsure'].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAnswers({ ...answers, traditionalKnowledgeLinked: val })}
                  className={`px-3 py-1.5 rounded-lg border font-medium text-xs transition-all ${
                    answers.traditionalKnowledgeLinked === val
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                      : 'bg-stone-900 text-stone-300 border-stone-800'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <label className="block text-stone-200 font-bold mb-2">
              4. What is the primary purpose?
            </label>
            <select
              value={answers.activityPurpose}
              onChange={e => setAnswers({ ...answers, activityPurpose: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-amber-500"
            >
              <option value="Commercial manufacturing">Commercial manufacturing & retail sale</option>
              <option value="Academic research">Academic research / clinical study only</option>
              <option value="Bio-survey and bio-utilization">Bio-survey and bio-utilization</option>
              <option value="Patent filing">Patent application preparation</option>
            </select>
          </div>

          {/* Q5 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <label className="block text-stone-200 font-bold mb-2">
              5. Is commercialisation planned?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No', 'In Future'].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAnswers({ ...answers, commercialIntent: val })}
                  className={`px-3 py-1.5 rounded-lg border font-medium text-xs transition-all ${
                    answers.commercialIntent === val
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                      : 'bg-stone-900 text-stone-300 border-stone-800'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Q6 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
            <label className="block text-stone-200 font-bold mb-2">
              6. Are international parties involved?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No', 'Foreign Export Intent'].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAnswers({ ...answers, foreignPartyInvolvement: val })}
                  className={`px-3 py-1.5 rounded-lg border font-medium text-xs transition-all ${
                    answers.foreignPartyInvolvement === val
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                      : 'bg-stone-900 text-stone-300 border-stone-800'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Screening Result Output */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              ABS SCREENING RESULTS
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${
              screeningResult.relevance === 'HIGH'
                ? 'bg-rose-950 text-rose-300 border-rose-700'
                : 'bg-emerald-950 text-emerald-300 border-emerald-700'
            }`}>
              POTENTIAL RELEVANCE: {screeningResult.relevance}
            </span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">
            Governing Statute: {screeningResult.statutoryBasis}
          </span>
        </div>

        {/* Reason / Summary */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs text-stone-200 leading-relaxed">
          <span className="font-bold text-amber-400 block mb-1 font-mono uppercase text-[10px]">
            Statutory Determination Reasoning:
          </span>
          {screeningResult.summary}
        </div>

        {/* Mandatory Approvals Checklist */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
          <span className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider block mb-2">
            Mandatory Approvals & Filings:
          </span>
          <ul className="space-y-1.5 text-xs text-stone-300">
            {screeningResult.mandatoryApprovals.map((app, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">⚠</span>
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exemptions Evaluated */}
        <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-xs text-stone-400">
          <span className="font-bold text-emerald-400 block mb-0.5">Exemptions Analysis:</span>
          {screeningResult.exemptionsEvaluated}
        </div>

        {/* Next Action Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              Potential Next Action:
            </span>
            <p className="text-xs text-stone-200">
              {screeningResult.recommendedAction}
            </p>
          </div>

          <button
            onClick={() => onNavigate('checklist')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md flex-shrink-0"
          >
            <span>Log to Compliance Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Critical Legal Disclaimer */}
      <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
        <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <span>
          Statutory Warning: This is preliminary diagnostic screening and NOT an official legal determination. Violations of Section 6 or Section 7 of the Biological Diversity Act 2002 carry cognizable statutory penalties under Section 55. Review requirements with the National Biodiversity Authority (NBA) or an accredited environmental legal facilitator.
        </span>
      </div>
    </div>
  );
};
