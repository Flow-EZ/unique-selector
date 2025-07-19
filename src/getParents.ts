import { isElement } from './isElement';

/**
 * Returns all the element and all of its parents
 * @param el - DOM element
 * @returns Array of DOM elements (element and its parents)
 */
const getParents = (el: Element): Element[] => {
  const parents: Element[] = [];
  let currentElement: Node | null = el;

  while (isElement(currentElement)) {
    parents.push(currentElement);
    currentElement = currentElement.parentNode;
  }

  return parents;
};

export { getParents };
