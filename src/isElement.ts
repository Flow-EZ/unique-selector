/**
 * Determines if the passed el is a DOM element
 * @param el - The value to check
 * @returns True if the value is a DOM element, false otherwise
 */
const isElement = (el: unknown): el is Element => {
  let isElem: boolean;

  if (typeof HTMLElement === 'object') {
    isElem = el instanceof HTMLElement;
  } else {
    isElem = !!el && typeof el === 'object' && (el as Node).nodeType === 1 && typeof (el as Node).nodeName === 'string';
  }
  return isElem;
};

export { isElement };
