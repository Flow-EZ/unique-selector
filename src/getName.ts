/**
 * Returns the `name` attribute of the element (if one exists)
 * @param el - DOM element
 * @returns Name attribute selector or null
 */
export function getName(el: Element): string | null {
  const name = el.getAttribute('name');

  if (name !== null && name !== '') {
    return `[name="${CSS.escape(name)}"]`;
  }
  return null;
}
