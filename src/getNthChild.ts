import { isElement } from './isElement';

/**
 * Returns the selectors based on the position of the element relative to its siblings
 * @param element - DOM element
 * @returns nth-child selector or null
 */
const getNthChild = (element: Element): string | null => {
  let counter = 0;
  let k: number;
  let sibling: Node;
  const { parentNode } = element;

  if (parentNode) {
    const { childNodes } = parentNode;
    const len = childNodes.length;
    for (k = 0; k < len; k++) {
      sibling = childNodes[k];
      if (isElement(sibling)) {
        counter++;
        if (sibling === element) {
          return `:nth-child(${counter})`;
        }
      }
    }
  }
  return null;
};

export { getNthChild };
