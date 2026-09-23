export interface Theme {
  id: string;
  label: string;
  icon: string; 
  closingText: string;
}

export interface Prompt {
  id: number;
  phase: 'opening' | 'core' | 'closing';
  question: string;
}

export interface User {
  name: string;
  age: number;
}

export interface UserAnswer {
  step: number;
  question: string;
  answer: string;
}