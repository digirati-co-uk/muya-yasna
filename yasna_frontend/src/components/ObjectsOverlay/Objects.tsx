import { useContext } from 'react';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { useObjectsInFrame } from '../../hooks/useObjectsInFrame';
import { Plot } from './Plot';

export function Objects() {
  const { currentTime } = useContext(VideoPlayerContext);
  const { data, isLoading } = useObjectsInFrame(currentTime);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Plot objects={data} />;
}
