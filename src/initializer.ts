import { defaults, TypedOptions } from './defaults';

export default class Initializer {
  load(
    self: any,
    options: Partial<TypedOptions>,
    elementId: string | HTMLElement
  ) {
    self.el =
      typeof elementId === 'string'
        ? (document.querySelector(elementId) as HTMLElement)
        : elementId;
    self.options = { ...defaults, ...options };

    self.isInput = self.el.tagName.toLowerCase() === 'input';
    self.attr = self.options.attr;
    self.bindInputFocusEvents = self.options.bindInputFocusEvents;

    self.showCursor = self.isInput ? false : self.options.showCursor;
    self.cursorChar = self.options.cursorChar;
    self.cursorBlinking = true;

    self.elContent = self.attr
      ? self.el.getAttribute(self.attr)
      : self.el.textContent;
    self.contentType = self.options.contentType;

    self.typeSpeed = self.options.typeSpeed;
    self.startDelay = self.options.startDelay;
    self.backSpeed = self.options.backSpeed;
    self.smartBackspace = self.options.smartBackspace;
    self.backDelay = self.options.backDelay;

    self.fadeOut = self.options.fadeOut;
    self.fadeOutClass = self.options.fadeOutClass;
    self.fadeOutDelay = self.options.fadeOutDelay;

    self.isPaused = false;
    self.strings = self.options.strings.map((s: string) => s.trim());

    if (typeof self.options.stringsElement === 'string') {
      self.stringsElement = document.querySelector(self.options.stringsElement);
    } else {
      self.stringsElement = self.options.stringsElement;
    }

    if (self.stringsElement) {
      self.strings = [];
      self.stringsElement.style.cssText =
        'clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;';
      const strings = Array.prototype.slice.apply(self.stringsElement.children);
      strings.forEach((stringEl: HTMLElement) =>
        self.strings.push(stringEl.innerHTML.trim())
      );
    }

    self.strPos = 0;
    self.currentElContent = this.getCurrentElContent(self);

    if (self.currentElContent && self.currentElContent.length > 0) {
      self.strPos = self.currentElContent.length - 1;
      self.strings.unshift(self.currentElContent);
    }

    self.sequence = self.strings.map((_, i) => i);
    self.arrayPos = 0;
    self.stopNum = 0;
    self.loop = self.options.loop;
    self.loopCount = self.options.loopCount;
    self.curLoop = 0;
    self.shuffle = self.options.shuffle;

    self.pause = {
      status: false,
      typewrite: true,
      curString: '',
      curStrPos: 0,
    };
    self.typingComplete = false;

    self.autoInsertCss = self.options.autoInsertCss;
    if (self.autoInsertCss) {
      this.appendCursorAnimationCss(self);
      this.appendFadeOutAnimationCss(self);
    }
  }

  getCurrentElContent(self: any): string {
    return self.attr
      ? self.el.getAttribute(self.attr) || ''
      : self.isInput
      ? self.el.value || ''
      : self.contentType === 'html'
      ? self.el.innerHTML
      : self.el.textContent || '';
  }

  appendCursorAnimationCss(self: any) {
    const cssDataName = 'data-typed-js-cursor-css';
    if (!self.showCursor || document.querySelector(`[${cssDataName}]`)) return;

    const css = document.createElement('style');
    css.setAttribute(cssDataName, 'true');
    css.innerHTML = `
      .typed-cursor{ opacity: 1; }
      .typed-cursor.typed-cursor--blink{ animation: typedjsBlink 0.7s infinite; }
      @keyframes typedjsBlink{ 50% { opacity: 0.0; } }
    `;
    document.body.appendChild(css);
  }

  appendFadeOutAnimationCss(self: any) {
    const cssDataName = 'data-typed-fadeout-js-css';
    if (!self.fadeOut || document.querySelector(`[${cssDataName}]`)) return;

    const css = document.createElement('style');
    css.setAttribute(cssDataName, 'true');
    css.innerHTML = `
      .typed-fade-out{ opacity: 0; transition: opacity .25s; }
      .typed-cursor.typed-cursor--blink.typed-fade-out{ animation: 0; }
    `;
    document.body.appendChild(css);
  }
}

export const initializer = new Initializer();
