import { Overlay, OverlayContainer, OverlayProps } from './ObjectsOverlay.style';
import { Objects } from './Objects';

export type ObjectsOverlayProps = OverlayProps;

export function ObjectsOverlay(props: ObjectsOverlayProps) {
  return (
    <OverlayContainer>
      <Overlay {...props} aria-label="objects">
        <Objects />
      </Overlay>
    </OverlayContainer>
  );
}
