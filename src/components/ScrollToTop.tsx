'use client';

import { ChevronsUp } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const isBrowser = () => typeof window !== 'undefined';

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <Button
      className={`fixed bottom-8 right-5 opacity-60 py-3 px-2 hidden items-center justify-center ${
        showButton ? 'flex' : 'hidden'
      }`}
      onClick={scrollToTop}
    >
      <ChevronsUp size={25} />
    </Button>
  );
};

export default ScrollToTop;
