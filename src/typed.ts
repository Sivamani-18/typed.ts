import { initializer } from './initializer';
import { htmlParser } from './html-parser';

interface PauseState {
  status: boolean;
  typewrite: boolean;
  curString: string;
  curStrPos: number;
}

export default class Typed {
  el: HTMLElement;
  options: any;
  cursor: HTMLElement | null = null;
  timeout: any;
  typingComplete = false;
  pause: PauseState;
  strPos: number;
  arrayPos: number;
  curLoop: number;
  sequence: number[];
  stopNum: number;
  temporaryPause = false;
  cursorBlinking: boolean;
  isInput: boolean; // Added isInput property

  constructor(elementId: string | HTMLElement, options: any) {
    this.pause = {
      status: false,
      typewrite: true,
      curString: '',
      curStrPos: 0,
    };
    this.sequence = [];
    this.strPos = 0;
    this.arrayPos = 0;
    this.curLoop = 0;
    this.stopNum = 0;
    this.cursorBlinking = true; // Initialize cursorBlinking property
    initializer.load(this, options, elementId);
    this.isInput = this.el.tagName.toLowerCase() === 'input'; // Initialize isInput
    this.begin();
  }

  toggle() {
    this.pause.status ? this.start() : this.stop();
  }

  stop() {
    if (!this.typingComplete && !this.pause.status) {
      this.toggleBlinking(true);
      this.pause.status = true;
      this.options.onStop(this.arrayPos, this);
    }
  }

  start() {
    if (!this.typingComplete && this.pause.status) {
      this.pause.status = false;
      if (this.pause.typewrite) {
        this.typewrite(this.pause.curString, this.pause.curStrPos);
      } else {
        this.backspace(this.pause.curString, this.pause.curStrPos);
      }
      this.options.onStart(this.arrayPos, this);
    }
  }

  destroy() {
    this.reset(false);
    this.options.onDestroy(this);
  }

  reset(restart = true) {
    clearTimeout(this.timeout);
    this.replaceText('');
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
      this.cursor = null;
    }
    this.strPos = 0;
    this.arrayPos = 0;
    this.curLoop = 0;
    if (restart) {
      this.insertCursor();
      this.options.onReset(this);
      this.begin();
    }
  }

  begin() {
    this.options.onBegin(this);
    this.shuffleStringsIfNeeded();
    this.insertCursor();
    if (this.options.bindInputFocusEvents) this.bindFocusEvents();
    this.timeout = setTimeout(() => {
      if (this.strPos === 0) {
        this.typewrite(
          this.options.strings[this.sequence[this.arrayPos]],
          this.strPos
        );
      } else {
        this.backspace(
          this.options.strings[this.sequence[this.arrayPos]],
          this.strPos
        );
      }
    }, this.options.startDelay);
  }

  typewrite(curString: string, curStrPos: number) {
    if (
      this.options.fadeOut &&
      this.el.classList.contains(this.options.fadeOutClass)
    ) {
      this.el.classList.remove(this.options.fadeOutClass);
      if (this.cursor) {
        this.cursor.classList.remove(this.options.fadeOutClass);
      }
    }

    const humanize = this.humanizer(this.options.typeSpeed);
    let numChars = 1;

    if (this.pause.status) {
      this.setPauseStatus(curString, curStrPos, true);
      return;
    }

    this.timeout = setTimeout(() => {
      curStrPos = htmlParser.typeHtmlChars(curString, curStrPos, this);
      let pauseTime = 0;

      let substr = curString.substring(curStrPos);
      if (substr.charAt(0) === '^') {
        if (/^\^\d+/.test(substr)) {
          let skip = 1;
          substr = /\d+/.exec(substr)![0];
          skip += substr.length;
          pauseTime = parseInt(substr);
          this.temporaryPause = true;
          this.options.onTypingPaused(this.arrayPos, this);
          curString =
            curString.substring(0, curStrPos) +
            curString.substring(curStrPos + skip);
          this.toggleBlinking(true);
        }
      }

      if (substr.charAt(0) === '`') {
        while (curString.substring(curStrPos + numChars).charAt(0) !== '`') {
          numChars++;
          if (curStrPos + numChars > curString.length) break;
        }
        const stringBeforeSkip = curString.substring(0, curStrPos);
        const stringSkipped = curString.substring(
          stringBeforeSkip.length + 1,
          curStrPos + numChars
        );
        const stringAfterSkip = curString.substring(curStrPos + numChars + 1);
        curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
        numChars--;
      }

      this.timeout = setTimeout(() => {
        this.toggleBlinking(false);
        if (curStrPos >= curString.length) {
          this.doneTyping(curString, curStrPos);
        } else {
          this.keepTyping(curString, curStrPos, numChars);
        }
        if (this.temporaryPause) {
          this.temporaryPause = false;
          this.options.onTypingResumed(this.arrayPos, this);
        }
      }, pauseTime);
    }, humanize);
  }

  keepTyping(curString: string, curStrPos: number, numChars: number) {
    if (curStrPos === 0) {
      this.toggleBlinking(false);
      this.options.preStringTyped(this.arrayPos, this);
    }
    curStrPos += numChars;
    this.replaceText(curString.substring(0, curStrPos));
    this.typewrite(curString, curStrPos);
  }

  doneTyping(curString: string, curStrPos: number) {
    this.options.onStringTyped(this.arrayPos, this);
    this.toggleBlinking(true);
    if (this.arrayPos === this.options.strings.length - 1) {
      this.complete();
      if (!this.options.loop || this.curLoop === this.options.loopCount) return;
    }
    this.timeout = setTimeout(() => {
      this.backspace(curString, curStrPos);
    }, this.options.backDelay);
  }

  backspace(curString: string, curStrPos: number) {
    if (this.pause.status) {
      this.setPauseStatus(curString, curStrPos, false);
      return;
    }
    if (this.options.fadeOut) return this.initFadeOut();

    this.toggleBlinking(false);
    const humanize = this.humanizer(this.options.backSpeed);

    this.timeout = setTimeout(() => {
      curStrPos = htmlParser.backSpaceHtmlChars(curString, curStrPos, this);
      this.replaceText(curString.substring(0, curStrPos));

      if (this.options.smartBackspace) {
        const nextString = this.options.strings[this.arrayPos + 1];
        this.stopNum =
          nextString &&
          curString.substring(0, curStrPos) ===
            nextString.substring(0, curStrPos)
            ? curStrPos
            : 0;
      }

      if (curStrPos > this.stopNum) {
        curStrPos--;
        this.backspace(curString, curStrPos);
      } else if (curStrPos <= this.stopNum) {
        this.arrayPos++;
        if (this.arrayPos === this.options.strings.length) {
          this.arrayPos = 0;
          this.options.onLastStringBackspaced();
          this.shuffleStringsIfNeeded();
          this.begin();
        } else {
          this.typewrite(
            this.options.strings[this.sequence[this.arrayPos]],
            curStrPos
          );
        }
      }
    }, humanize);
  }

  complete() {
    this.options.onComplete(this);
    this.options.loop ? this.curLoop++ : (this.typingComplete = true);
  }

  setPauseStatus(curString: string, curStrPos: number, isTyping: boolean) {
    this.pause.typewrite = isTyping;
    this.pause.curString = curString;
    this.pause.curStrPos = curStrPos;
  }

  toggleBlinking(isBlinking: boolean) {
    if (
      this.cursor &&
      !this.pause.status &&
      this.cursorBlinking !== isBlinking
    ) {
      this.cursorBlinking = isBlinking;
      this.cursor.classList.toggle('typed-cursor--blink', isBlinking);
    }
  }

  humanizer(speed: number): number {
    return Math.round((Math.random() * speed) / 2) + speed;
  }

  shuffleStringsIfNeeded() {
    if (this.options.shuffle) this.sequence.sort(() => Math.random() - 0.5);
  }

  initFadeOut() {
    this.el.className += ` ${this.options.fadeOutClass}`;
    if (this.cursor) {
      this.cursor.className += ` ${this.options.fadeOutClass}`;
    }
    setTimeout(() => {
      this.arrayPos++;
      this.replaceText('');
      if (this.options.strings.length > this.arrayPos) {
        this.typewrite(this.options.strings[this.sequence[this.arrayPos]], 0);
      } else {
        this.typewrite(this.options.strings[0], 0);
        this.arrayPos = 0;
      }
    }, this.options.fadeOutDelay);
  }

  replaceText(str: string) {
    if (this.options.attr) {
      this.el.setAttribute(this.options.attr, str);
    } else if (this.isInput) {
      (this.el as HTMLInputElement).value = str;
    } else if (this.options.contentType === 'html') {
      this.el.innerHTML = str;
    } else {
      this.el.textContent = str;
    }
  }

  bindFocusEvents() {
    if (this.isInput) {
      this.el.addEventListener('focus', () => this.stop());
      this.el.addEventListener('blur', () => {
        if (!(this.el as HTMLInputElement).value) this.start();
      });
    }
  }

  insertCursor() {
    if (this.options.showCursor && !this.cursor) {
      this.cursor = document.createElement('span');
      this.cursor.className = 'typed-cursor';
      this.cursor.setAttribute('aria-hidden', 'true');
      this.cursor.innerHTML = this.options.cursorChar;
      this.el.parentNode?.insertBefore(this.cursor, this.el.nextSibling);
    }
  }
}
