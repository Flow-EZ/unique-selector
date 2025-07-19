/**
 * Returns the Attribute selectors of the element
 * @param el - DOM element
 * @param attributesToIgnore - Array of attributes to ignore
 * @returns Array of attribute selectors
 */
const getAttributes = (el: Element, attributesToIgnore: string[] = ['id', 'class', 'length']): string[] => {
  const { attributes } = el;
  const attrs = Array.from(attributes);

  return attrs.reduce((sum: string[], next) => {
    if (!(attributesToIgnore.indexOf(next.nodeName) > -1)) {
      sum.push(`[${next.nodeName}="${CSS.escape(next.value)}"]`);
    }
    return sum;
  }, []);
};

export { getAttributes };
