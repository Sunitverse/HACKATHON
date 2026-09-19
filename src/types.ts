export type Jurisdiction = 'INDIA' | 'INTERNATIONAL';
export type Language = 'en' | 'hi' | 'mr';

export type IPDomain = 
  | 'patent' 
  | 'traditional_knowledge' 
  | 'tkdl' 
  | 'trademark' 
  | 'gi' 
  | 'design' 
  | 'copyright' 
  | 'plant_variety' 
  | 'trade_secret' 
  | 'abs' 
  | 'regulatory' 
  | 'ayurveda_aahar' 
  | 'export'
  | 'trips'
  | 'pct'
  | 'madrid'
  | 'nagoya_cbd'
  | 'wipo_gratk';

export interface KnowledgeRecord {
  id: string;
  title: string;
  jurisdiction: Jurisdiction;
  domain: IPDomain;
  authority: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: 'OFFICIAL SOURCE' | 'DEMO KNOWLEDGE';
  version: string;
  lastUpdated: string;
  statutoryRef?: string;
  keyRule?: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'done';
  detail: string;
}

export interface RiskProfile {
  patentability: 'LOW' | 'MEDIUM' | 'HIGH';
  traditionalKnowledge: 'LOW' | 'MEDIUM' | 'HIGH';
  abs: 'LOW' | 'MEDIUM' | 'HIGH';
  regulatory: 'LOW' | 'MEDIUM' | 'HIGH';
  jurisdiction: 'LOW' | 'MEDIUM' | 'HIGH';
  citationConfidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RAGResponse {
  query: string;
  jurisdiction: Jurisdiction;
  language: Language;
  quickAnswer: string;
  whyItMatters: string;
  relevantAreas: { title: string; description: string; tag?: string }[];
  potentialConcerns: { title: string; description: string; severity: 'LOW' | 'MEDIUM' | 'HIGH' }[];
  recommendedNextSteps: string[];
  sources: KnowledgeRecord[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceReason: string;
  clarifyingQuestion?: string;
  explainability: {
    queryInterpretation: string;
    detectedDomains: string[];
    jurisdiction: string;
    sourcesRetrieved: number;
    sourcesUsed: number;
    relevanceThreshold: string;
    reasoning: string;
  };
  risks: RiskProfile;
  timestamp: string;
}

export interface ClassificationAnswers {
  productType: string;
  authoritativeText: string;
  biologicalResources: string;
  traditionalKnowledge: string;
  intendedActivity: string;
  novelTechnicalComponent: string;
}

export interface ClassificationResult {
  likelyCategory: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  why: string;
  potentialIPAreas: string[];
  potentialComplianceAreas: string[];
  regulatoryRoute: string;
  statutoryProvision: string;
  recommendedNextStep: string;
}

export interface ABSScreeningAnswers {
  involvesBioResources: string;
  resourceOrigin: string;
  traditionalKnowledgeLinked: string;
  activityPurpose: string;
  commercialIntent: string;
  foreignPartyInvolvement: string;
}

export interface ABSScreeningResult {
  relevance: 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  statutoryBasis: string;
  mandatoryApprovals: string[];
  exemptionsEvaluated: string;
  recommendedAction: string;
}

export interface FacilitatorRequest {
  id: string;
  name?: string;
  organization?: string;
  email?: string;
  jurisdiction: Jurisdiction;
  domain?: string;
  category?: string;
  urgency: 'Standard' | 'Priority' | 'Immediate' | 'HIGH' | 'MEDIUM' | 'LOW';
  question?: string;
  createdAt?: string;
  submittedAt?: string;
  status: string;
  title?: string;
  description?: string;
  assignedFacilitator?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: 'Classification' | 'IP Search' | 'TK / Biodiversity' | 'Regulatory & Approval' | 'Legal Verification';
  completed: boolean;
  statutoryTip: string;
  jurisdictionTarget: 'ALL' | 'INDIA' | 'INTERNATIONAL';
}
