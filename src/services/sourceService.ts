import { KNOWLEDGE_BASE } from '../data/knowledgeBase';
import { IPDomain, Jurisdiction, KnowledgeRecord } from '../types';

export const SourceService = {
  getAllSources(): KnowledgeRecord[] {
    return KNOWLEDGE_BASE;
  },

  filterSources(params: {
    jurisdiction?: Jurisdiction | 'ALL';
    domain?: IPDomain | 'ALL';
    query?: string;
    sourceType?: string;
  }): KnowledgeRecord[] {
    return KNOWLEDGE_BASE.filter(item => {
      if (params.jurisdiction && params.jurisdiction !== 'ALL' && item.jurisdiction !== params.jurisdiction) {
        return false;
      }
      if (params.domain && params.domain !== 'ALL' && item.domain !== params.domain) {
        return false;
      }
      if (params.sourceType && params.sourceType !== 'ALL' && item.sourceType !== params.sourceType) {
        return false;
      }
      if (params.query && params.query.trim().length > 0) {
        const q = params.query.toLowerCase();
        const matches = 
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.authority.toLowerCase().includes(q) ||
          item.sourceName.toLowerCase().includes(q) ||
          (item.statutoryRef && item.statutoryRef.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  },

  retrieveForQuery(query: string, jurisdiction: Jurisdiction): KnowledgeRecord[] {
    const q = query.toLowerCase();
    const candidates = KNOWLEDGE_BASE.filter(item => item.jurisdiction === jurisdiction);

    const scored = candidates.map(item => {
      let score = 0;
      const text = `${item.title} ${item.content} ${item.domain} ${item.statutoryRef || ''} ${item.keyRule || ''}`.toLowerCase();
      
      const words = q.split(/\s+/).filter(w => w.length > 3);
      for (const word of words) {
        if (text.includes(word)) score += 2;
      }

      if (q.includes('patent') && item.domain === 'patent') score += 4;
      if ((q.includes('tradition') || q.includes('tkdl') || q.includes('classical')) && (item.domain === 'traditional_knowledge' || item.domain === 'tkdl')) score += 5;
      if ((q.includes('abs') || q.includes('biodiversity') || q.includes('nba')) && item.domain === 'abs') score += 5;
      if ((q.includes('brand') || q.includes('trademark')) && item.domain === 'trademark') score += 5;
      if ((q.includes('export') || q.includes('europe') || q.includes('international') || q.includes('wipo')) && (item.domain === 'export' || item.domain === 'wipo_gratk' || item.domain === 'pct' || item.domain === 'madrid')) score += 5;
      if ((q.includes('aahar') || q.includes('food')) && item.domain === 'ayurveda_aahar') score += 5;
      if ((q.includes('extract') || q.includes('process')) && (item.statutoryRef?.includes('3(p)') || item.domain === 'abs')) score += 4;

      return { item, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.filter(s => s.score > 0).slice(0, 4).map(s => s.item);

    // If no specific match, provide top 2 relevant foundational sources for that jurisdiction
    if (top.length === 0) {
      return candidates.slice(0, 3);
    }
    return top;
  }
};
