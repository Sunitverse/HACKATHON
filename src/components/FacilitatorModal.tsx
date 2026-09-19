import React, { useState } from 'react';
import { X, CheckCircle, Send, UserCheck, Shield, Clock } from 'lucide-react';
import { FacilitatorRequest, Jurisdiction } from '../types';

interface FacilitatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeJurisdiction: Jurisdiction;
}

export const FacilitatorModal: React.FC<FacilitatorModalProps> = ({
  isOpen,
  onClose,
  activeJurisdiction
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Aarav Sharma',
    organization: 'AyurVeda BioSciences Pvt Ltd',
    email: 'aarav@ayurvedabio.in',
    jurisdiction: activeJurisdiction,
    domain: 'Patent & NBA Section 6',
    urgency: 'Priority' as 'Standard' | 'Priority' | 'Immediate',
    question: 'We require formal verification of our extraction protocol before filing an NBA Form III application in Chennai.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="bg-emerald-950 border-b border-emerald-800/80 px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-100 font-serif">
                Talk to an Ayush IP Facilitator
              </h3>
              <p className="text-[11px] text-emerald-300">
                Institutional Escalation & Expert Guidance (Ayush IP Cell)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-100">
                  Request Lodged with Ayush IP Cell
                </h4>
                <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                  Your inquiry reference <span className="font-mono text-amber-400 font-bold">#AYUSH-IP-2026-8492</span> has been routed to an accredited patent facilitator.
                </p>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-[11px] text-stone-400 text-left space-y-1 font-mono">
                <div>Organization: {formData.organization}</div>
                <div>Domain: {formData.domain}</div>
                <div>Assigned Cell: National Ayush IP Facilitation Center (TIFAC / MoA)</div>
                <div>Estimated Turnaround: 24-48 Working Hours</div>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Innovator / Contact Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Organization / Startup / Clinic</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Official Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Urgency Level</label>
                  <select
                    value={formData.urgency}
                    onChange={e => setFormData({ ...formData, urgency: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Standard">Standard (3-5 days)</option>
                    <option value="Priority">Priority Filing (24-48 hrs)</option>
                    <option value="Immediate">Critical Statutory Deadline</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Specific IP / ABS Concern</label>
                <textarea
                  rows={3}
                  required
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-start gap-2 text-[10px] text-stone-400">
                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  Demo Mode Simulation: This form routes requests to the accredited Ayush IP Facilitation portal. In this prototype, submission records are held in memory for judge verification.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-stone-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-emerald-950 font-bold hover:bg-amber-400 transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Facilitator Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
