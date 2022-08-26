import { Box } from '../../typings/ObjectTracking';
import { FloatingActionButton } from '../FloatingActionButton';
import { ObjectBox, ObjectPlotContainer } from './ObjectsOverlay.style';
import { ReactComponent as AddIcon } from '../../icons/add1.svg';
import { useContext } from 'react';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { SelectedObjectContext } from '../../context/SelectedObjectContext';

export type PlotProps = {
  objects?: Box[];
};

export function Plot({ objects = [] }: PlotProps) {
  const { dimensions } = useContext(VideoPlayerContext);
  const { setSelectedObjectId } = useContext(SelectedObjectContext);

  const boxDimensions = (box: Box) => ({
    ...box,
    width: dimensions.width * box.width,
    height: dimensions.height * box.height,
    x: dimensions.width * (box.x_centre - box.width / 2),
    y: dimensions.height * (box.y_centre - box.height / 2),
  });

  return (
    <ObjectPlotContainer>
      {objects.map((object, i) => (
        <ObjectBox key={i} {...boxDimensions(object)}>
          <FloatingActionButton
            mini
            onClick={() => setSelectedObjectId(object.yasnaobject.id)}
            aria-label={object.yasnaobject.label}
          >
            <AddIcon />
          </FloatingActionButton>
        </ObjectBox>
      ))}
    </ObjectPlotContainer>
  );
}
