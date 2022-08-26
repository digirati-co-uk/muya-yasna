import { useContext } from 'react';
import { VideoPlayerContext } from '../../../context/VideoPlayerContext';
import { Container } from './TimeMeter.style';
import { AxisTop } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { displayTime } from '../../../util/formatTime';
import { useRef } from 'react';
import { useTheme } from 'styled-components';

export type TimeMeterProps = {
  start: number;
  end: number;
};

type CursorProps = {
  position: number;
};

function Cursor({ position }: CursorProps) {
  const theme = useTheme();

  const style = {
    transform: `translateX(${position}px)`,
  };

  return (
    <g style={style}>
      <line x1={0} y1={20} x2={0} y2={60} stroke={theme.colors.brand.orangeRed} />
      <circle cx={0} cy={20} r={8} fill={theme.colors.brand.orangeRed} />;
    </g>
  );
}

export function TimeMeter({ start, end }: TimeMeterProps) {
  const { currentTime } = useContext(VideoPlayerContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const timeFromStart = (time: number) => time - start;

  const position = timeFromStart(currentTime) / timeFromStart(end);

  const width = containerRef.current?.clientWidth || 0;
  const height = 60;

  const scale = scaleLinear({ domain: [start, end], range: [0, width] });

  const axisColor = theme.colors.grey.darkGrey2;

  return (
    <Container ref={containerRef}>
      <svg width={width} height={height}>
        <AxisTop
          scale={scale}
          tickFormat={time => displayTime(time as number)}
          top={height - 1}
          tickStroke={axisColor}
          stroke={axisColor}
          tickLabelProps={() => ({
            fill: axisColor,
            fontSize: 12,
            fontFamily: "'Work Sans' sans-serif",
            y: -15,
            textAnchor: 'middle',
          })}
        />
        <Cursor key={start} position={width * position} />
      </svg>
    </Container>
  );
}
