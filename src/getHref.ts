/**
 * Returns the `href` attribute of the element (if one exists)
 * @param el - DOM element
 * @returns Href attribute selector or null
 */
export function getHref(el: Element): string | null {
  const href = el.getAttribute('href');

  if (href !== null && href !== '') {
    return `[href="${CSS.escape(href)}"]`;
  }
  return null;
}
