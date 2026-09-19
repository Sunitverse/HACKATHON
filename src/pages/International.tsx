import React, { useState } from 'react';
import {
  Globe2,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Building2,
  Compass
} from 'lucide-react';
import { TabId } from '../components/Sidebar';
import { Jurisdiction } from '../types';

interface InternationalProps {
  onNavigate: (tab: TabId) => void;
  onSetJurisdiction: (j: Jurisdiction) => void;
}

export const International: React.FC<InternationalProps> = ({ onNavigate, onSetJurisdiction }) => {
  const [selectedCountry, setSelectedCountry] = useState('European Union');

  const countryProfiles: Record<string, {
    flag: string;
    title: string;
    ipPathway: string;
    regulatoryConsiderations: string;
    tkAbsConsiderations: string;
    requiredResearch: string[];
    governingBodies: string[];
  }> = {
    'European Union': {
      flag: '🇪🇺',
      title: 'European Union (EMA & EFSA)',
      ipPathway: 'European Patent Office (EPO) via PCT filing. Unitary Patent protection covers 17 EU member states. Madrid System for European Union Trade Mark (EUTM).',
      regulatoryConsiderations: 'Directive 2004/24/EC (THMPD) simplified registration requires 30 years traditional use, including 15 years within the EU. Because classical Indian formulations typically lack 15-year EU sales records, brands overwhelmingly enter under Directive 2002/46/EC as Food Supplements via EFSA.',
      tkAbsConsiderations: 'EU ABS Regulation (Regulation (EU) No 511/2014) enforces Nagoya Protocol compliance. Due diligence declarations required at patent and commercialization stages proving legal acquisition in India (NBA IRCC).',
      requiredResearch: [
        'Screen botanicals against European Pharmacopoeia and national positive/negative herbal lists (e.g. Belgian Royal Decree)',
        'Verify permissible maximum limits for heavy metals (lead, cadmium, mercury) and aflatoxins',
        'Verify novel food status under Regulation (EU) 2015/2283 if non-traditional extraction was used'
      ],
      governingBodies: ['European Medicines Agency (EMA / HMPC)', 'European Food Safety Authority (EFSA)', 'EUIPO']
    },
    'United States': {
      flag: '🇺🇸',
      title: 'United States (US FDA & USPTO)',
      ipPathway: 'USPTO Utility Patent via PCT National Phase. Trademarks via Madrid Protocol or direct USPTO Lanham Act application in Class 5.',
      regulatoryConsiderations: 'Ayurvedic formulations are marketed almost exclusively as Dietary Supplements under DSHEA 1994 (21 CFR Part 111 cGMP). Therapeutic curative claims are strictly barred without full Botanical Drug Development IND approval.',
      tkAbsConsiderations: 'US is not a party to the CBD or Nagoya Protocol, but the May 2024 WIPO GRATK Treaty will require disclosure of Indian genetic resources and traditional knowledge in patent applications.',
      requiredResearch: [
        'Verify New Dietary Ingredient (NDI) notification requirements for novel extract fractions',
        'Prepare 21 CFR Part 101 compliant Supplement Facts nutrition box',
        'Incorporate mandatory FDA disclaimer statement on front label'
      ],
      governingBodies: ['US FDA (Center for Food Safety and Applied Nutrition)', 'USPTO', 'FTC (Advertising)']
    },
    'Japan': {
      flag: '🇯🇵',
      title: 'Japan (PMDA & JPO)',
      ipPathway: 'Japan Patent Office (JPO) via PCT. Madrid System for trademark registration.',
      regulatoryConsiderations: 'Traditional herbal medicine is governed under the Kampo medicine framework. Non-Kampo Ayurvedic products are generally marketed as Health Foods or Foods with Function Claims (FFC) under the Consumer Affairs Agency.',
      tkAbsConsiderations: 'Japan is a contracting party to the Nagoya Protocol with a domestic ABS Clearing-House. Proof of legal procurement from India is closely scrutinized.',
      requiredResearch: [
        'Review MHLW non-drug list classification for Ayurvedic raw ingredients',
        'Prepare safety dossiers in Japanese with pesticide residue profiles'
      ],
      governingBodies: ['Pharmaceuticals and Medical Devices Agency (PMDA)', 'Consumer Affairs Agency (CAA)', 'JPO']
    },
    'United Kingdom': {
      flag: '🇬🇧',
      title: 'United Kingdom (MHRA & FSA)',
      ipPathway: 'UK Intellectual Property Office (UKIPO) direct or via PCT. Madrid System with UK designation.',
      regulatoryConsiderations: 'Traditional Herbal Registration (THR) scheme under Human Medicines Regulations 2012 requires 30 years traditional use (at least 15 in UK/EU). Most brands enter via Food Standards Agency (FSA) as food supplements.',
      tkAbsConsiderations: 'UK Nagoya Protocol regulations enforced through the Office for Product Safety and Standards (OPSS). Due diligence audits conducted at UK customs.',
      requiredResearch: [
        'Comply with UK Food Standards Agency novel food authorizations post-Brexit',
        'THR certification mark eligibility check'
      ],
      governingBodies: ['Medicines and Healthcare products Regulatory Agency (MHRA)', 'Food Standards Agency (FSA)', 'UKIPO']
    },
    'GCC / Middle East': {
      flag: '🇦🇪',
      title: 'GCC & Middle East (MoHAP / SFDA)',
      ipPathway: 'GCC Patent Office or national offices (UAE, Saudi Arabia SFDA). Madrid System for UAE/Oman/Bahrain.',
      regulatoryConsiderations: 'Ayurvedic formulations can be registered as "Herbal & Alternative Medicines" under dedicated complementary medicine tracks in UAE (MoHAP) and Saudi Arabia (SFDA). Requires Certificate of Pharmaceutical Product (CPP) from India.',
      tkAbsConsiderations: 'Nagoya compliance certificates required for biological imports into GCC ports.',
      requiredResearch: [
        'Alcohol content restrictions for classical Asava/Arishta formulations (Halal compliance)',
        'Bilingual Arabic-English packaging and leaflet translation'
      ],
      governingBodies: ['UAE Ministry of Health & Prevention (MoHAP)', 'Saudi Food and Drug Authority (SFDA)']
    }
  };

  const currentProfile = countryProfiles[selectedCountry] || countryProfiles['European Union'];

  const treatyCards = [
    { title: 'WIPO GRATK Treaty (2024)', desc: 'Mandatory international patent disclosure of country of origin for genetic resources & associated traditional knowledge.', ref: 'Adopted May 2024 Geneva' },
    { title: 'PCT (Patent Cooperation Treaty)', desc: 'Single application filing covering 157 countries with 30-month national phase delay.', ref: 'WIPO International Bureau' },
    { title: 'Madrid System', desc: 'Centralized international brand and trademark registration covering 131 countries based on home application.', ref: 'Madrid Protocol' },
    { title: 'Nagoya Protocol / CBD', desc: 'Prior Informed Consent (PIC) and Mutually Agreed Terms (MAT) for cross-border biological resource transfer.', ref: 'UNEP / CBD Secretariat' },
    { title: 'TRIPS Agreement', desc: 'WTO framework protecting IP standards while providing public health and traditional knowledge flexibilities.', ref: 'Article 27.3(b)' },
    { title: 'Hague System', desc: 'International registration of industrial packaging shapes and cosmetic applicators across 90+ countries.', ref: 'WIPO Geneva Act' },
    { title: 'Budapest Treaty', desc: 'International recognition of microbial deposits (such as novel fermentation yeasts in Asavas) for patent enablement.', ref: 'WIPO IDA Network' },
    { title: 'EU THMPD (Directive 2004/24/EC)', desc: 'Simplified registration framework for herbal medicines requiring 15-year traditional use within the European Union.', ref: 'European Parliament' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-xs font-mono border border-blue-800 mb-2">
              <Globe2 className="w-3.5 h-3.5" />
              <span>International Regime Navigator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
              Global Ayurvedic IP & Regulatory Systems
            </h1>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Strict separation between domestic Indian laws and international multilateral treaties (WIPO GRATK, Madrid, PCT, Nagoya Protocol, and target market botanical drug rules).
            </p>
          </div>

          <button
            onClick={() => onSetJurisdiction('INTERNATIONAL')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Switch Assistant to Global Mode</span>
          </button>
        </div>
      </div>

      {/* Multilateral Treaties Bento Grid */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-3">
          Key Multilateral Treaties & International Conventions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {treatyCards.map((t, idx) => (
            <div key={idx} className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-stone-100">{t.title}</h4>
                </div>
                <p className="text-[11px] text-stone-400 leading-snug mb-3">
                  {t.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono text-blue-400 block pt-1 border-t border-stone-800">
                {t.ref}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Target Export Country Navigator */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-800">
          <div>
            <h3 className="text-sm font-bold text-stone-100 font-serif">
              Target Market Regulatory & IP Matrix
            </h3>
            <p className="text-xs text-stone-400">
              Select destination country to evaluate local classification hurdles, IP filing, and Nagoya due diligence:
            </p>
          </div>

          {/* Country Selector Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(countryProfiles).map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedCountry === country
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-blue-500/50'
                }`}
              >
                {countryProfiles[country].flag} {country}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Country Deep Dive */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentProfile.flag}</span>
            <h2 className="text-lg font-bold text-stone-100 font-serif">
              {currentProfile.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* IP Pathway */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1.5">
                Target Jurisdiction IP Pathway:
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">
                {currentProfile.ipPathway}
              </p>
            </div>

            {/* Regulatory Route */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1.5">
                Target Market Regulatory Considerations:
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">
                {currentProfile.regulatoryConsiderations}
              </p>
            </div>
          </div>

          {/* Nagoya Protocol / ABS Obligations */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1.5">
              Traditional Knowledge & Biological-Resource Due Diligence:
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              {currentProfile.tkAbsConsiderations}
            </p>
          </div>

          {/* Required Further Research Checklist */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider block mb-2">
              Mandatory Cross-Border Research Checkpoints:
            </span>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {currentProfile.requiredResearch.map((res, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">→</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsible Governing Bodies */}
          <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-stone-400 font-mono text-[11px]">Governing Agencies:</span>
            <div className="flex flex-wrap gap-2">
              {currentProfile.governingBodies.map((gov, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 text-[11px] font-mono">
                  {gov}
                </span>
              ))}
            </div>
          </div>

          {/* Action to AI Assistant */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                onSetJurisdiction('INTERNATIONAL');
                onNavigate('assistant');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Ask AI Assistant for {selectedCountry} Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
