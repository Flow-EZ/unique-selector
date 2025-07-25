/**
 * Returns the ID selector of the element
 * @param el - DOM element
 * @returns ID selector string or null
 */
const getID = (el: Element): string | null => {
  const id = el.getAttribute('id');

  if (id !== null && id !== '') {
    // if the ID starts with a number or contains ":" selecting with a hash will cause a DOMException
    return `#${CSS.escape(id)}`;
  }
  return null;
};

export { getID };
