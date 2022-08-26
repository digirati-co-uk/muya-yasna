import { ReactEventHandler, useContext } from 'react';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { Container, Slider, Tick, TickList } from './PlaybackSpeedSlider.style';

export function PlaybackSpeedSlider() {
  const { playbackRate, setPlaybackRate } = useContext(VideoPlayerContext);

  const handleChange: ReactEventHandler<HTMLInputElement> = event => {
    setPlaybackRate(event.currentTarget.valueAsNumber);
  };

  const tickValues = [0.5, 1.0, 1.5, 2.0];

  return (
    <Container>
      <TickList>
        {tickValues.map(tickValue => (
          <Tick key={tickValue} isSelected={playbackRate === tickValue}>
            {tickValue.toFixed(1)}x
          </Tick>
        ))}
      </TickList>
      <Slider
        type="range"
        aria-label="Playback speed"
        min={0.5}
        max={2.0}
        step={0.05}
        value={playbackRate}
        onChange={handleChange}
      />
    </Container>
  );
}
