import { useContext } from 'react';
import { VideoPlayerContext } from '../../../../../context/VideoPlayerContext';
import { Thumb as StyledThumb } from './Thumb.style';

export type ThumbProps = {};

export function Thumb() {
  const { currentTime, videoElementRef } = useContext(VideoPlayerContext);
  const duration = videoElementRef.current?.duration || 0;

  const position = currentTime / duration;

  return <StyledThumb style={{ position: 'absolute', left: position * 100 + '%' }} />;
}
