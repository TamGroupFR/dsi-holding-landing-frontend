import { useState, useEffect } from 'react';

const useLanguage = (): string | null => {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('locale');
    setLanguage(storedLanguage);
  }, []);

  return language;
};

export default useLanguage;
