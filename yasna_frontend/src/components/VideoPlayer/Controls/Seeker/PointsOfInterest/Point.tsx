import { useContext } from 'react';
import { VideoPlayerContext } from '../../../../../context/VideoPlayerContext';
import { NavigableSection } from '../../../../../typings/NavigableSection';
import { Dot, Label } from './PointsOfInterest.style';

export type PointProps = Pick<NavigableSection, 'seconds' | 'label'> & {
  position: number;
};

export function Point({ seconds, label, position }: PointProps) {
  const { seekTo } = useContext(VideoPlayerContext);
  return (
    <Dot
      data-testid="point-of-interest"
      style={{ position: 'absolute', left: position * 100 + '%' }}
      onClick={() => seekTo(seconds)}
    >
      <Label>{label}</Label>
    </Dot>
  );
}
