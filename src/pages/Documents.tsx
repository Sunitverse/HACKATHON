import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Shield,
  ArrowRight,
  RotateCcw,
  Loader2,
  BookOpen
} from 'lucide-react';
import { TabId } from '../components/Sidebar';
import { SourceCard } from '../components/SourceCard';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';

interface DocumentsProps {
  onNavigate: (tab: TabId) => void;
}

export const Documents: React.FC<DocumentsProps> = ({ onNavigate }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const sampleDocName = "Novel_Ayurvedic_Formulation_Ashwagandha_Liposomal.pdf";

  const handleUseSample = () => {
    setFileName(sampleDocName);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        title: "Novel Ayurvedic Herbal Formulation Proposal: Nano-Liposomal Ashwagandha Extract",
        detectedEntities: [
          { label: "Technical Innovation", val: "Phospholipid encapsulation of withanolides (enhanced blood-brain barrier permeability)" },
          { label: "Product Category", val: "Proprietary Ayurvedic Medicine / Phytopharmaceutical candidate" },
          { label: "Biological Resources", val: "Withania somnifera (L.) Dunal roots harvested in Madhya Pradesh" },
          { label: "Traditional Knowledge", val: "Medhya Rasayana indication documented in Charaka Samhita" },
          { label: "Commercial Intent", val: "Domestic Indian clinical launch + US Dietary Supplement export" }
        ],
        executiveSummary: "The document discloses a technical innovation involving nanoliposomal delivery of Withania somnifera withanolides to improve oral bioavailability. While the botanical source and cognitive indication are rooted in classical Medhya Rasayana tradition, the specific phospholipid encapsulation protocol constitutes a patent-eligible technical process under Indian patent law.",
        potentialIPAssets: [
          { type: "Process Patent", desc: "Claims restricted to the method of preparing nano-liposomes under specific homogenization pressures (Section 3(p) compliant)." },
          { type: "Trademark (Class 5)", desc: "Brand naming for the proprietary formulation (must avoid generic descriptive Sanskrit roots)." },
          { type: "Packaging Design", desc: "Specialized amber UV-protective dropper bottle (Locarno Class 09)." },
          { type: "Trade Secret", desc: "Exact ratio of phosphatidylcholine to purified withanolides." }
        ],
        regulatoryConsiderations: [
          "State Ayush Licensing Authority approval required under Rule 158-B of Drugs and Cosmetics Rules 1945.",
          "Because bioavailability and particle size are modified, an animal toxicity and pilot safety evaluation will be mandated by the Licensing Authority.",
          "Heavy metals, pesticide residues, and microbial load must conform strictly to Ayurvedic Pharmacopoeia of India (API) Part I standards."
        ],
        absFlags: [
          { flag: "Section 6 BDA Mandate", text: "Mandatory prior approval from National Biodiversity Authority (Form III) required BEFORE filing any patent in India or abroad." },
          { flag: "State Biodiversity Board Intimation", text: "Section 7 intimation required for commercial sourcing of Withania somnifera roots in Madhya Pradesh." }
        ],
        recommendedActions: [
          "File NBA Form III with National Biodiversity Authority Chennai immediately.",
          "Conduct an exhaustive prior art search on TKDL and InPASS focusing on phospholipid liposomes.",
          "File a provisional patent application with comparative dissolution data versus standard churna.",
          "Conduct trademark clearance search in Class 5."
        ],
        confidenceScore: 94,
        citedSources: [
          KNOWLEDGE_BASE.find(k => k.id === 'IN-001')!,
          KNOWLEDGE_BASE.find(k => k.id === 'IN-002')!,
          KNOWLEDGE_BASE.find(k => k.id === 'IN-003')!
        ]
      });
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      handleUseSample();
    }
  };

  const handleReset = () => {
    setFileName(null);
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-xs font-mono border border-amber-800 mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Intelligent Document Analysis Engine</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
          AI Document Screening & Proposal Audit
        </h1>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl">
          Upload your Ayurvedic R&D proposal, patent draft, or product brief to automatically screen for Traditional Knowledge conflicts, ABS requirements, and IP opportunities.
        </p>
      </div>

      {/* Upload Zone */}
      {!analysisResult && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-md flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-sm font-bold text-stone-100 font-serif mb-1">
            Drag & Drop Your Project Proposal or Dossier
          </h3>
          <p className="text-xs text-stone-400 max-w-md mb-4">
            Supports PDF, DOCX, or TXT documents. Documents are screened in-memory for hackathon demonstration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="cursor-pointer px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition-all">
              <span>Choose File to Upload</span>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleUseSample}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-400 border border-amber-500/30 font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use Sample Proposal (Ashwagandha Extract)</span>
            </button>
          </div>

          {isAnalyzing && (
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-amber-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Extracting entities, biological resources, and statutory citations...</span>
            </div>
          )}
        </div>
      )}

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
            {/* Header / File Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    DOCUMENT AUDIT REPORT
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                    Confidence: {analysisResult.confidenceScore}%
                  </span>
                </div>
                <h2 className="text-base font-bold text-stone-100 font-serif mt-1">
                  {analysisResult.title}
                </h2>
                <span className="text-[11px] font-mono text-stone-400">
                  File: {fileName}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Upload Another Document</span>
              </button>
            </div>

            {/* Detected Entities Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {analysisResult.detectedEntities.map((ent: any, idx: number) => (
                <div key={idx} className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5">
                    {ent.label}
                  </span>
                  <p className="text-xs font-semibold text-amber-200">
                    {ent.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Executive Summary */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed mb-6">
              <span className="font-bold text-amber-400 block mb-1 font-mono uppercase text-[10px]">
                Executive Diagnostic Summary:
              </span>
              {analysisResult.executiveSummary}
            </div>

            {/* Potential IP Assets & ABS Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* IP Opportunities */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <h4 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider mb-3">
                  Identified IP Asset Opportunities
                </h4>
                <div className="space-y-2.5">
                  {analysisResult.potentialIPAssets.map((asset: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-xs">
                      <span className="font-bold text-emerald-400 block mb-0.5">
                        {asset.type}
                      </span>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        {asset.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ABS & TK Flags */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <h4 className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider mb-3">
                  Critical Statutory & ABS Flags
                </h4>
                <div className="space-y-2.5">
                  {analysisResult.absFlags.map((flag: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-rose-950/20 rounded-lg border border-rose-800/40 text-xs">
                      <span className="font-bold text-rose-300 block mb-0.5">
                        ⚠ {flag.flag}
                      </span>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        {flag.text}
                      </p>
                    </div>
                  ))}

                  <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-xs">
                    <span className="font-bold text-stone-300 block mb-0.5">
                      Regulatory Compliance Path
                    </span>
                    <ul className="text-[11px] text-stone-400 space-y-1 mt-1">
                      {analysisResult.regulatoryConsiderations.map((reg: string, i: number) => (
                        <li key={i}>• {reg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Next Actions */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 mb-6">
              <span className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider block mb-2">
                Actionable Next Steps from Document Audit:
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-300">
                {analysisResult.recommendedActions.map((act: string, i: number) => (
                  <li key={i}>{act}</li>
                ))}
              </ol>
            </div>

            {/* Statutory Sources Cited */}
            <div>
              <span className="text-xs font-bold text-stone-300 font-mono uppercase tracking-wider block mb-3">
                Grounded Statutory Sources Cited in Audit
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {analysisResult.citedSources.map((src: any, i: number) => (
                  <SourceCard key={src.id} source={src} citationIndex={i + 1} />
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              Privacy Notice: Your document is processed transiently in memory for this demonstration and is not permanently stored or indexed. For production enterprise deployments, on-premise confidential LLM instances ensure full R&D proprietary data protection.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
