import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { ControlButton } from './Controls.style';

export type PlayPauseButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  isPlaying: boolean;
};

export function PlayPauseButton({ isPlaying, ...buttonProps }: PlayPauseButtonProps) {
  const Icon = isPlaying ? BsFillPauseFill : BsFillPlayFill;
  const title = isPlaying ? 'Pause' : 'Play';
  return (
    <ControlButton {...buttonProps} aria-label={title} title={title}>
      <Icon />
    </ControlButton>
  );
}
