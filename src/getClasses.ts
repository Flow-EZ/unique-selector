/**
 * Get class names for an element
 *
 * @param el - DOM element
 * @returns Array of class names
 */
const getClasses = (el: Element): string[] => {
  if (!el.hasAttribute('class')) {
    return [];
  }

  try {
    // return only the valid CSS selectors based on RegEx
    return Array.prototype.slice.call(el.classList);
  } catch {
    let className = el.getAttribute('class');

    if (!className) {
      return [];
    }

    // remove duplicate and leading/trailing whitespaces
    className = className.trim();

    // split into separate classnames
    return className.split(/\s+/g).filter(Boolean);
  }
};

/**
 * Returns the Class selectors of the element
 * @param el - DOM element
 * @returns Array of CSS class selectors
 */
const getClassSelectors = (el: Element): string[] => {
  const classList = getClasses(el).filter(Boolean);
  return classList.map((cl) => `.${CSS.escape(cl)}`);
};

export { getClasses, getClassSelectors };
