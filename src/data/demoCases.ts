import { Jurisdiction, Language, RAGResponse } from '../types';

export interface PreloadedDemoCase {
  id: string;
  title: string;
  query: string;
  jurisdiction: Jurisdiction;
  domains: string[];
  shortDesc: string;
}

export const PRELOADED_DEMO_CASES: PreloadedDemoCase[] = [
  {
    id: 'case-1',
    title: 'Classical Formulation Patentability',
    query: 'Can I patent a classical Ayurvedic formulation?',
    jurisdiction: 'INDIA',
    domains: ['patent', 'traditional_knowledge', 'tkdl'],
    shortDesc: 'Evaluates Section 3(p) exclusion, TKDL prior art citations, and alternative branding protections.'
  },
  {
    id: 'case-2',
    title: 'Novel Extraction Process',
    query: 'I developed a novel extraction process that improves stability of an active component in an Ayurvedic formulation.',
    jurisdiction: 'INDIA',
    domains: ['patent', 'abs', 'regulatory'],
    shortDesc: 'Examines technical contribution, comparative synergy, NBA Form III approval, and process patentability.'
  },
  {
    id: 'case-3',
    title: 'European Market Export',
    query: 'I want to export and commercialise my Ayurvedic wellness product in Europe.',
    jurisdiction: 'INTERNATIONAL',
    domains: ['regulatory', 'pct', 'madrid', 'nagoya_cbd'],
    shortDesc: 'Analyzes EU THMPD 15-year requirement, EFSA food supplement route, Madrid trademark, and Nagoya ABS.'
  },
  {
    id: 'case-4',
    title: 'Commercial Plant Resource Screening',
    query: 'I am sourcing an Indian medicinal plant from forest communities for a commercial wellness product.',
    jurisdiction: 'INDIA',
    domains: ['abs', 'traditional_knowledge', 'regulatory'],
    shortDesc: 'Screens National Biodiversity Authority compliance, State Biodiversity Board intimation, and benefit-sharing.'
  }
];

export const FULL_DEMO_QUERY = 
  "I developed a novel herbal extraction process for an Ayurvedic formulation using an Indian medicinal plant. I want to commercialise it in India and later export it.";

export function getDeterministicRAGResponse(
  query: string, 
  jurisdiction: Jurisdiction, 
  lang: Language = 'en'
): RAGResponse {
  const normalizedQuery = query.toLowerCase();

  // Full demo or novel extraction query
  if (
    normalizedQuery.includes('novel') || 
    normalizedQuery.includes('extraction') || 
    normalizedQuery.includes('later export') || 
    normalizedQuery.includes('process')
  ) {
    return {
      query,
      jurisdiction,
      language: lang,
      quickAnswer: lang === 'hi' 
        ? "आपकी तकनीकी निष्कर्षण प्रक्रिया (Extraction Process) पेटेंट योग्य हो सकती है, लेकिन शास्त्रीय मिश्रण पर स्वतः पेटेंट नहीं मिलता।"
        : lang === 'mr'
        ? "तुमची नवीन निष्कर्षण प्रक्रिया (Extraction Process) पेटंटपात्र ठरू शकते, परंतु थेट शास्त्रीय सूत्रावर पेटंट मिळत नाही."
        : "Your novel extraction process may qualify for patent protection, provided it demonstrates clear technical innovation over classical methods, but the baseline formulation cannot be monopolized under Section 3(p). Prior NBA approval is mandatory before filing.",
      whyItMatters: "Inventions involving Indian medicinal plants must navigate two critical Indian statutes simultaneously: The Patents Act 1970 (Section 3(p) non-patentability of Traditional Knowledge) and the Biological Diversity Act 2002 (Section 6 mandatory NBA prior approval). For subsequent international export, WIPO GRATK mandatory origin disclosure and target country botanical regulations apply.",
      relevantAreas: [
        {
          title: "Process Patent (Indian Patents Act Section 3(p) & 3(d))",
          description: "A novel extraction method resulting in significantly increased biomarker purity or enhanced bioavailability is eligible for process claims with comparative chromatography data.",
          tag: "IP Protection"
        },
        {
          title: "NBA Form III Clearance (Biological Diversity Act 2002)",
          description: "Mandatory prior approval from the National Biodiversity Authority (NBA) is required BEFORE submitting a patent application in India or via PCT.",
          tag: "Statutory ABS"
        },
        {
          title: "International Export Strategy (PCT & WIPO GRATK)",
          description: "Filing via the Patent Cooperation Treaty (PCT) preserves priority across 157 countries. The 2024 WIPO GRATK Treaty mandates explicit disclosure of Indian genetic resource origin.",
          tag: "Global Route"
        },
        {
          title: "ASU Regulatory Licensing (Rule 158-B)",
          description: "If the extract modifies traditional dosage forms, it is classified as a Proprietary Ayurvedic Medicine requiring proof of safety and stability.",
          tag: "AYUSH Compliance"
        }
      ],
      potentialConcerns: [
        {
          title: "Section 3(p) Traditional Knowledge Objection",
          description: "Examiners will consult TKDL. If the extraction simply mirrors classical decoction (Kwatha) or oil preparation (Taila Paka), the claim will be rejected as obvious.",
          severity: "MEDIUM"
        },
        {
          title: "Section 6 Biodiversity Non-Compliance",
          description: "Applying for patent rights without NBA Form III approval can invalidate the patent application and carries penal liability under Section 55.",
          severity: "HIGH"
        },
        {
          title: "Foreign Export Classification Divergence",
          description: "A product approved as an Ayurvedic medicine in India is typically classified as a Dietary Supplement or Novel Food in Western export jurisdictions.",
          severity: "MEDIUM"
        }
      ],
      recommendedNextSteps: [
        "Conduct an exhaustive prior-art and TKDL search to pinpoint exact technical differences in the extraction parameters (temperature, solvent, yield).",
        "Submit Form III application to the National Biodiversity Authority (NBA Chennai) before lodging the provisional patent specification.",
        "Document comparative bioavailability assays proving enhanced therapeutic efficacy over the standard classical preparation.",
        "Secure trade mark protection under Class 5 for the proprietary extract brand name.",
        "Consult an experienced AYUSH patent attorney and prepare a PCT international application roadmap within 12 months."
      ],
      sources: [
        {
          id: 'kb-in-01',
          title: 'Section 3(p) - Traditional Knowledge Exclusion',
          jurisdiction: 'INDIA',
          domain: 'patent',
          authority: 'Office of the CGPDTM (IP India)',
          content: 'An invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention within the meaning of the Patents Act 1970.',
          sourceName: 'The Patents Act, 1970 (as amended)',
          sourceUrl: 'https://ipindia.gov.in',
          sourceType: 'OFFICIAL SOURCE',
          version: 'Patents Act No. 39 of 1970',
          lastUpdated: '2024-03-15',
          statutoryRef: 'Section 3(p), Patents Act 1970',
          keyRule: 'Direct classical formulations are excluded from patentability.'
        },
        {
          id: 'kb-in-04',
          title: 'Biodiversity Act Mandatory Approval for Patent Filing (Section 6)',
          jurisdiction: 'INDIA',
          domain: 'abs',
          authority: 'National Biodiversity Authority (NBA), Chennai',
          content: 'No person shall apply for any intellectual property right for any invention based on research or information on a biological resource obtained from India without previous approval of NBA.',
          sourceName: 'Biological Diversity Act, 2002 & Amendment Act 2023',
          sourceUrl: 'http://nbaindia.org',
          sourceType: 'OFFICIAL SOURCE',
          version: 'NBA Guidelines & Form III Protocol',
          lastUpdated: '2024-02-01',
          statutoryRef: 'Section 6 & Section 19(2), BDA 2002',
          keyRule: 'NBA Form III is mandatory prior to filing patent in India or PCT.'
        },
        {
          id: 'kb-int-01',
          title: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (GRATK)',
          jurisdiction: 'INTERNATIONAL',
          domain: 'wipo_gratk',
          authority: 'World Intellectual Property Organization (WIPO), Geneva',
          content: 'Mandatory international requirement for patent applicants whose claimed inventions are based on genetic resources to disclose the country of origin.',
          sourceName: 'WIPO GRATK Treaty (Adopted May 2024)',
          sourceUrl: 'https://www.wipo.int/tk/en/treaties/gratk/',
          sourceType: 'OFFICIAL SOURCE',
          version: 'WIPO Diplomatic Conference Final Act',
          lastUpdated: '2024-06-01',
          statutoryRef: 'Articles 3 & 4, WIPO GRATK Treaty',
          keyRule: 'Global patent applications must declare Indian genetic resource origin.'
        }
      ],
      confidence: 'HIGH',
      confidenceReason: "Grounded directly in Section 3(p) of the Indian Patents Act, Section 6 of the Biological Diversity Act, and the May 2024 WIPO GRATK Treaty.",
      explainability: {
        queryInterpretation: "Request involves a technical process invention (herbal extraction) utilizing Indian medicinal bio-resources with both domestic commercialisation and future export intent.",
        detectedDomains: ["Patents (Process)", "Traditional Knowledge", "Access & Benefit Sharing (NBA)", "Export/PCT"],
        jurisdiction: jurisdiction,
        sourcesRetrieved: 6,
        sourcesUsed: 3,
        relevanceThreshold: "0.82 cosine similarity against statutory repository",
        reasoning: "The extraction process provides technical contribution, distinguishing it from non-patentable classical recipes under Section 3(p). Because biological resources are sourced in India, Section 6 of the Biological Diversity Act triggers mandatory NBA approval. Export intentions trigger international disclosure obligations under the WIPO GRATK Treaty."
      },
      risks: {
        patentability: 'MEDIUM',
        traditionalKnowledge: 'MEDIUM',
        abs: 'HIGH',
        regulatory: 'MEDIUM',
        jurisdiction: 'LOW',
        citationConfidence: 'HIGH'
      },
      timestamp: new Date().toISOString()
    };
  }

  // Classical formulation patent question
  if (normalizedQuery.includes('classical') || (normalizedQuery.includes('patent') && !normalizedQuery.includes('process'))) {
    return {
      query,
      jurisdiction,
      language: lang,
      quickAnswer: lang === 'hi'
        ? "शास्त्रीय आयुर्वेदिक फॉर्म्युलेशन (Classical Formulation) पर सीधा पेटेंट प्राप्त नहीं किया जा सकता।"
        : lang === 'mr'
        ? "शास्त्रीय आयुर्वेदिक सूत्रावर थेट पेटंट मिळवणे कायद्यानुसार शक्य नाही."
        : "A classical Ayurvedic formulation cited in authoritative Samhitas cannot be patented in India under Section 3(p) of the Patents Act 1970, nor internationally due to extensive TKDL prior art documentation.",
      whyItMatters: "Classical formulations (such as Chyawanprash, Triphala Churna, or Dashamularishta) reside in the public domain as sovereign Traditional Knowledge. Attempting to patent them constitutes biopiracy and violates Section 3(p) and Section 3(e). However, you CAN protect your unique brand identity, proprietary delivery formats, or distinctive packaging.",
      relevantAreas: [
        {
          title: "Trademark Protection (Class 5)",
          description: "Register a distinctive, coined brand name for your classical formulation. Generic Sanskrit names cannot be trademarked.",
          tag: "Recommended IP"
        },
        {
          title: "Industrial Design Registration",
          description: "Protect unique bottle shapes, applicators, or hermetic tamper-proof dosage dispensers under the Designs Act 2000.",
          tag: "Aesthetic IP"
        },
        {
          title: "Classical ASU License (Schedule I)",
          description: "Manufacturing follows classical texts listed in the First Schedule of the Drugs & Cosmetics Act without requiring costly clinical trial clearances.",
          tag: "Regulatory Route"
        }
      ],
      potentialConcerns: [
        {
          title: "Immediate Rejection under Section 3(p)",
          description: "Any patent claim directly covering known compositions will be summarily refused by the Indian Patent Office.",
          severity: "HIGH"
        },
        {
          title: "TKDL Third-Party Observation",
          description: "CSIR-TKDL routinely files third-party observations with international patent offices (USPTO, EPO) to cancel biopiracy claims.",
          severity: "HIGH"
        },
        {
          title: "Descriptive Trademark Bar",
          description: "Attempting to trademark words like 'Triphala' or 'Ashwagandha' will be refused under Section 9(1)(b) of the Trade Marks Act.",
          severity: "MEDIUM"
        }
      ],
      recommendedNextSteps: [
        "Focus on creating a strong, distinctive brand name (arbitrary or coined) and file for Trademark registration in Class 5.",
        "Obtain a Classical Ayurvedic Drug Manufacturing License under the Drugs & Cosmetics Act from your State Licensing Authority.",
        "Invest in proprietary packaging design and secure industrial design registration under the Designs Act 2000.",
        "If you develop a genuinely novel delivery vehicle (e.g., nano-emulsion or buccal strip), explore a patent on that delivery vehicle only."
      ],
      sources: [
        {
          id: 'kb-in-01',
          title: 'Section 3(p) - Traditional Knowledge Exclusion',
          jurisdiction: 'INDIA',
          domain: 'patent',
          authority: 'Office of the CGPDTM (IP India)',
          content: 'An invention which in effect is traditional knowledge or an aggregation of known properties of traditionally known component is not an invention.',
          sourceName: 'The Patents Act, 1970 (as amended)',
          sourceUrl: 'https://ipindia.gov.in',
          sourceType: 'OFFICIAL SOURCE',
          version: 'Act No. 39 of 1970',
          lastUpdated: '2024-03-15',
          statutoryRef: 'Section 3(p), Patents Act 1970',
          keyRule: 'Classical formulations are strictly non-patentable.'
        },
        {
          id: 'kb-in-02',
          title: 'TKDL Prior Art Mechanism',
          jurisdiction: 'INDIA',
          domain: 'tkdl',
          authority: 'CSIR & Ministry of Ayush',
          content: 'Contains transcribed classical formulations from Sanskrit and regional texts into global patent examiner languages to prevent misappropriation.',
          sourceName: 'Traditional Knowledge Digital Library Institutional Framework',
          sourceUrl: 'https://www.tkdl.res.in',
          sourceType: 'OFFICIAL SOURCE',
          version: 'TKDL 2022',
          lastUpdated: '2024-01-10',
          statutoryRef: 'Section 13 & 25, Patents Act 1970',
          keyRule: 'Direct classical formulations are documented prior art worldwide.'
        }
      ],
      confidence: 'HIGH',
      confidenceReason: "Statutory bar under Section 3(p) of the Patents Act 1970 is unambiguous and reinforced by established patent examination guidelines.",
      explainability: {
        queryInterpretation: "Inquiry into patenting a classical/shastric Ayurvedic recipe without modifying its constituent components.",
        detectedDomains: ["Patents", "Traditional Knowledge", "TKDL", "Trademarks"],
        jurisdiction: jurisdiction,
        sourcesRetrieved: 5,
        sourcesUsed: 2,
        relevanceThreshold: "0.94 cosine similarity against statutory repository",
        reasoning: "Classical Ayurvedic recipes are documented heritage and lack novelty. Statutory exclusion under Section 3(p) bars patent grants."
      },
      risks: {
        patentability: 'HIGH',
        traditionalKnowledge: 'HIGH',
        abs: 'LOW',
        regulatory: 'LOW',
        jurisdiction: 'LOW',
        citationConfidence: 'HIGH'
      },
      timestamp: new Date().toISOString()
    };
  }

  // Default international query
  if (jurisdiction === 'INTERNATIONAL' || normalizedQuery.includes('europe') || normalizedQuery.includes('export') || normalizedQuery.includes('international')) {
    return {
      query,
      jurisdiction: 'INTERNATIONAL',
      language: lang,
      quickAnswer: lang === 'hi'
        ? "अंतरराष्ट्रीय निर्यात के लिए आपको लक्ष्य देश के हर्बल/खाद्य नियमों और मैड्रिड ट्रेडमार्क प्रणाली का पालन करना होगा।"
        : lang === 'mr'
        ? "आंतरराष्ट्रीय निर्यातीसाठी तुम्हाला त्या देशातील नियम आणि माद्रिद प्रणालीनुसार ट्रेडमार्क नोंदणी करावी लागेल."
        : "International commercialisation requires strict separation of IP filing routes (PCT, Madrid System) from target-jurisdiction regulatory classifications (e.g. EU THMPD vs EFSA Food Supplement, or US FDA DSHEA vs Botanical Drug).",
      whyItMatters: "Ayurvedic products face significant regulatory divergence abroad. In the European Union, the Traditional Herbal Medicinal Products Directive (Directive 2004/24/EC) demands 15 years of documented use within the EU, prompting most Indian brands to enter as Food Supplements. Internationally, the 2024 WIPO GRATK Treaty mandates genetic resource disclosure.",
      relevantAreas: [
        {
          title: "Madrid System Trademark Protection",
          description: "File an international trademark application based on your Indian basic mark to protect your Ayurvedic brand in up to 130 countries under Class 5 or Class 3.",
          tag: "Global Trademark"
        },
        {
          title: "EU Regulatory Route (EFSA Food Supplement)",
          description: "Most Ayurvedic products enter the EU under Directive 2002/46/EC as food supplements with permissible wellness claims, avoiding the prohibitive 15-year THMPD medicinal requirement.",
          tag: "Target Market"
        },
        {
          title: "Nagoya Protocol & WIPO GRATK Disclosure",
          description: "Provide documented proof of legal procurement in India (NBA clearance / IRCC) to satisfy foreign border checkpoints and patent offices.",
          tag: "ABS Compliance"
        }
      ],
      potentialConcerns: [
        {
          title: "Heavy Metal & Contaminant Thresholds",
          description: "EU and US import inspectors rigorously test for lead, arsenic, mercury, and pesticide residues. Classical Rasashastra formulations containing Bhasmas face immediate customs seizure.",
          severity: "HIGH"
        },
        {
          title: "Unauthorized Therapeutic Claims",
          description: "Making disease treatment claims on dietary supplements triggers US FDA Warning Letters and EU member-state criminal penalties.",
          severity: "HIGH"
        },
        {
          title: "Home Trademark Vulnerability",
          description: "Under the Madrid System, a cancellation of the Indian base trademark within 5 years automatically invalidates all international registrations.",
          severity: "MEDIUM"
        }
      ],
      recommendedNextSteps: [
        "Audit heavy metals, microbial limits, and pesticide residues according to European Pharmacopoeia / US Pharmacopeia standards.",
        "Obtain Certificate of Analysis (CoA) from a NABL-accredited laboratory verifying compliance with export guidelines.",
        "File an international trademark application under the Madrid Protocol through the Indian Trade Marks Registry.",
        "Formulate packaging labels strictly compliant with target country food/supplement labelling regulations, avoiding any medicinal curative claims."
      ],
      sources: [
        {
          id: 'kb-int-06',
          title: 'EU Traditional Herbal Medicinal Products Directive (THMPD)',
          jurisdiction: 'INTERNATIONAL',
          domain: 'regulatory',
          authority: 'European Medicines Agency (EMA)',
          content: 'Requires documentation showing traditional medicinal use for 30 years prior to application, including 15 years in the EU.',
          sourceName: 'Directive 2004/24/EC',
          sourceUrl: 'https://www.ema.europa.eu',
          sourceType: 'OFFICIAL SOURCE',
          version: 'Directive 2004/24/EC',
          lastUpdated: '2023-09-05',
          statutoryRef: 'Directive 2004/24/EC',
          keyRule: 'Herbal medicines without 15-year EU history cannot obtain simplified medicinal registration.'
        },
        {
          id: 'kb-int-04',
          title: 'Madrid System for the International Registration of Trademarks',
          jurisdiction: 'INTERNATIONAL',
          domain: 'madrid',
          authority: 'WIPO Madrid Registry',
          content: 'Centralized mechanism to register and manage trademark portfolios across 131 countries using one application in English.',
          sourceName: 'Madrid Protocol Concerning the International Registration of Marks',
          sourceUrl: 'https://www.wipo.int/madrid/en/',
          sourceType: 'OFFICIAL SOURCE',
          version: 'WIPO Madrid Protocol',
          lastUpdated: '2024-02-10',
          statutoryRef: 'Article 3, Madrid Protocol',
          keyRule: 'Enables global brand reservation linked to basic Indian application.'
        }
      ],
      confidence: 'HIGH',
      confidenceReason: "Rooted in European Medicines Agency directives, WIPO Madrid System guidelines, and international food supplement harmonization standards.",
      explainability: {
        queryInterpretation: "Inquiry on cross-border commercialisation, regulatory approval, and IP protection for an Ayurvedic product entering international jurisdictions.",
        detectedDomains: ["Export / International", "Madrid System (Trademarks)", "EU THMPD / EFSA", "WIPO GRATK / Nagoya Protocol"],
        jurisdiction: 'INTERNATIONAL',
        sourcesRetrieved: 5,
        sourcesUsed: 2,
        relevanceThreshold: "0.88 cosine similarity against international treaties",
        reasoning: "International expansion requires routing through global treaties (Madrid/PCT) and navigating target market food vs medicinal safety thresholds."
      },
      risks: {
        patentability: 'LOW',
        traditionalKnowledge: 'LOW',
        abs: 'MEDIUM',
        regulatory: 'HIGH',
        jurisdiction: 'HIGH',
        citationConfidence: 'HIGH'
      },
      timestamp: new Date().toISOString()
    };
  }

  // Fallback for general queries
  return {
    query,
    jurisdiction,
    language: lang,
    quickAnswer: lang === 'hi'
      ? "आयुर्वेदिक नवाचार में बौद्धिक संपदा सुरक्षा पेटेंट, ट्रेडमार्क और जैव विविधता अनुपालन (NBA) के समन्वय पर निर्भर करती है।"
      : lang === 'mr'
      ? "आयुर्वेदिक नाविन्यपूर्ण उत्पादनांसाठी पेटंट, ट्रेडमार्क आणि जैवविविधता मंडळाच्या (NBA) परवानग्या आवश्यक असतात."
      : "Ayurvedic innovation guidance requires analyzing technical contribution against classical Samhitas, securing trademark rights, and verifying Access and Benefit Sharing (ABS) compliance under the Biological Diversity Act.",
    whyItMatters: "Ayurvedic products are unique: pure classical recipes belong to the public domain as sovereign Traditional Knowledge, whereas novel technological processing, improved bioavailability, or specialized delivery systems may be patentable. Commercialization always triggers biodiversity and regulatory checks.",
    relevantAreas: [
      {
        title: "Patentability Evaluation (Section 3(p) Check)",
        description: "Assess whether your formulation or process demonstrates non-obvious technical advantages beyond known Ayurvedic properties.",
        tag: "Patents"
      },
      {
        title: "Brand & Design Protection",
        description: "Secure arbitrary trademarks in Class 5 (medicinal) or Class 3 (cosmetics) alongside industrial designs for packaging.",
        tag: "Branding"
      },
      {
        title: "National Biodiversity Authority (NBA) Review",
        description: "Verify if obtaining biological resources from India mandates Form I or Form III clearance under the Biological Diversity Act 2002.",
        tag: "Statutory ABS"
      }
    ],
    potentialConcerns: [
      {
        title: "Traditional Knowledge Prior Art Bar",
        description: "Risk of rejection if ingredients and indications are documented in the Ayurvedic Pharmacopoeia of India.",
        severity: "MEDIUM"
      },
      {
        title: "Regulatory Licensing Distinction",
        description: "Ensure correct classification between Classical Medicine, Proprietary Medicine, or Ayurveda-Aahar food product.",
        severity: "MEDIUM"
      }
    ],
    recommendedNextSteps: [
      "Use our Smart Product Classification wizard to determine your exact regulatory pathway.",
      "Screen raw materials for biological resource provenance and State Biodiversity Board intimation.",
      "Conduct a comprehensive prior-art search across IP India and TKDL references.",
      "Consult a registered Patent & Trademark attorney specialized in AYUSH innovations."
    ],
    sources: [
      {
        id: 'kb-in-01',
        title: 'Section 3(p) - Traditional Knowledge Exclusion',
        jurisdiction: 'INDIA',
        domain: 'patent',
        authority: 'Office of the CGPDTM (IP India)',
        content: 'An invention which in effect is traditional knowledge or an aggregation of known properties is excluded from patentability.',
        sourceName: 'The Patents Act, 1970',
        sourceUrl: 'https://ipindia.gov.in',
        sourceType: 'OFFICIAL SOURCE',
        version: 'Act No. 39 of 1970',
        lastUpdated: '2024-03-15',
        statutoryRef: 'Section 3(p), Patents Act 1970',
        keyRule: 'Section 3(p) is the benchmark statutory exclusion.'
      },
      {
        id: 'kb-in-06',
        title: 'ASU Drugs Licensing: Classical vs Proprietary',
        jurisdiction: 'INDIA',
        domain: 'regulatory',
        authority: 'Ministry of Ayush',
        content: 'Distinguishes Shastric classical formulations from proprietary medicines requiring Rule 158-B proof of safety.',
        sourceName: 'Drugs and Cosmetics Act 1940 & Rules 1945',
        sourceUrl: 'https://ayush.gov.in',
        sourceType: 'OFFICIAL SOURCE',
        version: 'Chapter IV-A ASU Rules',
        lastUpdated: '2023-12-05',
        statutoryRef: 'Section 3(a) & 3(h), DCA 1940',
        keyRule: 'Classical requires no clinical trial; proprietary requires safety documentation.'
      }
    ],
    confidence: 'HIGH',
    confidenceReason: "Synthesized from core statutory provisions under the Patents Act 1970, Drugs & Cosmetics Act 1940, and Biological Diversity Act 2002.",
    explainability: {
      queryInterpretation: "General inquiry into intellectual property and regulatory pathways for an Ayurvedic product or innovation.",
      detectedDomains: ["Patents", "Trademarks", "ABS", "Regulatory Licensing"],
      jurisdiction,
      sourcesRetrieved: 4,
      sourcesUsed: 2,
      relevanceThreshold: "0.79 baseline similarity",
      reasoning: "Identified foundational intersection of traditional knowledge exclusions, biodiversity permissions, and trademarking strategy."
    },
    risks: {
      patentability: 'MEDIUM',
      traditionalKnowledge: 'MEDIUM',
      abs: 'MEDIUM',
      regulatory: 'MEDIUM',
      jurisdiction: 'LOW',
      citationConfidence: 'HIGH'
    },
    timestamp: new Date().toISOString()
  };
}
