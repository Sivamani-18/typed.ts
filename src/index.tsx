import React, { useEffect, useRef } from 'react';
import Typed from './typed';
import { TypedOptions } from './defaults';

export const TypingEffect: React.FC<TypedOptions> = ({
  strings,
  className,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  cursorChar = '|',
  showCursor = true,
  stringsElement = null,
  startDelay = 0,
  smartBackspace = true,
  shuffle = false,
  backDelay = 700,
  fadeOut = false,
  fadeOutClass = 'typed-fade-out',
  fadeOutDelay = 500,
  loopCount = Infinity,
  autoInsertCss = true,
  attr = null,
  bindInputFocusEvents = false,
  contentType = 'html',
  onBegin = () => {},
  onComplete = () => {},
  preStringTyped = () => {},
  onStringTyped = () => {},
  onLastStringBackspaced = () => {},
  onTypingPaused = () => {},
  onTypingResumed = () => {},
  onReset = () => {},
  onStop = () => {},
  onStart = () => {},
  onDestroy = () => {},
}) => {
  const typedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings,
        className,
        typeSpeed,
        startDelay,
        backSpeed,
        smartBackspace,
        shuffle,
        backDelay,
        fadeOut,
        fadeOutClass,
        fadeOutDelay,
        loop,
        loopCount,
        showCursor,
        cursorChar,
        autoInsertCss,
        attr,
        bindInputFocusEvents,
        contentType,
        onBegin,
        onComplete,
        preStringTyped,
        onStringTyped,
        onLastStringBackspaced,
        onTypingPaused,
        onTypingResumed,
        onReset,
        onStop,
        onStart,
        onDestroy,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [
    strings,
    className,
    typeSpeed,
    startDelay,
    backSpeed,
    smartBackspace,
    shuffle,
    backDelay,
    fadeOut,
    fadeOutClass,
    fadeOutDelay,
    loop,
    loopCount,
    showCursor,
    cursorChar,
    autoInsertCss,
    attr,
    bindInputFocusEvents,
    contentType,
    onBegin,
    onComplete,
    preStringTyped,
    onStringTyped,
    onLastStringBackspaced,
    onTypingPaused,
    onTypingResumed,
    onReset,
    onStop,
    onStart,
    onDestroy,
  ]);

  return (
    <span
      className={`typing-effect ${className ? className : ''}`}
      ref={typedRef}
    />
  );
};

export default TypingEffect;
