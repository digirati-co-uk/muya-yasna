import { useContext } from 'react';
import { VideoPlayerContext } from '../../../../../context/VideoPlayerContext';
import { Bar, Container } from './Progress.style';

export type ProgressProps = {};

export function Progress() {
  const { seekTo, currentTime, videoElementRef } = useContext(VideoPlayerContext);
  const duration = videoElementRef.current?.duration || 0;

  const handleClick: React.MouseEventHandler<HTMLProgressElement> = event => {
    const { x: offsetX = 0, width } = event.currentTarget.getBoundingClientRect();
    const { clientX } = event;
    seekTo(((clientX - offsetX) / width) * duration);
  };

  return (
    <Container>
      <Bar max={duration} value={currentTime} onClick={handleClick} />
    </Container>
  );
}
