export interface TypedOptions {
  strings: string[];
  stringsElement: string | null;
  typeSpeed: number;
  startDelay: number;
  backSpeed: number;
  smartBackspace: boolean;
  shuffle: boolean;
  backDelay: number;
  fadeOut: boolean;
  fadeOutClass: string;
  fadeOutDelay: number;
  loop: boolean;
  loopCount: number;
  showCursor: boolean;
  cursorChar: string;
  autoInsertCss: boolean;
  attr: string | null;
  bindInputFocusEvents: boolean;
  contentType: 'html' | 'null';
  onBegin: (self: any) => void;
  onComplete: (self: any) => void;
  preStringTyped: (arrayPos: number, self: any) => void;
  onStringTyped: (arrayPos: number, self: any) => void;
  onLastStringBackspaced: (self: any) => void;
  onTypingPaused: (arrayPos: number, self: any) => void;
  onTypingResumed: (arrayPos: number, self: any) => void;
  onReset: (self: any) => void;
  onStop: (arrayPos: number, self: any) => void;
  onStart: (arrayPos: number, self: any) => void;
  onDestroy: (self: any) => void;
}

export const defaults: TypedOptions = {
  strings: [
    'These are the default values...',
    'You know what you should do?',
    'Use your own!',
    'Have a great day!',
  ],
  stringsElement: null,
  typeSpeed: 50,
  startDelay: 0,
  backSpeed: 30,
  smartBackspace: true,
  shuffle: false,
  backDelay: 700,
  fadeOut: false,
  fadeOutClass: 'typed-fade-out',
  fadeOutDelay: 500,
  loop: false,
  loopCount: Infinity,
  showCursor: true,
  cursorChar: '|',
  autoInsertCss: true,
  attr: null,
  bindInputFocusEvents: false,
  contentType: 'html',
  onBegin: () => {},
  onComplete: () => {},
  preStringTyped: () => {},
  onStringTyped: () => {},
  onLastStringBackspaced: () => {},
  onTypingPaused: () => {},
  onTypingResumed: () => {},
  onReset: () => {},
  onStop: () => {},
  onStart: () => {},
  onDestroy: () => {},
};
