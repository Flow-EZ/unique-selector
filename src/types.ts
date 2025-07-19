/**
 * Core type definitions for unique-selector library
 */

/**
 * Supported selector types for generating unique selectors
 */
export type SelectorType = 'ID' | 'Class' | 'Tag' | 'NthChild' | 'Attributes' | 'Name' | 'Href';

/**
 * Options interface for the unique selector function
 */
export interface UniqueOptions {
  /**
   * Array of selector types based on which the unique selector will be generated
   * @default ['ID', 'Class', 'Tag', 'NthChild']
   */
  selectorTypes?: SelectorType[];

  /**
   * Array of attribute names to ignore when generating attribute selectors
   * @default ['id', 'class', 'length']
   */
  attributesToIgnore?: string[];

  /**
   * Regular expression to exclude certain ID and class names
   * @default null
   */
  excludeRegex?: RegExp | null;
}

/**
 * Selector functions mapping type
 */
export interface SelectorFunctions {
  Tag: (el: Element) => string;
  NthChild: (el: Element) => string | null;
  Attributes: (el: Element) => string[];
  Class: (el: Element) => string[];
  ID: (el: Element) => string | null;
  Name: (el: Element) => string | null;
  Href: (el: Element) => string | null;
}

/**
 * Type guard for checking if a value is an Element
 */
export type ElementTypeGuard = (el: unknown) => el is Element;

/**
 * Function type for selector generation functions
 */
export type SelectorFunction = (element: Element) => string | string[] | null;

/**
 * Type for uniqueness test function
 */
export type UniquenessTest = (element: Element, selector: string) => boolean;

/**
 * Element selectors result type - used for getAllSelectors return value
 */
export interface ElementSelectorsResult {
  ID?: string | null;
  Tag?: string;
  Class?: string[];
  Attributes?: string[];
  NthChild?: string | null;
}
