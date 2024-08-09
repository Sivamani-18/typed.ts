export default class HTMLParser {
  typeHtmlChars(curString: string, curStrPos: number, self: any): number {
    if (self.contentType !== 'html') return curStrPos;
    const curChar = curString.substring(curStrPos).charAt(0);
    if (curChar === '<' || curChar === '&') {
      let endTag = curChar === '<' ? '>' : ';';
      while (curString.substring(curStrPos + 1).charAt(0) !== endTag) {
        curStrPos++;
        if (curStrPos + 1 > curString.length) break;
      }
      curStrPos++;
    }
    return curStrPos;
  }

  backSpaceHtmlChars(curString: string, curStrPos: number, self: any): number {
    if (self.contentType !== 'html') return curStrPos;
    const curChar = curString.substring(curStrPos).charAt(0);
    if (curChar === '>' || curChar === ';') {
      let endTag = curChar === '>' ? '<' : '&';
      while (curString.substring(curStrPos - 1).charAt(0) !== endTag) {
        curStrPos--;
        if (curStrPos < 0) break;
      }
      curStrPos--;
    }
    return curStrPos;
  }
}

export const htmlParser = new HTMLParser();
