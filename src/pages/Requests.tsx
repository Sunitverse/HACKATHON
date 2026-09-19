import React, { useState } from 'react';
import {
  Users,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { FacilitatorRequest } from '../types';

interface RequestsProps {
  onOpenFacilitatorModal: () => void;
}

export const Requests: React.FC<RequestsProps> = ({ onOpenFacilitatorModal }) => {
  const [requests] = useState<FacilitatorRequest[]>([
    {
      id: 'REQ-2026-081',
      title: 'Section 3(p) Patent Specification Review: Bio-enhanced Ashwagandha Extract',
      category: 'Patentability & Prior Art Review',
      jurisdiction: 'INDIA',
      urgency: 'HIGH',
      status: 'Assigned to Accredited Ayush IP Attorney',
      submittedAt: 'Today, 09:30 AM',
      description: 'Requesting expert patent attorney review on whether our subcritical water extraction protocol adequately overcomes the Section 3(p) Traditional Knowledge objection citing Charaka Samhita.',
      assignedFacilitator: 'Dr. V. Ramanathan, Senior Patent Agent (Ayush Specialist)'
    },
    {
      id: 'REQ-2026-079',
      title: 'NBA Form III Prior Approval Filing: Western Ghats Endemic Flora',
      category: 'NBA / SBB Biodiversity Clearance',
      jurisdiction: 'INDIA',
      urgency: 'MEDIUM',
      status: 'Documentation Under Legal Review',
      submittedAt: 'Yesterday, 04:15 PM',
      description: 'Assistance required in drafting benefit-sharing calculations and completing Form III for submission to National Biodiversity Authority Chennai before PCT lodgment.',
      assignedFacilitator: 'Biodiversity Law Cell, Chennai'
    },
    {
      id: 'REQ-2026-072',
      title: 'EU THMPD vs Food Supplement Market Entry Dossier',
      category: 'International Market Authorization',
      jurisdiction: 'INTERNATIONAL',
      urgency: 'LOW',
      status: 'Regulatory Opinion Rendered',
      submittedAt: '18 Sep 2026',
      description: 'Assessment of Belgian positive plant list limits and EFSA novel food exemption threshold for proprietary turmeric formulation.',
      assignedFacilitator: 'Global Ayush Trade Facilitation Desk'
    }
  ]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Human-in-the-Loop Escalation Network</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
              Facilitator Requests & Expert Escalations
            </h1>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Connect directly with verified Ayush patent attorneys, biodiversity legal experts, and state licensing facilitators when AI screening identifies high-risk statutory hurdles.
            </p>
          </div>

          <button
            onClick={onOpenFacilitatorModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Lodge New Escalation</span>
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map(req => (
          <div
            key={req.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {req.id}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  req.urgency === 'HIGH'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-stone-800 text-stone-300'
                }`}>
                  {req.urgency} URGENCY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                  {req.jurisdiction}
                </span>
              </div>

              <span className="text-[11px] text-stone-500 font-mono">
                Submitted: {req.submittedAt}
              </span>
            </div>

            <h3 className="text-sm font-bold text-stone-100 font-serif">
              {req.title}
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-xl border border-stone-800/80">
              {req.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-stone-400">
                <span className="text-[11px] font-mono">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {req.status}
                </span>
              </div>

              {req.assignedFacilitator && (
                <div className="text-[11px] text-stone-400 font-mono">
                  Assigned: <span className="text-amber-300">{req.assignedFacilitator}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SLA / Legal Notice */}
      <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-400 leading-relaxed">
        <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <span>
          Facilitator Network Standard: In compliance with Smart India Hackathon guidelines, complex queries flagged with Section 3(p) bars or Section 6 NBA requirements can be escalated directly to registered patent attorneys and Ayush incubation centers for formal legal representation.
        </span>
      </div>
    </div>
  );
};
