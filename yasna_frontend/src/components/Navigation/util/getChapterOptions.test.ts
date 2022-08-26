import { NavigableSection } from '../../../typings/NavigableSection';
import { getChapterOptions } from './getChapterOptions';

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
              {
                label: 'Y.0.0.4',
                section_label: '4',
                seconds: 3711.564,
                contains: [],
              },
              {
                label: 'Y.0.0.5',
                section_label: '5',
                seconds: 3720.965,
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

describe('getChapterOptions', () => {
  it('returns an array of chapter number, time and optionally title values', () => {
    expect(getChapterOptions(mockNavData)).toEqual([
      {
        label: 'Par.0',
        displayLabel: 'Introduction',
        value: 'Par.0',
      },
      {
        label: 'Par.1',
        displayLabel: 'Drawing water from the <i>well</i>',
        value: 'Par.1',
      },
      {
        label: 'Y.0',
        value: 'Y.0',
      },
    ]);
  });

  it('returns an empty array if the nav data has not been fetched yet', () => {
    expect(getChapterOptions(undefined)).toEqual([]);
  });
});
