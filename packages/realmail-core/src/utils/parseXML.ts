const domParser = new DOMParser();
export function parseXML(text: string) {
  const dom = domParser.parseFromString(text, 'text/html');
  const root = dom.body.firstChild as Element;

  if (!(dom.firstChild instanceof Element)) {
    throw new Error('Invalid content');
  }
  return dom.body;

}

