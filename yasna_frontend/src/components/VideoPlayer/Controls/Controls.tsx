import React from 'react';
import { ControlBar, ControlsContainer } from './Controls.style';

export type ControlsProps = {
  children: React.ReactNode;
};

export function Controls({ children }: ControlsProps) {
  return (
    <ControlsContainer>
      <ControlBar>{children}</ControlBar>
    </ControlsContainer>
  );
}
