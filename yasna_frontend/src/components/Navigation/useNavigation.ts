import { useContext, useEffect, useMemo, useState } from 'react';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { useNavigationData } from '../../hooks/useNavigationData';
import { NavigableSection } from '../../typings/NavigableSection';
import { getChapterOptions } from './util/getChapterOptions';
import { getSelectedChapterOptions } from './util/getSelectedChapterOptions';

export function useNavigation() {
  const { data } = useNavigationData();
  const { seekTo } = useContext(VideoPlayerContext);
  const [selectedChapter, setSelectedChapter] = useState<NavigableSection['label']>();
  const [selectedTime, setSelectedTime] = useState<NavigableSection['seconds']>();

  useEffect(() => {
    if (typeof selectedTime === 'number') {
      seekTo(selectedTime);
    }
  }, [selectedTime, seekTo]);

  const chapterOptions = useMemo(() => {
    return getChapterOptions(data);
  }, [data]);

  const selectedChapterOptions = useMemo(() => {
    return getSelectedChapterOptions(data, selectedChapter);
  }, [data, selectedChapter]);

  return { chapterOptions, selectedChapterOptions, setSelectedChapter, selectedTime, setSelectedTime };
}
