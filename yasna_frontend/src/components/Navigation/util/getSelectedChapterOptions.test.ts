import { NavigableSection } from '../../../typings/NavigableSection';
import { getSelectedChapterOptions } from './getSelectedChapterOptions';

const mockNavData: NavigableSection[] = [
  {
    label: 'Paragnā',
    section_label: 'Par',
    seconds: 0.0,
    contains: [
      {
        label: 'Par.0',
        section_label: '0',
        seconds: 0.0,
        display_label: 'Introduction',
        contains: [],
      },
      {
        label: 'Par.1',
        section_label: '1',
        seconds: 235.272,
        display_label: 'Drawing water from the <i>well</i>',
        contains: [],
      },
    ],
  },
  {
    label: 'Yasna',
    section_label: 'Y',
    seconds: 3607,
    contains: [
      {
        label: 'Y.0',
        section_label: '0',
        seconds: 3607,
        contains: [
          {
            label: 'Y.0.0',
            section_label: '0',
            seconds: 3607,
            contains: [
              {
                label: 'Y.0.0.1',
                section_label: '1',
                seconds: 3607,
                contains: [],
              },
              {
                label: 'Y.0.0.2',
                section_label: '2',
                seconds: 3627.742,
                contains: [],
              },
              {
                label: 'Y.0.0.3',
                section_label: '3',
                seconds: 3694.111,
                contains: [],
              },
            ],
          },
          {
            label: 'Y.0.1',
            section_label: '1',
            seconds: 3728.262,
            contains: [
              {
                label: 'Y.0.1.1',
                section_label: '1',
                seconds: 3728.262,
                contains: [],
              },
              {
                label: 'Y.0.1.2',
                section_label: '2',
                seconds: 3741.601,
                contains: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

describe('getSelectedChapterOptions', () => {
  it('gets the nested stanza/sub-stanza options for the selected chapter', () => {
    expect(getSelectedChapterOptions(mockNavData, 'Y.0')).toEqual([
      {
        label: 'Y.0.0.1',
        value: 3607,
      },
      {
        label: 'Y.0.0.2',
        value: 3627.742,
      },
      {
        label: 'Y.0.0.3',
        value: 3694.111,
      },
      {
        label: 'Y.0.1.1',
        value: 3728.262,
      },
      {
        label: 'Y.0.1.2',
        value: 3741.601,
      },
    ]);
  });

  it('returns an empty array when no chapter has been selected', () => {
    expect(getSelectedChapterOptions(mockNavData)).toEqual([]);
  });

  it("returns an empty array when the nav data hasn't loaded yet", () => {
    expect(getSelectedChapterOptions()).toEqual([]);
  });
});
