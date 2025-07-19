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
    const classList = Array.prototype.slice.call(el.classList) as string[];

    // return only the valid CSS selectors based on RegEx
    return classList.filter((item) => (!/^[a-z_-][a-z\d_-]*$/i.test(item) ? null : item)).filter(Boolean);
  } catch {
    let className = el.getAttribute('class');

    if (!className) {
      return [];
    }

    // remove duplicate and leading/trailing whitespaces
    className = className.trim().replace(/\s+/g, ' ');

    // split into separate classnames
    return className.split(' ');
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
