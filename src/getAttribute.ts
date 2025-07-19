/**
 * Returns the {attr} selector of the element
 * @param el - The element
 * @param attribute - The attribute name
 * @param filter - Optional filter function
 * @returns The attribute selector or null
 */
const getAttribute = (el: Element, attribute: string): string | null => {
  const attributeValue = el.getAttribute(attribute);

  if (attributeValue === null) {
    return null;
  }

  if (attributeValue) {
    // if we have value that needs quotes
    return `[${attribute}="${CSS.escape(attributeValue)}"]`;
  }

  return `[${attribute}]`;
};

export { getAttribute };
