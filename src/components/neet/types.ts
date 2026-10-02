/**
 * Types for NEET 2027 Aspirant Platform
 */

export type Subject = 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';

export interface DailyTarget {
  id: string;
  title: string;
  subject: Subject;
  chapter: string;
  targetQuestions: number;
  completedQuestions: number;
  targetMinutes: number;
  completedMinutes: number;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  notes?: string;
}

export interface SyllabusChapter {
  id: string;
  name: string;
  unit: string;
  subject: Subject;
  grade: 'Class 11' | 'Class 12';
  weightage: 'Very High' | 'High' | 'Moderate';
  avgQuestions: number;
  completed: boolean;
  revisionCount: number;
  isNtaRevised?: boolean; // Revised in latest NTA 2026/2027 syllabus
  subtopics: string[];
}

export interface PYQuestion {
  id: string;
  exam: 'NEET' | 'JEE Main' | 'JEE Advanced';
  year: number;
  subject: Subject;
  topic: string;
  questionType: 'MCQ' | 'Assertion-Reason' | 'Statement-Based' | 'Match-Column';
  difficulty: 'Easy' | 'Moderate' | 'Tough';
  sourceType?: 'Past Paper' | 'Original' | 'Needs Verification';
  sourceReference?: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyFormulaOrConcept?: string;
  isBookmarked?: boolean;
}

export interface NcertLine {
  id: string;
  subject: Subject;
  chapter: string;
  pageOrSection: string;
  quoteText: string;
  highlightedPhrase: string;
  whyNtaAsksThis: string;
  relatedPyqYear?: string;
  isBookmarked?: boolean;
}

export interface MistakeLog {
  id: string;
  questionRef: string;
  subject: Subject;
  topic: string;
  mistakeType: 'Calculation Error' | 'Conceptual Gap' | 'Misread Question' | 'Formula Forgotten' | 'Time Pressure';
  myWrongAnswer: string;
  correctConcept: string;
  actionItem: string;
  date: string;
}

export interface StudySession {
  id: string;
  subject: Subject;
  durationMinutes: number;
  timestamp: string;
  notes?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  avatarUrl?: string;
  targetScore: number;
  neetyear: number;
  joinedDate: string;
}
