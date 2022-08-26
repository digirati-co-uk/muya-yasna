export type NavigableSection = {
  /** The full hierarchical reference to this section, e.g. "Y.1.2.3" or "Par.4" */
  label: string;
  /** The identifier of _this_ section, usually numeric, e.g. "2" or "Y" */
  section_label: string;
  /** Optional chapter titles as HTML, e.g. "Beginning of the <i>hom</i> straining"  */
  display_label?: string;
  /** Time of the start of the section */
  seconds: number;
  /** Sub-sections */
  contains: NavigableSection[];
};
