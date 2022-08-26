import { useContext } from 'react';
import { SelectedObjectContext } from '../../context/SelectedObjectContext';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { useObject } from '../../hooks/useObject';
import { ObjectInfo } from './ObjectInfo';
import { Content, Placeholder } from './Sidebar.style';

export function Sidebar() {
  const { dimensions } = useContext(VideoPlayerContext);
  const { selectedObjectId } = useContext(SelectedObjectContext);
  const { data, isLoading } = useObject(selectedObjectId);

  if (isLoading) {
    return (
      <Content>
        <Placeholder>Loading...</Placeholder>
      </Content>
    );
  }

  if (!data) {
    return (
      <Content>
        <Placeholder>Nothing selected</Placeholder>
      </Content>
    );
  }

  return (
    <Content maxHeight={dimensions.height}>
      <ObjectInfo {...data} />
    </Content>
  );
}
