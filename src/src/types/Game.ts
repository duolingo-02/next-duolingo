// Type definition for GameContainer component props
export type GameContainerProps = {
  onTimeUp: () => void; // Callback when time is up
  children: React.ReactNode; // Nested content
};

// Type definition for Lesson object
export interface Lesson {
  id: number;
  title: string;
  type: string;
  question: string;
  options: string[] | null;
  answer: string | null;
  scrambledSentence: string[] | null;
  correctOrder: string[] | null;
  isTrue: boolean | null;
  points: number;
  languageId: number;
  createdAt: string;
  updatedAt: string;
}

// Type definition for component props
export interface StageSelectionProps {
  languageId: number;
}

// Type definition for Language object
export type Language = {
  id: number;
  name: string;
  image: string;
};

// Type definition for NavigationButton component props
export type NavigationButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
};

// Type definition for SelectButton component props
export type SelectButtonProps = {
  onSelect: () => void;
};

// Type definition for LanguageCard component props
export type LanguageCardProps = {
  image: string;
  name: string;
};

// Type definition for MultipleChoiceQuiz props
export interface MultipleChoiceQuizProps {
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  }[];
  language: string;
  onComplete: (points: number) => void;
  onIncorrectAnswer: () => void;
  updateProgress: () => void;
}

// Type definition for the QuizData
export interface Lesson {
  id: number;
  title: string;
  type: string;
  question: string;
  options: string[] | null;
  answer: string | null;
  scrambledSentence: string[] | null;
  correctOrder: string[] | null;
  isTrue: boolean | null;
  points: number;
  languageId: number;
  stageId: number;
  createdAt: string;
  updatedAt: string;
}

// Type definition for SentenceOrderQuiz props


// Type definition for SentenceOrderQuiz props

export interface SentenceOrderQuizProps {
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: string;
    correctOrder: string[];
  }[];
  language: string;
  onComplete: (points: number) => void;
  onIncorrectAnswer: () => void;
  updateProgress: () => void;
}

// Type definition for StageList component props
export interface StageListProps {
  languageId: number; // The ID of the selected language
}

// Type definition for TrueFalseQuiz props
export interface TrueFalseQuizProps {
  questions: {
    statement: string;
    isTrue: boolean;
  }[];
  language: string;
  onComplete: (points: number) => void;
  onIncorrectAnswer: () => void;
  updateProgress: () => void;
}



