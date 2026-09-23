import { UserAnswer } from '../types';

export const useStorage = () => {
  const saveUser = (name: string, age: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ci5m_user', JSON.stringify({ name, age }));
    }
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('ci5m_user');
      return data ? JSON.parse(data) : null;
    }
    return null;
  };

  const saveAnswers = (answers: UserAnswer[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ci5m_answers', JSON.stringify(answers));
    }
  };

  const getAnswers = (): UserAnswer[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('ci5m_answers');
      return data ? JSON.parse(data) : [];
    }
    return [];
  };

  const clearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ci5m_user');
      localStorage.removeItem('ci5m_selected_theme');
      localStorage.removeItem('ci5m_answers');
    }
  };

  return { saveUser, getUser, saveAnswers, getAnswers, clearAll };
};