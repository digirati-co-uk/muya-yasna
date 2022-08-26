import { NavigableSection } from '../../../typings/NavigableSection';

type ParsedStanzaSubdivisionOption = {
  label: string;
  value: number;
};

function getSelectedChapter(
  navData: NavigableSection[],
  selectedChapterLabel: NavigableSection['label'],
): NavigableSection | null {
  let selectedChapter: NavigableSection | null = null;

  navData.forEach(section => {
    section.contains.forEach(chapter => {
      if (chapter.label === selectedChapterLabel) {
        selectedChapter = chapter;
      }
    });
  });

  return selectedChapter;
}

export function getSelectedChapterOptions(
  navData: NavigableSection[] = [],
  selectedChapterLabel: NavigableSection['label'] = '',
) {
  const selectedChapter = getSelectedChapter(navData, selectedChapterLabel);

  if (!selectedChapter) {
    return [];
  }

  const selectedChapterOptions: ParsedStanzaSubdivisionOption[] = [];

  selectedChapter.contains.forEach(stanza => {
    stanza.contains.forEach(subdivision => {
      selectedChapterOptions.push({
        label: subdivision.label,
        value: subdivision.seconds,
      });
    });
  });

  return selectedChapterOptions;
}
