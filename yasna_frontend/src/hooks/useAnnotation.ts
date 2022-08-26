import { useContext, useEffect, useState } from 'react';
import { VideoPlayerContext } from '../context/VideoPlayerContext';
import { AnnotationSet } from '../typings/Annotations';
import { useAnnotations } from './useAnnotations';

export function useAnnotation() {
  const { currentTime } = useContext(VideoPlayerContext);
  const [nextTime, setNextTime] = useState(currentTime);
  const [startTime, setStartTime] = useState(currentTime);
  const { data, refetch, isLoading } = useAnnotations(currentTime);
  const [currentAnnotation, setCurrentAnnotation] = useState<AnnotationSet>();

  function isBetween(value: number, start: number, end: number) {
    return value >= start && value <= end;
  }

  useEffect(() => {
    const update = () => {
      refetch().then(({ data }) => {
        if (data) {
          setNextTime(data.next_seconds);
          setStartTime(data.start_seconds);
        }
      });
    };

    if (!isBetween(currentTime, startTime, nextTime)) {
      update();
    }
  }, [currentTime, nextTime, startTime, refetch]);

  useEffect(() => {
    if (data) {
      const currentAnnotation = data.annotation_sets.find(set =>
        isBetween(currentTime, set.start_seconds, set.end_seconds),
      );
      setCurrentAnnotation(currentAnnotation);
    }
  }, [data, currentTime, currentAnnotation]);

  return {
    currentAnnotation,
    isLoading,
  };
}
