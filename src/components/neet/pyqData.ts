import { PYQuestion } from './types';

export const INITIAL_PYQS: PYQuestion[] = [
  // ================= PHYSICS PYQs =================
  {
    id: 'pyq-p1',
    exam: 'NEET',
    year: 2024,
    subject: 'Physics',
    topic: 'Ray Optics',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'A convex lens of focal length 20 cm made of glass (μ = 1.5) is immersed in water (μ = 4/3). The ratio of focal length in water to that in air is:',
    options: {
      A: '2 : 1',
      B: '4 : 1',
      C: '1 : 4',
      D: '3 : 2'
    },
    correctOption: 'B',
    explanation: 'From Lens Maker Formula: 1/f_air = (μ_g - 1)(1/R1 - 1/R2) = (1.5 - 1)K = 0.5 K.\nWhen immersed in water: 1/f_water = [(μ_g/μ_w) - 1]K = [(1.5 / (4/3)) - 1]K = [(9/8) - 1]K = (1/8) K.\nTherefore: f_water / f_air = (0.5 K) / ((1/8) K) = 0.5 * 8 = 4.\nSo f_water / f_air = 4 : 1.',
    keyFormulaOrConcept: '1/f = (μ_rel - 1)(1/R1 - 1/R2)'
  },
  {
    id: 'pyq-p2',
    exam: 'JEE Main',
    year: 2023,
    subject: 'Physics',
    topic: 'Current Electricity',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'A wire of resistance R is stretched such that its length increases by 0.5%. Assuming the density remains constant, the percentage increase in its resistance is approximately:',
    options: {
      A: '0.25%',
      B: '0.5%',
      C: '1.0%',
      D: '2.0%'
    },
    correctOption: 'C',
    explanation: 'Volume V = A * L = constant => A = V / L.\nResistance R = ρ * L / A = ρ * L^2 / V.\nFor small fractional changes: ΔR / R ≈ 2 * (ΔL / L).\nSince ΔL/L = +0.5%, ΔR/R ≈ 2 * 0.5% = 1.0%.',
    keyFormulaOrConcept: 'R ∝ L^2 (when volume remains constant under stretching)'
  },
  {
    id: 'pyq-p3',
    exam: 'NEET',
    year: 2023,
    subject: 'Physics',
    topic: 'Thermodynamics',
    questionType: 'Assertion-Reason',
    difficulty: 'Challenging',
    question: 'Assertion (A): In an adiabatic expansion of an ideal gas, the temperature of the gas always decreases.\nReason (R): In an adiabatic process, heat exchange Q = 0, so work done by the gas is done at the cost of its internal energy.',
    options: {
      A: 'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      B: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      C: '(A) is true but (R) is false',
      D: '(A) is false but (R) is true'
    },
    correctOption: 'A',
    explanation: 'From the First Law of Thermodynamics: ΔQ = ΔU + W.\nFor an adiabatic process, ΔQ = 0, therefore W = -ΔU.\nDuring expansion, work done W > 0, which means ΔU < 0.\nFor an ideal gas, internal energy depends only on temperature: ΔU = n*Cv*ΔT.\nSince ΔU < 0, ΔT < 0, meaning the temperature falls. Reason directly explains the Assertion.',
    keyFormulaOrConcept: 'ΔQ = ΔU + W = 0 => W = -ΔU => Expansion cools the gas'
  },
  {
    id: 'pyq-p4',
    exam: 'NEET',
    year: 2022,
    subject: 'Physics',
    topic: 'Modern Physics',
    questionType: 'MCQ',
    difficulty: 'Easy',
    question: 'When light of frequency 2ν₀ (where ν₀ is threshold frequency) is incident on a metal plate, the maximum velocity of electrons emitted is v₁. When the frequency of the incident radiation is increased to 5ν₀, the maximum velocity of electrons emitted becomes v₂. The ratio v₁ / v₂ is:',
    options: {
      A: '1 : 2',
      B: '1 : 4',
      C: '1 : √5',
      D: '1 : 3'
    },
    correctOption: 'A',
    explanation: "By Einstein's Photoelectric equation:\n(1/2) m v₁^2 = h(2ν₀) - hν₀ = hν₀\n(1/2) m v₂^2 = h(5ν₀) - hν₀ = 4 hν₀\nDividing both: (v₁ / v₂)^2 = (hν₀) / (4hν₀) = 1/4 => v₁ / v₂ = 1/2.",
    keyFormulaOrConcept: 'K_max = hν - hν₀ = (1/2) m v_max^2'
  },
  {
    id: 'pyq-p5',
    exam: 'JEE Main',
    year: 2024,
    subject: 'Physics',
    topic: 'Rotational Motion',
    questionType: 'MCQ',
    difficulty: 'Challenging',
    question: 'A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of inclination θ. The acceleration of its centre of mass is:',
    options: {
      A: 'g sin θ',
      B: '(2/3) g sin θ',
      C: '(1/2) g sin θ',
      D: '(3/5) g sin θ'
    },
    correctOption: 'B',
    explanation: 'For a body rolling down an incline without slipping:\na = (g sin θ) / (1 + I_cm / (M R^2))\nFor a solid cylinder, I_cm = (1/2) M R^2.\nSo I_cm / (M R^2) = 1/2.\na = (g sin θ) / (1 + 1/2) = (g sin θ) / (3/2) = (2/3) g sin θ.',
    keyFormulaOrConcept: 'a_rolling = (g sin θ) / (1 + k^2 / R^2)'
  },

  // ================= CHEMISTRY PYQs =================
  {
    id: 'pyq-c1',
    exam: 'NEET',
    year: 2024,
    subject: 'Chemistry',
    topic: 'Coordination Compounds',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'Among the following coordination complexes, which one exhibits both optical isomerism and geometrical isomerism?',
    options: {
      A: '[Co(NH3)4Cl2]+',
      B: 'cis-[Co(en)2Cl2]+',
      C: 'trans-[Co(en)2Cl2]+',
      D: '[Co(NH3)5Cl]2+'
    },
    correctOption: 'B',
    explanation: '[Co(en)2Cl2]+ exists as cis and trans geometrical isomers.\nThe cis-[Co(en)2Cl2]+ isomer is non-superimposable on its mirror image (has no plane of symmetry) and thus shows optical activity.\nThe trans isomer has a center of inversion / plane of symmetry and is optically inactive (meso). Therefore, cis-[Co(en)2Cl2]+ exhibits both.',
    keyFormulaOrConcept: 'cis-[M(AA)2B2] type complexes lack plane of symmetry and are chiral'
  },
  {
    id: 'pyq-c2',
    exam: 'NEET',
    year: 2023,
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'According to Molecular Orbital Theory (MOT), which of the following species has the highest bond order and is diamagnetic?',
    options: {
      A: 'O2',
      B: 'O2+',
      C: 'N2',
      D: 'N2+'
    },
    correctOption: 'C',
    explanation: 'Total electrons in N2 = 14.\nMO Configuration: σ1s^2 σ*1s^2 σ2s^2 σ*2s^2 (π2px^2 = π2py^2) σ2pz^2.\nBond Order = (Nb - Na)/2 = (10 - 4)/2 = 6/2 = 3.0.\nSince all electrons are paired, N2 is diamagnetic.\nO2 (16 e-) has BO = 2 (paramagnetic due to 2 unpaired e- in π*).\nO2+ (15 e-) has BO = 2.5 (paramagnetic).\nN2+ (13 e-) has BO = 2.5 (paramagnetic).',
    keyFormulaOrConcept: 'Bond Order = 1/2(Nb - Na); N2 has BO = 3.0, diamagnetic'
  },
  {
    id: 'pyq-c3',
    exam: 'JEE Main',
    year: 2023,
    subject: 'Chemistry',
    topic: 'Aldehydes & Ketones',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Statement I: Benzaldehyde does not undergo Aldol condensation in the presence of dilute NaOH.\nStatement II: Benzaldehyde does not contain any α-hydrogen atom.',
    options: {
      A: 'Both Statement I and Statement II are correct and Statement II is the correct explanation',
      B: 'Both Statement I and Statement II are correct but Statement II is NOT the correct explanation',
      C: 'Statement I is correct but Statement II is false',
      D: 'Statement I is false but Statement II is correct'
    },
    correctOption: 'A',
    explanation: 'Aldol condensation strictly requires aldehydes or ketones having at least one α-hydrogen atom to form the carbanion / enolate ion.\nBenzaldehyde (C6H5-CHO) has the -CHO attached to a benzene carbon which carries no hydrogen (no α-H).\nHence, it undergoes Cannizzaro reaction instead of self-aldol condensation.',
    keyFormulaOrConcept: 'Self-aldol requires α-hydrogen; compounds with no α-H undergo Cannizzaro'
  },
  {
    id: 'pyq-c4',
    exam: 'NEET',
    year: 2022,
    subject: 'Chemistry',
    topic: 'Electrochemistry',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'The molar conductivity of 0.007 M acetic acid is 20 S cm² mol⁻¹. What is the dissociation constant (Ka) of acetic acid? (Given: Λ°m(H+) = 350 S cm² mol⁻¹, Λ°m(CH3COO⁻) = 50 S cm² mol⁻¹)',
    options: {
      A: '1.75 × 10⁻⁵ mol L⁻¹',
      B: '2.50 × 10⁻⁴ mol L⁻¹',
      C: '1.85 × 10⁻⁶ mol L⁻¹',
      D: '3.50 × 10⁻⁵ mol L⁻¹'
    },
    correctOption: 'A',
    explanation: "By Kohlrausch's law: Λ°m(CH3COOH) = 350 + 50 = 400 S cm² mol⁻¹.\nDegree of dissociation α = Λm / Λ°m = 20 / 400 = 0.05.\nFor weak electrolyte: Ka = C * α² / (1 - α) ≈ C * α² = (0.007) * (0.05)² = 7 × 10⁻³ × 2.5 × 10⁻³ = 1.75 × 10⁻⁵ mol L⁻¹.",
    keyFormulaOrConcept: 'α = Λm / Λ°m and Ka = C * α²'
  },

  // ================= BOTANY PYQs =================
  {
    id: 'pyq-b1',
    exam: 'NEET',
    year: 2024,
    subject: 'Botany',
    topic: 'Molecular Basis of Inheritance',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Given below are two statements:\nStatement I: The lac operon is an inducible operon where lactose acts as an inducer.\nStatement II: In the presence of lactose, the repressor protein binds to the operator region and prevents RNA polymerase from transcribing the structural genes.',
    options: {
      A: 'Both Statement I and Statement II are correct',
      B: 'Both Statement I and Statement II are incorrect',
      C: 'Statement I is correct but Statement II is incorrect',
      D: 'Statement I is incorrect but Statement II is correct'
    },
    correctOption: 'C',
    explanation: 'Statement I is correct: Lactose (allolactose) acts as an inducer in the lac operon.\nStatement II is incorrect: In the PRESENCE of lactose, the inducer binds to the repressor and inactivates it, preventing the repressor from binding to the operator. This allows RNA polymerase access to the promoter to transcribe lacZ, lacY, and lacA.',
    keyFormulaOrConcept: 'Inducer + Repressor => Inactive Repressor => Operator is FREE => Transcription ON'
  },
  {
    id: 'pyq-b2',
    exam: 'NEET',
    year: 2023,
    subject: 'Botany',
    topic: 'Photosynthesis',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'In C4 plants, the first stable product of CO2 fixation is formed in which cells, and what is the primary CO2 acceptor?',
    options: {
      A: 'Bundle sheath cells, RuBP',
      B: 'Mesophyll cells, Phosphoenolpyruvate (PEP)',
      C: 'Bundle sheath cells, PEP',
      D: 'Mesophyll cells, RuBP'
    },
    correctOption: 'B',
    explanation: 'In C4 plants, primary CO2 fixation occurs in the mesophyll cells.\nThe primary CO2 acceptor is a 3-carbon molecule, phosphoenolpyruvate (PEP), catalyzed by PEP carboxylase (PEPcase).\nThe first stable product formed is oxaloacetic acid (OAA), a 4-carbon organic acid. RuBisCO is absent in mesophyll cells of C4 plants.',
    keyFormulaOrConcept: 'C4 Mesophyll: PEP + CO2 --(PEPcase)--> OAA (4C stable product)'
  },
  {
    id: 'pyq-b3',
    exam: 'NEET',
    year: 2023,
    subject: 'Botany',
    topic: 'Mendelian Genetics',
    questionType: 'MCQ',
    difficulty: 'Challenging',
    question: 'How many different types of genetically distinct gametes will be produced by an individual with genotype AaBbCcDD, assuming independent assortment?',
    options: {
      A: '4',
      B: '8',
      C: '16',
      D: '32'
    },
    correctOption: 'B',
    explanation: 'The number of distinct gametes produced is given by 2^n, where n is the number of heterozygous gene pairs.\nIn genotype AaBbCcDD:\nAa is heterozygous (1)\nBb is heterozygous (2)\nCc is heterozygous (3)\nDD is homozygous (0)\nHence n = 3.\nNumber of gametes = 2^3 = 8.',
    keyFormulaOrConcept: 'Number of types of gametes = 2^n (n = number of heterozygous loci)'
  },

  // ================= ZOOLOGY PYQs =================
  {
    id: 'pyq-z1',
    exam: 'NEET',
    year: 2024,
    subject: 'Zoology',
    topic: 'Biotechnology Applications',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'In human insulin produced by recombinant DNA technology (Eli Lilly), how are the separate peptide chains A and B linked together to form functional insulin?',
    options: {
      A: 'By peptide bonds formed inside the bacteria',
      B: 'By hydrogen bonds during downstream processing',
      C: 'By disulphide bonds created after extracting chains separately',
      D: 'By removing the C-peptide enzymatically from proinsulin'
    },
    correctOption: 'C',
    explanation: 'In 1983, Eli Lilly prepared two DNA sequences corresponding to chain A and chain B of human insulin and introduced them into plasmids of E. coli to produce insulin chains.\nChains A and B were produced separately, extracted, and combined by creating disulphide bonds to form mature human insulin (humulin). Bacteria cannot process proinsulin into insulin directly.',
    keyFormulaOrConcept: 'Mature Insulin = Chain A (21 aa) + Chain B (30 aa) connected by 2 interchain & 1 intrachain disulphide bridges'
  },
  {
    id: 'pyq-z2',
    exam: 'NEET',
    year: 2023,
    subject: 'Zoology',
    topic: 'Human Physiology',
    questionType: 'Assertion-Reason',
    difficulty: 'Moderate',
    question: 'Assertion (A): Persons with blood group AB are called universal recipients.\nReason (R): Blood group AB has both anti-A and anti-B antibodies in their plasma.',
    options: {
      A: 'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      B: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      C: '(A) is true but (R) is false',
      D: '(A) is false but (R) is true'
    },
    correctOption: 'C',
    explanation: 'Assertion (A) is TRUE: Individuals with blood group AB can receive blood of any ABO group because their red blood cells have both A and B antigens.\nReason (R) is FALSE: Individuals with blood group AB have NO anti-A or anti-B antibodies in their plasma (which is precisely why they can receive blood without agglutination!). Group O has both anti-A and anti-B antibodies.',
    keyFormulaOrConcept: 'Group AB: A & B antigens on RBC, NO antibodies in plasma'
  },
  {
    id: 'pyq-z3',
    exam: 'NEET',
    year: 2022,
    subject: 'Zoology',
    topic: 'Human Reproduction',
    questionType: 'MCQ',
    difficulty: 'Moderate',
    question: 'Which of the following hormones triggers the release of ovum (ovulation) from the mature Graafian follicle in human females?',
    options: {
      A: 'High concentration of Progesterone',
      B: 'LH surge',
      C: 'FSH surge alone',
      D: 'Sudden fall of Estrogen'
    },
    correctOption: 'B',
    explanation: 'Rapid secretion of Luteinizing Hormone (LH) leading to its maximum level during the mid-cycle (around 14th day) is called the LH surge.\nThis LH surge induces rupture of Graafian follicle and thereby the release of ovum (ovulation).',
    keyFormulaOrConcept: 'LH surge (day 14) causes ovulation of secondary oocyte'
  }
];
