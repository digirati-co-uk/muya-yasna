import { useContext, useMemo } from 'react';
import { VideoPlayerContext } from '../../../../../context/VideoPlayerContext';
import { useNavigationData } from '../../../../../hooks/useNavigationData';
import { Point, PointProps } from './Point';
import { List } from './PointsOfInterest.style';

export function PointsOfInterest() {
  const { data, isLoading } = useNavigationData();
  const { videoElementRef } = useContext(VideoPlayerContext);
  const duration = videoElementRef.current?.duration || 0;

  const chapters = useMemo(() => {
    const results: PointProps[] = [];
    data?.forEach(section => {
      section.contains.forEach(({ seconds, label }) => {
        results.push({ seconds, label, position: seconds / duration });
      });
    });
    return results;
  }, [data, duration]);

  if (isLoading) {
    return null;
  }

  return (
    <List>
      {chapters.map(chapter => (
        <Point key={chapter.label} {...chapter} />
      ))}
    </List>
  );
}
