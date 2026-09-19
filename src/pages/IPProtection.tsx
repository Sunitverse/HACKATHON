import React, { useState } from 'react';
import {
  Lightbulb,
  Shield,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  FileCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { TabId } from '../components/Sidebar';

interface IPProtectionProps {
  onNavigate: (tab: TabId) => void;
}

export const IPProtection: React.FC<IPProtectionProps> = ({ onNavigate }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('PATENT');
  const [patentQuery, setPatentQuery] = useState(
    "I developed a novel extraction process that improves stability of an active component in an Ayurvedic formulation."
  );
  const [showPatentScreening, setShowPatentScreening] = useState(false);

  const ipCards = [
    {
      id: 'PATENT',
      name: 'PATENTS',
      tag: 'Technical Contribution',
      whatItProtects: 'Novel, non-obvious industrial processes, extraction techniques, stabilized delivery systems, or synergistic pharmaceutical formulations with unexpected efficacy.',
      whenItMatters: 'When you develop an extraction parameter, purification method, or bio-enhanced formulation demonstrably superior to classical text methods.',
      keyQuestions: [
        'Does the extraction use non-traditional solvents or proprietary temperature/pressure curves?',
        'Do you possess comparative chromatography showing higher active constituent recovery?',
        'Can you demonstrate synergistic bio-availability over individual components?'
      ],
      potentialConcerns: [
        'Section 3(p) Traditional Knowledge exclusion under Indian Patents Act',
        'Section 3(d) enhancement of therapeutic efficacy threshold',
        'Section 3(e) mere admixture bar'
      ],
      relevantSources: 'Patents Act 1970, Manual of Patent Office Practice, TKDL, PCT'
    },
    {
      id: 'TK',
      name: 'TRADITIONAL KNOWLEDGE',
      tag: 'Heritage & Prior Art',
      whatItProtects: 'Sovereign community heritage, centuries-old formulations in classical treatises (Samhitas), and indigenous healing methods held in the public domain.',
      whenItMatters: 'Before investing in patent filings, to verify if your formulation is already documented in the Ayurvedic Pharmacopoeia of India or CSIR-TKDL.',
      keyQuestions: [
        'Is the therapeutic indication verbatim in Charaka or Sushruta Samhita?',
        'Has this herbal combination been used for identical indications in folklore?',
        'Could patent examiners cite TKDL to reject your claims as prior art?'
      ],
      potentialConcerns: [
        'Inability to patent shastric compositions directly',
        'Third-party pre-grant or post-grant opposition by CSIR-TKDL worldwide'
      ],
      relevantSources: 'TKDL Institutional Portal, Ayush Pharmacopoeia, First Schedule DCA 1940'
    },
    {
      id: 'TRADEMARK',
      name: 'TRADEMARKS',
      tag: 'Brand Identity',
      whatItProtects: 'Distinctive brand names, logos, coined product titles, symbols, and packaging trade dress in Class 5 (pharmaceuticals) or Class 3 (cosmetics).',
      whenItMatters: 'Always essential. Classical medicines cannot be patented, so brand reputation is the single primary intellectual property asset.',
      keyQuestions: [
        'Is the brand name arbitrary or coined rather than generic descriptive?',
        'Does the mark avoid common Sanskrit herb names like Ashwagandha or Brahmi?',
        'Have you conducted a clearance search on the IP India public trademark database?'
      ],
      potentialConcerns: [
        'Refusal under Section 9(1)(b) for descriptive botanical names',
        'Deceptive similarity to existing ayurvedic pharmaceutical trademarks'
      ],
      relevantSources: 'Trade Marks Act 1999, Trade Marks Rules 2017, Nice Classification Class 5'
    },
    {
      id: 'GI',
      name: 'GEOGRAPHICAL INDICATIONS',
      tag: 'Collective Community Right',
      whatItProtects: 'Agricultural goods, natural botanical herbs, or regional formulations originating in a specific territory endowed with unique reputation or characteristics.',
      whenItMatters: 'For community cooperatives and regional farmer associations cultivating indigenous herbs (e.g. Navara rice, Kangra tea, Malabar pepper).',
      keyQuestions: [
        'Is the product linked to specific soil, climate, or traditional harvesting practices?',
        'Are you representing a collective producers group rather than an individual entity?'
      ],
      potentialConcerns: [
        'Private corporations cannot own exclusive private ownership over a GI',
        'Strict inspection council quality adherence required'
      ],
      relevantSources: 'Geographical Indications of Goods Act 1999, GI Registry Chennai'
    },
    {
      id: 'DESIGN',
      name: 'INDUSTRIAL DESIGNS',
      tag: 'Visual Aesthetics',
      whatItProtects: 'Novel aesthetic shapes, configurations, patterns, or ornamentation applied to physical packaging articles (e.g., Shirodhara dispensers, roll-ons, jars).',
      whenItMatters: 'When your customer experience relies on a distinctive, ergonomic herbal dispenser, herb grinder, or tamper-evident jar.',
      keyQuestions: [
        'Is the shape purely aesthetic rather than a functional mechanical invention?',
        'Has the packaging shape been publicly published anywhere in India or abroad prior to filing?'
      ],
      potentialConcerns: [
        'Functional mechanical features are not registrable under the Designs Act 2000'
      ],
      relevantSources: 'The Designs Act 2000, Locarno Classification Class 09 / Class 24'
    },
    {
      id: 'COPYRIGHT',
      name: 'COPYRIGHT',
      tag: 'Literary & Artistic',
      whatItProtects: 'Original educational brochures, clinical compendiums, therapeutic diet manuals, proprietary software code, and distinctive label graphic artwork.',
      whenItMatters: 'To prevent competitors from duplicating your educational marketing collateral, clinical monograph layouts, or diagnostic mobile apps.',
      keyQuestions: [
        'Is the literary or graphical content an original creative expression?',
        'Have you secured explicit work-for-hire assignment deeds from graphic designers?'
      ],
      potentialConcerns: [
        'Copyright does not protect underlying medical ideas, recipes, or functional techniques'
      ],
      relevantSources: 'The Copyright Act 1957, Copyright Office New Delhi'
    },
    {
      id: 'PLANT_VARIETY',
      name: 'PLANT VARIETY PROTECTION',
      tag: 'PPV&FR',
      whatItProtects: 'New, extant, and farmers varieties of medicinal plants demonstrating Distinctiveness, Uniformity, and Stability (DUS).',
      whenItMatters: 'When agronomists or tribal farmers breed high-yield or drought-resistant medicinal plant cultivars.',
      keyQuestions: [
        'Has the medicinal cultivar undergone systematic DUS field trials?',
        'Are benefit-sharing mechanisms established with traditional tribal conservers?'
      ],
      potentialConcerns: [
        'Whole plants and plant varieties cannot be patented under Section 3(j) of Patents Act'
      ],
      relevantSources: 'PPV&FR Act 2001, Protection of Plant Varieties Authority'
    },
    {
      id: 'TRADE_SECRET',
      name: 'TRADE SECRETS / KNOW-HOW',
      tag: 'Confidential Methods',
      whatItProtects: 'Proprietary processing temperatures, specialized fermentation yeasts, supplier networks, and confidential recipe balances.',
      whenItMatters: 'When an extraction protocol may face Section 3(p) objections at the patent office but can be kept secret indefinitely through NDAs.',
      keyQuestions: [
        'Is the process impossible to reverse-engineer from the finished retail product?',
        'Are strict Non-Disclosure Agreements (NDAs) enforced across lab staff?'
      ],
      potentialConcerns: [
        'Vulnerable to employee departure or independent discovery without statutory monopoly'
      ],
      relevantSources: 'Indian Contract Act 1872 Section 27, Common Law of Breach of Confidence'
    }
  ];

  const currentCard = ipCards.find(c => c.id === selectedDomain) || ipCards[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-xs font-mono border border-amber-800 mb-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Interactive Ayurvedic IP Architecture Map</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          IP Protection Pathways for Herbal Innovations
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          Ayurvedic products require a multi-layered intellectual property strategy combining patents, brand protection, designs, and traditional knowledge screening.
        </p>
      </div>

      {/* Visual Innovation Map Flowchart */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-2">
          <h3 className="text-xs font-bold text-stone-200 font-mono uppercase tracking-wider">
            Innovation Routing Architecture
          </h3>
          <span className="text-[10px] text-stone-500 font-mono">
            Click any domain node below to inspect details
          </span>
        </div>

        {/* Tree Flow Representation */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col items-center text-xs">
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold shadow-md">
            YOUR AYURVEDIC INNOVATION
          </div>

          <div className="w-0.5 h-4 bg-stone-700 my-1"></div>

          <div className="w-full max-w-md flex items-center justify-between border-t-2 border-stone-700 pt-2 px-6">
            {/* Left Branch: Technical */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
                Technical Contribution
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
                <button
                  onClick={() => setSelectedDomain('PATENT')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'PATENT'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  Patent
                </button>
                <button
                  onClick={() => setSelectedDomain('TRADE_SECRET')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'TRADE_SECRET'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  Trade Secret
                </button>
                <button
                  onClick={() => setSelectedDomain('PLANT_VARIETY')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'PLANT_VARIETY'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  Plant Variety
                </button>
              </div>
            </div>

            {/* Right Branch: Commercial / Brand */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">
                Brand & Aesthetics
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
                <button
                  onClick={() => setSelectedDomain('TRADEMARK')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'TRADEMARK'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-emerald-500/50'
                  }`}
                >
                  Trademark
                </button>
                <button
                  onClick={() => setSelectedDomain('DESIGN')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'DESIGN'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-emerald-500/50'
                  }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setSelectedDomain('GI')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'GI'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-emerald-500/50'
                  }`}
                >
                  GI
                </button>
                <button
                  onClick={() => setSelectedDomain('COPYRIGHT')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedDomain === 'COPYRIGHT'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-emerald-500/50'
                  }`}
                >
                  Copyright
                </button>
              </div>
            </div>
          </div>

          <div className="w-0.5 h-4 bg-stone-700 my-2"></div>

          {/* Statutory Verification Gates */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDomain('TK')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                selectedDomain === 'TK'
                  ? 'bg-purple-900 text-purple-200 border-purple-600'
                  : 'bg-stone-900 text-stone-300 border-stone-800'
              }`}
            >
              <span>🌿 Traditional Knowledge Check</span>
            </button>
            <span className="text-stone-600">→</span>
            <button
              onClick={() => onNavigate('abs')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-emerald-400 border border-emerald-800/80 transition-all flex items-center gap-1"
            >
              <span>🌱 ABS Review (NBA)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Domain Deep Dive Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold">
              {currentCard.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100 font-serif">
                {currentCard.name}
              </h2>
              <span className="text-[10px] font-mono text-amber-400">
                Category: {currentCard.tag}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-400">
              Primary Sources: {currentCard.relevantSources}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
              What It Protects:
            </span>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              {currentCard.whatItProtects}
            </p>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
              When It Matters:
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              {currentCard.whenItMatters}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block mb-1.5">
                Key Strategic Questions:
              </span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {currentCard.keyQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">?</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block mb-1.5">
                Statutory Concerns & Rejection Risks:
              </span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {currentCard.potentialConcerns.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400">⚠</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onNavigate('assistant')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md"
          >
            <span>Ask AI Assistant About {currentCard.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Patentability Navigator Component */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-stone-100 font-serif">
            Patentability Navigator (Section 3(p) Screening Engine)
          </h2>
        </div>
        <p className="text-xs text-stone-400 mb-4">
          Input your innovation details to evaluate potential novelty, technical contribution, and Section 3(p) Traditional Knowledge bars.
        </p>

        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={patentQuery}
              onChange={e => setPatentQuery(e.target.value)}
              placeholder="Describe your innovation (e.g., extraction technique, biomarker stabilization, or bio-enhancement)..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() =>
                setPatentQuery(
                  "I developed a novel extraction process that improves stability of an active component in an Ayurvedic formulation."
                )
              }
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
            >
              <span>Load Sample: Novel Extraction Process</span>
            </button>

            <button
              onClick={() => setShowPatentScreening(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Screen Patentability</span>
            </button>
          </div>
        </div>

        {/* Screening Results Panel */}
        {showPatentScreening && (
          <div className="mt-6 pt-5 border-t border-stone-800 space-y-4">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-3">
                PATENT SCREENING RESULTS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs mb-4">
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-400 block mb-1">
                    Novelty Assessment:
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    Potentially Relevant (Process Eligible)
                  </span>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Process claims may overcome product bars if extraction parameters are unprecedented.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-400 block mb-1">
                    Technical Contribution:
                  </span>
                  <span className="text-amber-400 font-bold font-mono">
                    Requires Further Assessment
                  </span>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Must establish enhanced bioavailability or stability via HPLC/chromatography data.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-400 block mb-1">
                    Traditional Knowledge:
                  </span>
                  <span className="text-amber-400 font-bold font-mono">
                    Potential Review Required
                  </span>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Section 3(p) will be cited if the extraction mimics classical Kwatha / Taila methods.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-400 block mb-1">
                    Biological-Resource Consideration:
                  </span>
                  <span className="text-rose-400 font-bold font-mono">
                    Potentially Relevant (NBA Mandate)
                  </span>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Section 6 of Biological Diversity Act requires NBA Form III before patent lodgment.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-400 block mb-1">
                    Prior-Art Search:
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    Recommended Immediately
                  </span>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Screen TKDL, InPASS (IPO), and Google Patents prior to filing specification.
                  </p>
                </div>
              </div>

              {/* Next Actions */}
              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                <span className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider block mb-2">
                  Recommended Structured Next Actions:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-300">
                  <li>Document the technical innovation with verifiable experimental yield data.</li>
                  <li>Search relevant prior art across Indian and international patent repositories.</li>
                  <li>Check Traditional Knowledge sources and the Ayurvedic Pharmacopoeia of India.</li>
                  <li>Review biological-resource considerations and obtain NBA Form III clearance.</li>
                  <li>Obtain professional IP review from an accredited AYUSH patent attorney before filing.</li>
                </ol>
              </div>
            </div>

            {/* Critical Legal Guardrail */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-stone-300 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Crucial Guardrail: This is preliminary diagnostic screening. IP-SAKTI never claims "You will get a patent." Patentability determinations remain the exclusive statutory prerogative of the Controller General of Patents, Designs and Trade Marks.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
