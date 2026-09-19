import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Shield,
  Lightbulb,
  FileCheck,
  AlertTriangle,
  Compass
} from 'lucide-react';
import { ClassificationAnswers, ClassificationResult } from '../types';
import { ClassificationService } from '../services/classificationService';
import { TabId } from '../components/Sidebar';

interface ClassificationProps {
  onNavigate: (tab: TabId) => void;
}

export const Classification: React.FC<ClassificationProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<ClassificationAnswers>({
    productType: 'Classical Ayurvedic Medicine',
    authoritativeText: 'Yes',
    biologicalResources: 'Yes',
    traditionalKnowledge: 'Yes',
    intendedActivity: 'Indian commercialisation',
    novelTechnicalComponent: 'No'
  });
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const stepQuestions = [
    {
      step: 1,
      question: "What best describes your product?",
      key: 'productType' as keyof ClassificationAnswers,
      options: [
        { label: 'Classical Ayurvedic Medicine', desc: 'Strictly derived from recognized treatises in First Schedule (e.g., Charaka Samhita, API)' },
        { label: 'Proprietary / Patent Medicine', desc: 'Ayurvedic ingredients combined in novel ratios, non-classical forms, or new indications' },
        { label: 'Phytopharmaceutical', desc: 'Purified, standardized fraction of medicinal plant with defined biomarker fingerprints' },
        { label: 'Ayurveda-Aahar / Nutraceutical', desc: 'Food or beverage prepared in accordance with Ayurvedic texts for wellness, not disease treatment' },
        { label: 'Cosmetic / Personal Care', desc: 'External topical preparation intended for beautification or hygiene (Soundarya Prasadhana)' },
        { label: 'Unsure', desc: 'Still conceptualizing product composition and regulatory positioning' }
      ]
    },
    {
      step: 2,
      question: "Is the formulation based on an established authoritative Ayurvedic text?",
      key: 'authoritativeText' as keyof ClassificationAnswers,
      options: [
        { label: 'Yes', desc: 'Exact recipe verbatim in one of the 54 treatises listed in First Schedule of DCA 1940' },
        { label: 'No', desc: 'Modified modern recipe or proprietary blend not found directly in ancient treatises' },
        { label: 'Unsure', desc: 'Need archival consultation or literature cross-referencing' }
      ]
    },
    {
      step: 3,
      question: "Does the product contain biological resources?",
      key: 'biologicalResources' as keyof ClassificationAnswers,
      options: [
        { label: 'Yes', desc: 'Contains plant parts, extracts, minerals, or traditional biological materials sourced in India' },
        { label: 'No', desc: 'Synthetic compounds or purely synthetic analogues without natural raw materials' },
        { label: 'Unsure', desc: 'Partially sourced from commercial traders / supply chain' }
      ]
    },
    {
      step: 4,
      question: "Is traditional/community knowledge involved?",
      key: 'traditionalKnowledge' as keyof ClassificationAnswers,
      options: [
        { label: 'Yes', desc: 'Utilizes documented or tribal community medicinal knowledge regarding plant efficacy' },
        { label: 'No', desc: 'Completely novel laboratory synthesis without prior traditional indication' },
        { label: 'Unsure', desc: 'Derived from folk practices or local tribal healers' }
      ]
    },
    {
      step: 5,
      question: "What is your intended activity?",
      key: 'intendedActivity' as keyof ClassificationAnswers,
      options: [
        { label: 'Research & Development', desc: 'Academic or industrial screening without immediate public sale' },
        { label: 'Indian commercialisation', desc: 'Manufacturing and retail distribution within the Indian domestic market' },
        { label: 'Export to International Markets', desc: 'Targeting USA, Europe, GCC, or Southeast Asian distribution' },
        { label: 'Research + Commercialisation', desc: 'Comprehensive translational pipeline from lab to global market' }
      ]
    },
    {
      step: 6,
      question: "Does your innovation contain a potentially novel technical component?",
      key: 'novelTechnicalComponent' as keyof ClassificationAnswers,
      options: [
        { label: 'Yes', desc: 'Novel extraction solvent, enhanced bioavailability, nano-carrier, or improved shelf-life stability' },
        { label: 'No', desc: 'Standard traditional decoction (Kwatha), powder (Churna), or oil extraction' },
        { label: 'Unsure', desc: 'Requires analytical chromatographic comparison against classical baseline' }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    const currentQ = stepQuestions[currentStep - 1];
    const updated = { ...answers, [currentQ.key]: value };
    setAnswers(updated);

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate classification
      const res = ClassificationService.classify(updated);
      setResult(res);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setResult(null);
  };

  const activeQ = stepQuestions[currentStep - 1];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Smart Ayurvedic Product Classification Wizard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
              Regulatory & Statutory Category Screening
            </h1>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Determine your likely product classification under the Drugs and Cosmetics Act 1940, FSSAI Ayurveda-Aahar Regulations 2022, and CDSCO New Drugs Rules.
            </p>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Status</span>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {result ? 'Classification Complete' : `Step ${currentStep} of 6`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-950 h-1.5 rounded-full mt-5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Active Step */}
      {!result ? (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              STEP {activeQ.step} of 6
            </span>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <h2 className="text-lg font-serif font-bold text-stone-100 mb-4">
            {activeQ.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeQ.options.map((opt, idx) => {
              const isSelected = answers[activeQ.key] === opt.label;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.label)}
                  className={`p-4 rounded-xl border text-left transition-all group ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-600 ring-1 ring-emerald-500 text-stone-100 shadow-md'
                      : 'bg-stone-950/70 border-stone-800 hover:border-emerald-700/60 text-stone-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-stone-100 group-hover:text-amber-300 transition-colors">
                      {opt.label}
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-400/20' : 'border-stone-700'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  PRODUCT CLASSIFICATION RESULT
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-classify</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2 bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono uppercase text-stone-500 block mb-1">
                  Likely Regulatory Category
                </span>
                <h2 className="text-lg font-bold text-amber-200 font-serif mb-2">
                  {result.likelyCategory}
                </h2>
                <p className="text-xs text-stone-300 leading-relaxed">
                  <span className="text-amber-400 font-bold">Statutory Basis: </span>
                  {result.statutoryProvision}
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-500 block mb-1">
                    Screening Confidence
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-mono text-xs border border-emerald-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{result.confidence} CONFIDENCE</span>
                  </div>
                </div>
                <div className="text-[10px] text-stone-400 mt-2">
                  Route: {result.regulatoryRoute}
                </div>
              </div>
            </div>

            {/* Why explanation */}
            <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed mb-6">
              <span className="font-bold text-amber-400 block mb-1 font-mono uppercase text-[10px]">
                Why this classification applies:
              </span>
              {result.why}
            </div>

            {/* Potential IP Areas & Compliance Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <h4 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Potential IP Protection Areas</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {result.potentialIPAreas.map((ip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{ip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <h4 className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Potential Compliance & Statutory Flags</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {result.potentialComplianceAreas.map((comp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">⚠</span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Callout */}
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-0.5">
                  Recommended Immediate Step:
                </span>
                <p className="text-xs text-stone-200">
                  {result.recommendedNextStep}
                </p>
              </div>

              <button
                onClick={() => onNavigate('ip_protection')}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition-all flex-shrink-0"
              >
                <span>Explore Protection Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
            <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Preliminary AI Screening: This automated diagnostic tool assists innovators in understanding potential regulatory pathways. It does not represent an official legal determination or guarantee licensing by the State Licensing Authority or CDSCO.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
