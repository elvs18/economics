import { createContext, useContext, useState, useEffect } from 'react';
import { STARTER_TERMS } from '../constants/starterTerms';

const STORAGE_KEY = 'economics_hub_terms_v2';
const LEGACY_STORAGE_KEY = 'economics_hub_terms_v1';
const TermsContext = createContext();

function loadInitialTerms() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsedLegacy = JSON.parse(legacy);
      if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedLegacy));
        return parsedLegacy;
      }
    }
  } catch (err) {
    console.error('Failed to parse saved terms from localStorage:', err);
  }

  return STARTER_TERMS;
}

export function TermsProvider({ children }) {
  const [terms, setTerms] = useState(loadInitialTerms);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
    } catch (err) {
      console.error('Failed to persist terms to localStorage:', err);
    }
  }, [terms]);

  const addTerm = (termData) => {
    const newTerm = {
      ...termData,
      id: 'term_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      dateAdded: new Date().toISOString()
    };
    setTerms(prev => [newTerm, ...prev]);
    return newTerm;
  };

  const updateTerm = (id, updatedData) => {
    setTerms(prev => prev.map(term => {
      if (term.id === id) {
        return {
          ...term,
          ...updatedData,
          id, // ensure ID stays consistent
          dateUpdated: new Date().toISOString()
        };
      }
      return term;
    }));
  };

  const deleteTerm = (id) => {
    setTerms(prev => prev.filter(term => term.id !== id));
  };

  const importTerms = (incomingTerms) => {
    if (!Array.isArray(incomingTerms)) {
      throw new Error('Imported data must be an array of terms');
    }

    const validated = incomingTerms.filter(item => {
      return item && typeof item === 'object' && (
        (item.ru && item.ru.term) ||
        (item.en && item.en.term) ||
        (item.uz && item.uz.term)
      );
    }).map(item => ({
      ...item,
      id: item.id || ('term_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)),
      category: item.category || 'other',
      dateAdded: item.dateAdded || new Date().toISOString(),
      ru: item.ru || { term: '', definition: '', example: '' },
      en: item.en || { term: '', definition: '', example: '' },
      uz: item.uz || { term: '', definition: '', example: '' }
    }));

    if (validated.length === 0) {
      throw new Error('No valid terms found in import payload');
    }

    setTerms(validated);
    return validated.length;
  };

  const resetTerms = () => {
    setTerms(STARTER_TERMS);
  };

  const exportTermsAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(terms, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `economics_terms_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <TermsContext.Provider value={{
      terms,
      addTerm,
      updateTerm,
      deleteTerm,
      importTerms,
      resetTerms,
      exportTermsAsJson
    }}>
      {children}
    </TermsContext.Provider>
  );
}

export function useTerms() {
  const context = useContext(TermsContext);
  if (!context) throw new Error('useTerms must be used within TermsProvider');
  return context;
}
