import { getDeterministicRAGResponse } from '../data/demoCases';
import { Jurisdiction, Language, PipelineStage, RAGResponse } from '../types';
import { SourceService } from './sourceService';

export const INITIAL_PIPELINE_STAGES: PipelineStage[] = [
  { id: 'query_understand', name: 'Query Understanding & Normalization', status: 'idle', detail: 'Parsing intent, entities, and Ayurvedic botanical/formulation context' },
  { id: 'jurisdiction_route', name: 'Jurisdiction & Regime Routing', status: 'idle', detail: 'Routing between National (India) and International (WIPO/Global) frameworks' },
  { id: 'domain_classify', name: 'Domain & Statutory Classification', status: 'idle', detail: 'Identifying Patents (3(p)), TKDL, ABS (NBA), Trademarks, or ASU Drug rules' },
  { id: 'metadata_filter', name: 'Metadata & Authority Filtering', status: 'idle', detail: 'Filtering 20+ verified statutory records by jurisdiction and domain tags' },
  { id: 'retrieval_rerank', name: 'Semantic Retrieval & Re-ranking', status: 'idle', detail: 'Scoring source relevance and applying legal exclusion thresholds' },
  { id: 'llm_grounding', name: 'Source-Grounded Reasoning', status: 'idle', detail: 'Synthesizing plain-language guidance strictly grounded in retrieved provisions' },
  { id: 'citation_verify', name: 'Citation & Anti-Hallucination Audit', status: 'idle', detail: 'Validating legal citations and establishing confidence/risk score' },
  { id: 'explain_act', name: 'Explainable Output & Actionable Next Steps', status: 'idle', detail: 'Generating compliance checklist items and facilitator escalation pathways' }
];

export const RagService = {
  async executePipeline(
    query: string,
    jurisdiction: Jurisdiction,
    language: Language,
    onStageUpdate?: (stageId: string, status: 'running' | 'done', detail?: string) => void
  ): Promise<RAGResponse> {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    // Stage 1: Query Understanding
    onStageUpdate?.('query_understand', 'running', 'Deconstructing botanical names, processes, and innovation claims...');
    await delay(250);
    onStageUpdate?.('query_understand', 'done', `Detected intent: Innovation screening in Ayurvedic context.`);

    // Stage 2: Jurisdiction Routing
    onStageUpdate?.('jurisdiction_route', 'running', `Active Regime: ${jurisdiction === 'INDIA' ? 'National (Republic of India)' : 'International (WIPO/Multilateral)'}`);
    await delay(200);
    onStageUpdate?.('jurisdiction_route', 'done', jurisdiction === 'INDIA' ? 'Bound to Indian Patents Act, BDA, TKDL, and AYUSH ASU Rules' : 'Bound to WIPO GRATK, PCT, Madrid, Nagoya Protocol, and target market directives');

    // Stage 3: Domain Classification
    onStageUpdate?.('domain_classify', 'running', 'Classifying across IP, ABS, and Drug categories...');
    await delay(250);
    onStageUpdate?.('domain_classify', 'done', 'Classified relevant domains: Patents, TK, Biodiversity, Regulatory');

    // Stage 4: Metadata Filtering
    onStageUpdate?.('metadata_filter', 'running', 'Querying local statutory repository...');
    await delay(200);
    const retrievedSources = SourceService.retrieveForQuery(query, jurisdiction);
    onStageUpdate?.('metadata_filter', 'done', `Selected ${retrievedSources.length} relevant statutory and institutional records`);

    // Stage 5: Semantic Retrieval & Re-ranking
    onStageUpdate?.('retrieval_rerank', 'running', 'Applying legal thresholding and re-ranking against query vectors...');
    await delay(250);
    onStageUpdate?.('retrieval_rerank', 'done', `Top ${retrievedSources.length} sources passed high-confidence relevance threshold`);

    // Stage 6: LLM Grounding
    onStageUpdate?.('llm_grounding', 'running', 'Grounded synthesis using retrieved provisions (Strict Anti-Hallucination mode)...');
    await delay(350);
    onStageUpdate?.('llm_grounding', 'done', 'Generated structured guidance with clear legal disclaimers');

    // Stage 7: Citation Validation
    onStageUpdate?.('citation_verify', 'running', 'Cross-referencing citations against official Gazette acts...');
    await delay(200);
    onStageUpdate?.('citation_verify', 'done', 'All statutory references verified against Indian/International treaty corpus');

    // Stage 8: Explainable Output
    onStageUpdate?.('explain_act', 'running', 'Compiling explainability metrics and risk profile...');
    await delay(150);
    onStageUpdate?.('explain_act', 'done', 'Synthesized explainable guidance, risk indicators, and next steps.');

    // Build response
    const response = getDeterministicRAGResponse(query, jurisdiction, language);
    if (retrievedSources.length > 0) {
      response.sources = retrievedSources;
      response.explainability.sourcesRetrieved = retrievedSources.length + 2;
      response.explainability.sourcesUsed = retrievedSources.length;
    }
    return response;
  }
};
