import { ClassificationAnswers, ClassificationResult } from '../types';

export const ClassificationService = {
  classify(answers: ClassificationAnswers): ClassificationResult {
    const {
      productType,
      authoritativeText,
      biologicalResources,
      traditionalKnowledge,
      intendedActivity,
      novelTechnicalComponent
    } = answers;

    // Classical Ayurvedic Medicine
    if (productType === 'Classical Ayurvedic Medicine' || authoritativeText === 'Yes') {
      return {
        likelyCategory: 'Classical (Shastric) Ayurvedic Medicine',
        confidence: 'HIGH',
        why: 'The product strictly follows recipes and processing methodologies prescribed in authoritative Ayurvedic treatises recognized in the First Schedule of the Drugs and Cosmetics Act 1940.',
        potentialIPAreas: [
          'Trademarks (Class 5 for unique coined brand name)',
          'Industrial Design (Novel packaging shape, bottle, or applicator)',
          'Copyright (Marketing literary material & label layout)',
          'Trade Secrets (Confidential quality control SOPs and sourcing details)'
        ],
        potentialComplianceAreas: [
          'Classical Manufacturing License under Chapter IV-A (Drugs & Cosmetics Rules)',
          'Adherence to Ayurvedic Pharmacopoeia of India (API) standards',
          'Intimation to State Biodiversity Board (SBB) if commercializing biological resources',
          'Strict prohibition of medicinal curing claims under Drugs & Magic Remedies Act'
        ],
        regulatoryRoute: 'Classical ASU License (Schedule I, DCA 1940)',
        statutoryProvision: 'Drugs and Cosmetics Act, Section 3(a) & First Schedule',
        recommendedNextStep: 'Secure a distinctive brand trademark in Class 5 and obtain Shastric ASU manufacturing licensing from your State Licensing Authority.'
      };
    }

    // Ayurveda Aahar / Food Supplement
    if (productType === 'Ayurveda-Aahar / Nutraceutical') {
      return {
        likelyCategory: 'Ayurveda-Aahar (Ayurvedic Food Product)',
        confidence: 'HIGH',
        why: 'Formulated in accordance with traditional processes but positioned as health food/dietary wellness without therapeutic disease-curing claims.',
        potentialIPAreas: [
          'Trademarks (Class 29 / Class 30 / Class 5)',
          'Packaging Designs (Class 09 Locarno)',
          'Trade Secrets (Proprietary taste formulation and flavoring blends)'
        ],
        potentialComplianceAreas: [
          'Mandatory FSSAI Ayurveda-Aahar Regulations 2022 prior approval',
          'Mandatory display of official Ayurveda Aahar logo',
          'Prohibition of synthetic vitamins, minerals, and disease-curing therapeutic claims',
          'Biodiversity compliance for wild-harvested botanical ingredients'
        ],
        regulatoryRoute: 'FSSAI Ayurveda Aahar Expert Committee Clearance',
        statutoryProvision: 'Food Safety and Standards (Ayurveda Aahar) Regulations 2022',
        recommendedNextStep: 'File for FSSAI Ayurveda-Aahar product clearance and design packaging bearing the mandatory official Ayurveda-Aahar seal.'
      };
    }

    // Phytopharmaceutical / Novel Technical Innovation
    if (productType === 'Phytopharmaceutical' || (novelTechnicalComponent === 'Yes' && biologicalResources === 'Yes')) {
      return {
        likelyCategory: 'Phytopharmaceutical / Novel Botanical Extract',
        confidence: novelTechnicalComponent === 'Yes' ? 'HIGH' : 'MEDIUM',
        why: 'Contains a purified, standardized fraction of an Indian medicinal plant with defined biomarkers and non-traditional technical extraction/formulation processing.',
        potentialIPAreas: [
          'Process Patent (Extraction methods & purification techniques under Section 3(d)/3(e))',
          'Formulation Patent (if unexpected non-obvious therapeutic synergy is proven)',
          'Trademarks (Class 5 pharmaceutical naming)',
          'International PCT filing (Preserving global patent priority)'
        ],
        potentialComplianceAreas: [
          'National Biodiversity Authority (NBA) Section 6 Form III prior approval BEFORE patent filing',
          'CDSCO Phytopharmaceutical Drug Approval (Schedule Y / New Drugs Rules 2019)',
          'Preclinical toxicology, safety, and standardized chromatographic fingerprinting',
          'WIPO GRATK Treaty mandatory disclosure of Indian genetic resource origin'
        ],
        regulatoryRoute: 'CDSCO Phytopharmaceutical Route & NBA Form III Clearance',
        statutoryProvision: 'New Drugs and Clinical Trials Rules 2019 & Biological Diversity Act Sec 6',
        recommendedNextStep: 'File NBA Form III immediately and initiate prior art search comparing extraction parameters against classical texts before lodging a provisional patent.'
      };
    }

    // Proprietary / Patent Medicine (Default for combined or modified formulas)
    return {
      likelyCategory: 'Ayurvedic Patent or Proprietary Medicine (P or P)',
      confidence: 'MEDIUM',
      why: 'Ingredients are mentioned in classical treatises, but the exact combination, ratio, or modern dosage delivery format is innovative and not directly verbatim in the 54 First Schedule books.',
      potentialIPAreas: [
        'Trademarks (Class 5 brand identity)',
        'Design Registration (Novel delivery device or dispenser)',
        'Process Patent (Only if extraction or delivery exhibits verifiable technological synergy)',
        'Trade Secrets (Proprietary recipe proportions)'
      ],
      potentialComplianceAreas: [
        'License under Rule 158-B of Drugs and Cosmetics Rules (Safety/efficacy documentation)',
        'Heavy metals and pesticide residue testing compliant with API guidelines',
        'State Biodiversity Board (SBB) intimation under Section 7 of Biological Diversity Act',
        'Advertising clearance under Rule 170 / DMROA guidelines'
      ],
      regulatoryRoute: 'Ayush Proprietary ASU License under Rule 158-B',
      statutoryProvision: 'Drugs and Cosmetics Act Section 3(h) & Rule 158-B',
      recommendedNextStep: 'Compile 158-B safety literature data and register your coined brand trademark before commercial rollout.'
    };
  }
};
