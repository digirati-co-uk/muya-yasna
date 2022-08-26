import { PointsOfInterest } from './PointsOfInterest';
import { Progress } from './Progress';
import { Container } from './Seeker.style';
import { Thumb } from './Thumb';

export type SeekerProps = {};

export function Seeker() {
  return (
    <Container>
      <Progress />
      <PointsOfInterest />
      <Thumb />
    </Container>
  );
}
