import { NavigableSection } from '../../../typings/NavigableSection';

type ParsedChapterNavigation = {
  label: string;
  displayLabel?: string;
  value: string;
};

export function getChapterOptions(navData: NavigableSection[] = []) {
  const chapterOptions: ParsedChapterNavigation[] = [];

  navData.forEach(section => {
    section.contains.forEach(chapter => {
      const { label, display_label } = chapter;
      const option = display_label
        ? {
            label,
            displayLabel: display_label,
            value: label,
          }
        : {
            label,
            value: label,
          };
      chapterOptions.push(option);
    });
  });

  return chapterOptions;
}
