/**
 * Expose `unique`
 */

import { getID } from './getID';
import { getHref } from './getHref';
import { getClassSelectors } from './getClasses';
import { getCombinations } from './getCombinations';
import { getAttributes } from './getAttributes';
import { getNthChild } from './getNthChild';
import { getTag } from './getTag';
import { getName } from './getName';
import { isUnique } from './isUnique';
import { getParents } from './getParents';
import type { SelectorType, SelectorFunctions, UniqueOptions } from './types';

/**
 * Returns all the selectors of the element
 * @param el - DOM element
 * @param selectors - Array of selector types
 * @param attributesToIgnore - Array of attributes to ignore
 * @returns Object containing all selector types and their values
 */
const getAllSelectors = (
  el: Element,
  selectors: SelectorType[],
  attributesToIgnore: string[]
): Record<SelectorType, string | string[] | null> => {
  const funcs: SelectorFunctions = {
    Tag: getTag,
    NthChild: getNthChild,
    Attributes: (elem: Element) => getAttributes(elem, attributesToIgnore),
    Class: getClassSelectors,
    ID: getID,
    Name: getName,
    Href: getHref,
  };

  return selectors.reduce(
    (res, next) => {
      res[next] = funcs[next](el);
      return res;
    },
    {} as Record<SelectorType, string | string[] | null>
  );
};

/**
 * Tests uniqueness of the element inside its parent
 * @param element - DOM element
 * @param selector - CSS selector string
 * @returns True if selector uniquely identifies the element
 */
const testUniqueness = (element: Element, selector: string): boolean => {
  const { parentNode } = element;
  if (!parentNode) return false;
  const elements = parentNode.querySelectorAll(selector);
  return elements.length === 1 && elements[0] === element;
};

/**
 * Tests all selectors for uniqueness and returns the first unique selector.
 * @param element - DOM element
 * @param selectors - Array of CSS selectors
 * @returns First unique selector or undefined
 */
const getFirstUnique = (element: Element, selectors: string[]): string | undefined => {
  return selectors.find(testUniqueness.bind(null, element));
};

/**
 * Checks all the possible selectors of an element to find one unique and return it
 * @param element - DOM element
 * @param items - Array of selector items
 * @param tag - Optional tag selector
 * @returns Unique selector or null
 */
const getUniqueCombination = (element: Element, items: string[], tag?: string): string | null => {
  let combinations = getCombinations(items, 3);
  let firstUnique = getFirstUnique(element, combinations);

  if (firstUnique) {
    return firstUnique;
  }

  if (tag) {
    combinations = combinations.map((combination) => tag + combination);
    firstUnique = getFirstUnique(element, combinations);

    if (firstUnique) {
      return firstUnique;
    }
  }

  return null;
};

/**
 * Returns a unique selector based on the passed options
 * @param element - DOM element
 * @param selectorTypes - Array of selector types to try
 * @param attributesToIgnore - Array of attributes to ignore
 * @param excludeRegex - Regex to exclude certain selectors
 * @returns Unique selector string
 */
const getUniqueSelector = (
  element: Element,
  selectorTypes: SelectorType[],
  attributesToIgnore: string[],
  excludeRegex: RegExp | null
): string => {
  let foundSelector: string | null;

  const elementSelectors = getAllSelectors(element, selectorTypes, attributesToIgnore);

  if (excludeRegex && excludeRegex instanceof RegExp) {
    const idSelector = elementSelectors.ID;
    if (typeof idSelector === 'string') {
      elementSelectors.ID = excludeRegex.test(idSelector) ? null : idSelector;
    }

    const classSelectors = elementSelectors.Class;
    if (Array.isArray(classSelectors)) {
      elementSelectors.Class = classSelectors.filter((className) => !excludeRegex.test(className));
    }
  }

  for (const selectorType of selectorTypes) {
    const { ID, Tag, Name, Href, Class: Classes, Attributes, NthChild } = elementSelectors;

    switch (selectorType) {
      case 'ID':
        if (typeof ID === 'string' && testUniqueness(element, ID)) {
          return ID;
        }
        break;

      case 'Tag':
        if (typeof Tag === 'string' && testUniqueness(element, Tag)) {
          return Tag;
        }
        break;

      case 'Name':
        if (typeof Name === 'string' && testUniqueness(element, Name)) {
          return Name;
        }
        break;

      case 'Href':
        if (typeof Href === 'string' && testUniqueness(element, Href)) {
          return Href;
        }
        break;

      case 'Class':
        if (Array.isArray(Classes) && Classes.length > 0) {
          foundSelector = getUniqueCombination(element, Classes, typeof Tag === 'string' ? Tag : undefined);
          if (foundSelector) {
            return foundSelector;
          }
        }
        break;

      case 'Attributes':
        if (Array.isArray(Attributes) && Attributes.length > 0) {
          foundSelector = getUniqueCombination(element, Attributes, typeof Tag === 'string' ? Tag : undefined);
          if (foundSelector) {
            return foundSelector;
          }
        }
        break;

      case 'NthChild':
        if (typeof NthChild === 'string') {
          return NthChild;
        }
        break;
    }
  }
  return '*';
};

/**
 * Generate unique CSS selector for given DOM element
 *
 * @param el - DOM element
 * @param options - Configuration options
 * @returns Unique CSS selector string or null
 */
export default function unique(el: Element, options: UniqueOptions = {}): string | null {
  const {
    selectorTypes = ['ID', 'Class', 'Tag', 'Name', 'Href', 'NthChild'],
    attributesToIgnore = ['id', 'class', 'length'],
    excludeRegex = null,
  } = options;

  const allSelectors: string[] = [];
  const parents = getParents(el);

  for (const elem of parents) {
    const selector = getUniqueSelector(elem, selectorTypes, attributesToIgnore, excludeRegex);
    if (selector) {
      allSelectors.push(selector);
    }
  }

  const selectors: string[] = [];
  for (const it of allSelectors) {
    selectors.unshift(it);
    const selector = selectors.join(' > ');
    if (isUnique(el, selector)) {
      return selector;
    }
  }

  return null;
}
