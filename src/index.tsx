import React, { useEffect, useRef } from 'react';
import Typed from './typed';

interface TypingEffectProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  cursorChar?: string;
  showCursor?: boolean;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  cursorChar = '|',
  showCursor = true,
}) => {
  const typedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings,
        typeSpeed,
        backSpeed,
        loop,
        cursorChar,
        showCursor,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [strings, typeSpeed, backSpeed, loop, cursorChar, showCursor]);

  return <span ref={typedRef} />;
};

export default TypingEffect;
