/**
 * Checks if the selector is unique
 * @param el - DOM element
 * @param selector - CSS selector string
 * @returns True if selector uniquely identifies the element
 */
const isUnique = (el: Element, selector: string): boolean => {
  if (!selector) return false;
  const rootNode = el.getRootNode();
  const queryRoot = rootNode.nodeType === Node.DOCUMENT_NODE ? (rootNode as Document) : el.ownerDocument;
  const els = queryRoot.querySelectorAll(selector);
  return els.length === 1 && els[0] === el;
};

export { isUnique };
