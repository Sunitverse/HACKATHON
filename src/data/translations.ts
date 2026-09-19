import { Language } from '../types';

export interface TranslationStrings {
  brandName: string;
  tagline: string;
  sihBadge: string;
  navDashboard: string;
  navAssistant: string;
  navClassification: string;
  navIPProtection: string;
  navTK: string;
  navABS: string;
  navInternational: string;
  navDocuments: string;
  navSources: string;
  navChecklist: string;
  navRequests: string;
  navArchitecture: string;
  navSettings: string;
  tryFullDemo: string;
  judgeDemo: string;
  jurisdictionIndia: string;
  jurisdictionInternational: string;
  indiaSpecificBadge: string;
  internationalBadge: string;
  assistantTitle: string;
  assistantSubtitle: string;
  inputPlaceholder: string;
  askButton: string;
  pipelineTitle: string;
  answerTitle: string;
  whyItMattersTitle: string;
  relevantAreasTitle: string;
  potentialConcernsTitle: string;
  nextStepsTitle: string;
  sourcesTitle: string;
  confidenceTitle: string;
  explainabilityTitle: string;
  disclaimer: string;
  riskTitle: string;
  talkToFacilitator: string;
  quickPrompts: { label: string; query: string }[];
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    brandName: "IP-SAKTI Sahayak",
    tagline: "AI-powered Intellectual Property & Regulatory Guidance for Ayurveda",
    sihBadge: "Smart India Hackathon 2026 • SIH26045",
    navDashboard: "Dashboard",
    navAssistant: "AI Assistant",
    navClassification: "Product Classification",
    navIPProtection: "IP Protection",
    navTK: "Traditional Knowledge",
    navABS: "ABS Compliance",
    navInternational: "International",
    navDocuments: "Document Analysis",
    navSources: "Knowledge Sources",
    navChecklist: "Compliance Checklist",
    navRequests: "Requests & Facilitator",
    navArchitecture: "How IP-SAKTI Works",
    navSettings: "Settings & System",
    tryFullDemo: "Try Full Demo",
    judgeDemo: "Judge Demo (3-min)",
    jurisdictionIndia: "India",
    jurisdictionInternational: "International",
    indiaSpecificBadge: "India-specific guidance (Patents Act, NBA, TKDL, ASU)",
    internationalBadge: "International guidance (WIPO, PCT, Madrid, Nagoya, THMPD)",
    assistantTitle: "IP-SAKTI AI Assistant",
    assistantSubtitle: "Ask about Ayurvedic IP, Traditional Knowledge, ABS, regulation or international protection.",
    inputPlaceholder: "Describe your Ayurvedic product, innovation, extraction or IP question...",
    askButton: "Analyze Query",
    pipelineTitle: "Knowledge Retrieval & Verification Pipeline",
    answerTitle: "Synthesized Guidance",
    whyItMattersTitle: "Why It Matters",
    relevantAreasTitle: "Relevant IP & Regulatory Domains",
    potentialConcernsTitle: "Potential Concerns & Statutory Flags",
    nextStepsTitle: "Recommended Next Steps",
    sourcesTitle: "Verified Citations & Sources",
    confidenceTitle: "Retrieval Confidence",
    explainabilityTitle: "Explainable Reasoning: Why am I seeing this answer?",
    disclaimer: "Legal Notice: IP-SAKTI Sahayak provides preliminary informational screening and guidance based on retrieved statutory sources. It does not constitute formal legal counsel or guarantee patentability.",
    riskTitle: "Potential Risk Indicators",
    talkToFacilitator: "Talk to an Ayush IP Facilitator",
    quickPrompts: [
      { label: "Classify my product", query: "Help me classify my Ayurvedic formulation between classical and proprietary." },
      { label: "Can I patent my formulation?", query: "Can I patent a classical Ayurvedic formulation?" },
      { label: "Novel extraction process", query: "I developed a novel extraction process for an Ayurvedic formulation using an Indian medicinal plant." },
      { label: "Check Traditional Knowledge", query: "How do I check if my herbal formula infringes Traditional Knowledge or TKDL prior art?" },
      { label: "Do I need ABS review?", query: "Do I need National Biodiversity Authority (NBA) approval before filing a patent for an Indian plant?" },
      { label: "Protect Ayurvedic brand", query: "Can I trademark botanical Sanskrit herb names like Ashwagandha or Brahmi in India?" },
      { label: "Explore international export", query: "What are the regulatory and IP requirements to sell an Ayurvedic supplement in the EU and USA?" }
    ]
  },
  hi: {
    brandName: "आईपी-शक्ति सहायक",
    tagline: "आयुर्वेद नवाचार के लिए एआई-संचालित बौद्धिक संपदा एवं विनियामक मार्गदर्शन",
    sihBadge: "स्मार्ट इंडिया हैकथॉन 2026 • SIH26045",
    navDashboard: "डैशबोर्ड",
    navAssistant: "एआई सहायक",
    navClassification: "उत्पाद वर्गीकरण",
    navIPProtection: "बौद्धिक संपदा सुरक्षा",
    navTK: "पारंपरिक ज्ञान (TK)",
    navABS: "एबीएस अनुपालन (NBA)",
    navInternational: "अंतरराष्ट्रीय व्यवस्था",
    navDocuments: "दस्तावेज़ विश्लेषण",
    navSources: "ज्ञान स्रोत एवं संदर्भ",
    navChecklist: "अनुपालन चेकलिस्ट",
    navRequests: "सुविधाकर्ता अनुरोध",
    navArchitecture: "आईपी-शक्ति कार्यप्रणाली",
    navSettings: "सेटिंग्स",
    tryFullDemo: "पूर्ण डेमो चलाएं",
    judgeDemo: "जज डेमो (3 मिनट)",
    jurisdictionIndia: "भारत (India)",
    jurisdictionInternational: "अंतरराष्ट्रीय (Global)",
    indiaSpecificBadge: "भारत-विशिष्ट मार्गदर्शन (पेटेंट अधिनियम, एनबीए, टीकेडीएल, आयुष)",
    internationalBadge: "अंतरराष्ट्रीय मार्गदर्शन (वाइपो, पीसीटी, मैड्रिड, नगोया संधि)",
    assistantTitle: "आईपी-शक्ति एआई सहायक",
    assistantSubtitle: "आयुर्वेदिक आईपी, पारंपरिक ज्ञान, एबीएस, औषधि नियम या वैश्विक सुरक्षा के बारे में पूछें।",
    inputPlaceholder: "अपने आयुर्वेदिक उत्पाद, निष्कर्षण प्रक्रिया या बौद्धिक संपदा प्रश्न का विवरण दें...",
    askButton: "विश्लेषण करें",
    pipelineTitle: "ज्ञान खोज एवं सत्यापन पाइपलाइन",
    answerTitle: "प्रमाणित मार्गदर्शन",
    whyItMattersTitle: "यह क्यों महत्वपूर्ण है?",
    relevantAreasTitle: "प्रासंगिक आईपी और विनियामक क्षेत्र",
    potentialConcernsTitle: "संभावित आपत्तियां और जोखिम",
    nextStepsTitle: "अनुशंसित अगले कदम",
    sourcesTitle: "सत्यापित स्रोत एवं उद्धरण",
    confidenceTitle: "विश्वास स्तर (Confidence)",
    explainabilityTitle: "तर्क एवं व्याख्या: यह उत्तर क्यों दिखाया गया?",
    disclaimer: "कानूनी सूचना: आईपी-शक्ति सहायक वैधानिक स्रोतों पर आधारित प्रारंभिक सूचनात्मक मार्गदर्शन प्रदान करता है। यह औपचारिक विधिक परामर्श या पेटेंट की गारंटी नहीं है।",
    riskTitle: "संभावित जोखिम संकेतक",
    talkToFacilitator: "आयुष आईपी सुविधाकर्ता से बात करें",
    quickPrompts: [
      { label: "उत्पाद वर्गीकरण", query: "मेरी शास्त्रीय और मालिकाना आयुर्वेदिक दवा का सही वर्गीकरण क्या है?" },
      { label: "क्या शास्त्रीय नुस्खा पेटेंट हो सकता है?", query: "क्या मैं शास्त्रीय आयुर्वेदिक फॉर्म्युलेशन पर पेटेंट प्राप्त कर सकता हूँ?" },
      { label: "नवीन निष्कर्षण प्रक्रिया", query: "मैंने एक औषधीय पौधे के लिए एक नवीन निष्कर्षण विधि विकसित की है, क्या यह पेटेंट योग्य है?" },
      { label: "पारंपरिक ज्ञान जांचें", query: "टीकेडीएल (TKDL) और पारंपरिक ज्ञान संबंधी जांच कैसे करें?" },
      { label: "क्या एनबीए मंजूरी जरूरी है?", query: "क्या भारतीय पौधे पर पेटेंट फाइल करने से पहले राष्ट्रीय जैव विविधता प्राधिकरण की अनुमति चाहिए?" },
      { label: "ब्रांड ट्रेडमार्क सुरक्षा", query: "क्या अश्वगंधा या ब्राह्मी जैसे सामान्य नामों पर ट्रेडमार्क मिल सकता है?" },
      { label: "विदेशों में निर्यात", query: "यूरोप और अमेरिका में आयुर्वेदिक उत्पाद बेचने के विनियामक और आईपी नियम क्या हैं?" }
    ]
  },
  mr: {
    brandName: "आयपी-शक्ती सहायक",
    tagline: "आयुर्वेद नवकल्पनांसाठी एआय-सक्षम बौद्धिक संपदा व नियामक मार्गदर्शन",
    sihBadge: "स्मार्ट इंडिया हॅकाथॉन 2026 • SIH26045",
    navDashboard: "डॅशबोर्ड",
    navAssistant: "एआय सहाय्यक",
    navClassification: "उत्पादन वर्गीकरण",
    navIPProtection: "बौद्धिक संपदा संरक्षण",
    navTK: "पारंपारिक ज्ञान (TK)",
    navABS: "एबीएस अनुपालन (NBA)",
    navInternational: "आंतरराष्ट्रीय प्रणाली",
    navDocuments: "दस्तऐवज विश्लेषण",
    navSources: "ज्ञान स्त्रोत व संदर्भ",
    navChecklist: "अनुपालन पडताळणी सूची",
    navRequests: "सुविधाकार विनंती",
    navArchitecture: "प्रणाली रचना",
    navSettings: "सेटिंग्ज",
    tryFullDemo: "डेमो सुरू करा",
    judgeDemo: "परीक्षक डेमो (3 मिनिटे)",
    jurisdictionIndia: "भारत (India)",
    jurisdictionInternational: "आंतरराष्ट्रीय (Global)",
    indiaSpecificBadge: "भारत-विशिष्ट मार्गदर्शन (पेटंट कायदा, एनबीए, टीकेडीएल)",
    internationalBadge: "आंतरराष्ट्रीय मार्गदर्शन (वायपो, पीसीटी, माद्रिद, नगोया)",
    assistantTitle: "आयपी-शक्ती एआय सहाय्यक",
    assistantSubtitle: "आयुर्वेदिक बौद्धिक संपदा, पारंपारिक ज्ञान, एबीएस व नियामक तरतुदींविषयी विचारा.",
    inputPlaceholder: "तुमच्या आयुर्वेदिक उत्पादनाबद्दल किंवा पेटंट प्रश्नाबद्दल लिहा...",
    askButton: "विश्लेषण करा",
    pipelineTitle: "ज्ञान पुनर्प्राप्ती व पडताळणी प्रक्रिया",
    answerTitle: "सप्रमाण मार्गदर्शन",
    whyItMattersTitle: "हे का महत्त्वाचे आहे?",
    relevantAreasTitle: "संबंधित बौद्धिक संपदा क्षेत्रे",
    potentialConcernsTitle: "संभाव्य अडचणी व कायदेशीर बाबी",
    nextStepsTitle: "पुढील शिफारस केलेली पावले",
    sourcesTitle: "प्रमाणित स्त्रोत व संदर्भ",
    confidenceTitle: "विश्वासार्हता स्तर (Confidence)",
    explainabilityTitle: "स्पष्टीकरण: हे उत्तर कसे तयार झाले?",
    disclaimer: "कायदेशीर सूचना: ही प्रणाली केवळ प्राथमिक माहिती व मार्गदर्शनासाठी आहे. हा अंतिम कायदेशीर सल्ला नाही.",
    riskTitle: "संभाव्य जोखीम निर्देशक",
    talkToFacilitator: "आयुष आयपी सुविधाकारांशी संपर्क साधा",
    quickPrompts: [
      { label: "उत्पादन वर्गीकरण करा", query: "माझे आयुर्वेदिक औषध शास्त्रीय की मालकीचे कसे ओळखावे?" },
      { label: "शास्त्रीय सूत्रावर पेटंट मिळेल का?", query: "शास्त्रीय आयुर्वेदिक सूत्रावर पेटंट मिळू शकते का?" },
      { label: "नवीन अर्क काढण्याची पद्धत", query: "मी एका आयुर्वेदिक वनस्पतीसाठी नवीन अर्क पद्धत शोधली आहे, पेटंट मिळेल का?" },
      { label: "पारंपारिक ज्ञान पडताळणी", query: "टीकेडीएल (TKDL) द्वारे पारंपारिक ज्ञानाचा शोध कसा घ्यावा?" },
      { label: "एनबीए (NBA) परवानगी आवश्यक आहे का?", query: "भारतीय वनस्पतीवर पेटंटसाठी राष्ट्रीय जैवविविधता प्राधिकरणाची मंजुरी हवी का?" },
      { label: "ब्रँड ट्रेडमार्क नियम", query: "अश्वगंधा किंवा तुळस या नावांवर ट्रेडमार्क मिळवता येतो का?" },
      { label: "परदेशात निर्यात करणे", query: "युरोप आणि अमेरिकेत आयुर्वेदिक उत्पादन निर्यात करण्याचे कायदेशीर नियम काय आहेत?" }
    ]
  }
};
