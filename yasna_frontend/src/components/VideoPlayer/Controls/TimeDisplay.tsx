import { displayTime } from '../../../util/formatTime';
import { TimeDisplayControl } from './Controls.style';

export type TimeDisplayProps = {
  currentTime?: number;
  duration?: number;
};

export function TimeDisplay({ currentTime = 0, duration = 0 }: TimeDisplayProps) {
  return (
    <TimeDisplayControl role="timer">
      {displayTime(currentTime)} / {displayTime(duration)}
    </TimeDisplayControl>
  );
}
