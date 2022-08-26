import { useContext } from 'react';
import { mp4Src } from './sources';
import { Controls, PlayPauseButton, TimeDisplay } from './Controls';
import { ObjectsOverlay } from '../ObjectsOverlay';
import { Container, Video } from './VideoPlayer.style';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { Seeker } from './Controls/Seeker';

export function VideoPlayer() {
  const player = useContext(VideoPlayerContext);

  const playOrPause = () => {
    if (player.videoElementRef.current) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  const handleTimeUpdate: React.ReactEventHandler<HTMLVideoElement> = event => {
    player.timeUpdate(event.currentTarget.currentTime);
  };

  return (
    <Container>
      <Video
        ref={player.videoElementRef}
        playsInline
        disablePictureInPicture
        data-testid="video"
        onClick={playOrPause}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={mp4Src} type="video/mp4" />
      </Video>
      {player.isPaused && <ObjectsOverlay {...player.dimensions} />}
      <Controls>
        <PlayPauseButton isPlaying={player.isPlaying} onClick={playOrPause} />
        <TimeDisplay currentTime={player.currentTime} duration={player.videoElementRef.current?.duration} />
        <Seeker />
      </Controls>
    </Container>
  );
}
