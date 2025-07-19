/**
 * Returns the Tag of the element
 * @param  { Object } element
 * @return { String }
 */
export const getTag = (el: Element) => {
  return el.tagName.toLowerCase().replace(/:/g, '\\:');
};
