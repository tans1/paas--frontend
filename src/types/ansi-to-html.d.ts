declare module "ansi-to-html" {
  interface AnsiToHtmlOptions {
    newline?: boolean;
    escapeXML?: boolean;
    colors?: { [key: number]: string };
  }

  class AnsiToHtml {
    constructor(options?: AnsiToHtmlOptions);
    toHtml(text: string): string;
  }

  export default AnsiToHtml;
}
