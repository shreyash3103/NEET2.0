import { NcertLine } from './types';

export const INITIAL_NCERT_LINES: NcertLine[] = [
  {
    id: 'ncert-1',
    subject: 'Botany',
    chapter: 'Molecular Basis of Inheritance',
    pageOrSection: 'NCERT Class 12, Page 104 (Section 6.5)',
    quoteText: 'The split-gene arrangements represent an ancient feature of the genome. The presence of introns is reminiscent of antiquity, and the process of splicing represents the dominance of RNA world.',
    highlightedPhrase: 'dominance of RNA world and antiquity of introns',
    whyNtaAsksThis: 'NTA directly framed this into a Statement-based question in NEET 2022 and 2023. Students often confuse whether splicing represents DNA dominance or RNA dominance.',
    relatedPyqYear: 'NEET 2022 & 2023'
  },
  {
    id: 'ncert-2',
    subject: 'Botany',
    chapter: 'Principles of Inheritance and Variation',
    pageOrSection: 'NCERT Class 12, Page 83 (Section 5.3.2)',
    quoteText: 'Morgan attributed this proportion to the physical association or linkage of the two genes and coined the term linkage... and the term recombination to describe the generation of non-parental gene combinations.',
    highlightedPhrase: 'physical association of genes on chromosome = Linkage',
    whyNtaAsksThis: 'Frequently asked in match-the-column. Note that Alfred Sturtevant (his student) used recombination frequency to measure genetic distance, NOT Morgan himself.',
    relatedPyqYear: 'NEET 2020 & 2024'
  },
  {
    id: 'ncert-3',
    subject: 'Zoology',
    chapter: 'Biotechnology: Principles and Processes',
    pageOrSection: 'NCERT Class 12, Page 199 (Section 11.2.2)',
    quoteText: 'The rop codes for the proteins involved in the replication of the plasmid. If an alien piece of DNA is ligated at the PvuII site, rop is disrupted.',
    highlightedPhrase: 'rop codes for proteins involved in plasmid replication',
    whyNtaAsksThis: 'In pBR322 diagram, students focus only on ampR and tetR sites, and NTA catches them off guard by asking the function of rop.',
    relatedPyqYear: 'NEET 2023'
  },
  {
    id: 'ncert-4',
    subject: 'Botany',
    chapter: 'Sexual Reproduction in Flowering Plants',
    pageOrSection: 'NCERT Class 12, Page 31 (Section 2.2.2)',
    quoteText: 'Sporopollenin is one of the most resistant organic material known. It can withstand high temperatures and strong acids and alkali. No enzyme that degrades sporopollenin is so far known.',
    highlightedPhrase: 'No enzyme that degrades sporopollenin is so far known',
    whyNtaAsksThis: 'Very common Assertion-Reason question explaining why pollen grains are well preserved as fossils for centuries.',
    relatedPyqYear: 'NEET 2021 & 2023'
  },
  {
    id: 'ncert-5',
    subject: 'Zoology',
    chapter: 'Human Reproduction',
    pageOrSection: 'NCERT Class 12, Page 47 (Section 3.2)',
    quoteText: 'The secretion of male accessory glands (seminal vesicles, prostate and bulbourethral glands) constitute the seminal plasma which is rich in fructose, calcium and certain enzymes.',
    highlightedPhrase: 'rich in fructose, calcium and certain enzymes',
    whyNtaAsksThis: 'NTA traps students by replacing fructose with glucose, or omitting calcium in statement questions.',
    relatedPyqYear: 'NEET 2020, 2022'
  },
  {
    id: 'ncert-6',
    subject: 'Zoology',
    chapter: 'Neural Control and Coordination',
    pageOrSection: 'NCERT Class 11, Page 317 (Section 21.3.1)',
    quoteText: 'The resting axonal membrane is comparatively more permeable to potassium ions (K+) and nearly impermeable to sodium ions (Na+). Similarly, the membrane is impermeable to negatively charged proteins present in the axoplasm.',
    highlightedPhrase: 'more permeable to K+ and impermeable to Na+ and negative proteins',
    whyNtaAsksThis: 'Direct reason for resting membrane potential (-70 mV). NTA inverts the permeability in options to test conceptual clarity.',
    relatedPyqYear: 'NEET 2021 & 2024'
  },
  {
    id: 'ncert-7',
    subject: 'Chemistry',
    chapter: 'Coordination Compounds',
    pageOrSection: 'NCERT Class 12, Page 254 (Section 9.5)',
    quoteText: 'Crystal field splitting Δo depends upon the field produced by the ligand and charges on the metal ion. Ligands that produce strong fields are called strong field ligands and cause pairing of d-electrons.',
    highlightedPhrase: 'Δo > P leads to pairing (low spin complex)',
    whyNtaAsksThis: 'NTA tests the condition: If Δo < P, high spin complex with t2g^3 eg^1 configuration for d4 ions like Cr2+ or Mn3+.',
    relatedPyqYear: 'NEET 2023 & JEE Main 2024'
  },
  {
    id: 'ncert-8',
    subject: 'Chemistry',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    pageOrSection: 'NCERT Class 12, Page 375 (Section 12.8)',
    quoteText: 'Carboxylic acids are distinctly acidic because the carboxylate ion is stabilized by two equivalent resonance structures in which the negative charge is delocalized over two electronegative oxygen atoms.',
    highlightedPhrase: 'two equivalent resonance structures of carboxylate ion',
    whyNtaAsksThis: 'Why is carboxylic acid more acidic than phenol? Phenoxide ion has 5 resonance structures, BUT they are non-equivalent and negative charge rests on less electronegative carbon atoms in 3 structures.',
    relatedPyqYear: 'NEET 2022'
  },
  {
    id: 'ncert-9',
    subject: 'Physics',
    chapter: 'Ray Optics and Optical Instruments',
    pageOrSection: 'NCERT Class 12, Page 340 (Section 9.9.2)',
    quoteText: 'For an astronomical telescope in normal adjustment (image at infinity), the magnifying power is m = fo / fe and the length of the telescope tube is L = fo + fe.',
    highlightedPhrase: 'Normal adjustment: image at infinity, L = fo + fe, m = fo / fe',
    whyNtaAsksThis: 'Direct formula numericals in NEET almost every alternate year. Students often confuse normal adjustment with least distance of distinct vision (D).',
    relatedPyqYear: 'NEET 2020, 2022, 2024'
  },
  {
    id: 'ncert-10',
    subject: 'Physics',
    chapter: 'Thermodynamics',
    pageOrSection: 'NCERT Class 11, Page 312 (Section 12.8)',
    quoteText: 'In a cyclic process, the system returns to its initial state. Since internal energy is a state function, ΔU = 0 for a complete cyclic process. Therefore, total heat absorbed Q equals the net work done W.',
    highlightedPhrase: 'In any cyclic process, ΔU = 0, so Q_net = W_net',
    whyNtaAsksThis: 'NTA questions asking net work from PV loops (area enclosed). If clockwise, W is positive; if counter-clockwise, W is negative.',
    relatedPyqYear: 'NEET 2021, 2023'
  }
];
