import { Navigation } from '../Navigation';
import { PlaybackSpeedSlider } from '../PlaybackSpeedSlider';
import { MuyaYasnaLogo } from '../MuyaYasnaLogo';
import { AnnotationsContainer, Container, NavPanel } from './Subtitles.style';
import { Annotations } from '../Annotations';

export function Subtitles() {
  return (
    <Container>
      <NavPanel>
        <Navigation />
        <PlaybackSpeedSlider />
        <MuyaYasnaLogo />
      </NavPanel>
      <AnnotationsContainer>
        <Annotations />
      </AnnotationsContainer>
    </Container>
  );
}
