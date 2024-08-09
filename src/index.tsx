import React, { useEffect, useRef, useState } from 'react';

export interface CustomTypedProps {
  strings: string[];
  typeSpeed?: number;
  startDelay?: number;
  backSpeed?: number;
  loop?: boolean;
  loopCount?: number;
  className?: string;
  cursorChar?: string;
}

export const Typed: React.FC<CustomTypedProps> = ({
  strings,
  typeSpeed = 50,
  startDelay = 0,
  backSpeed = 30,
  loop = true,
  loopCount = Infinity,
  className,
  cursorChar = '|',
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const loopCounter = useRef(0);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = strings[currentStringIndex];
      const updatedText = isDeleting
        ? fullText.substring(0, currentText.length - 1)
        : fullText.substring(0, currentText.length + 1);

      setCurrentText(updatedText);

      let delay = isDeleting ? backSpeed : typeSpeed;

      if (!isDeleting && updatedText === fullText) {
        delay = startDelay;
        if (loop && loopCounter.current < loopCount) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
        loopCounter.current++;
      }

      if (loop && loopCounter.current >= loopCount && updatedText === '') {
        return;
      }

      setTimeout(handleTyping, delay);
    };

    const timeoutId = setTimeout(handleTyping, startDelay);

    return () => clearTimeout(timeoutId);
  }, [
    currentText,
    isDeleting,
    strings,
    typeSpeed,
    startDelay,
    backSpeed,
    loop,
    loopCount,
    currentStringIndex,
  ]);

  return (
    <span className={className}>
      {currentText}
      <span>{cursorChar}</span>
    </span>
  );
};

// Ensure default export
export default Typed;
