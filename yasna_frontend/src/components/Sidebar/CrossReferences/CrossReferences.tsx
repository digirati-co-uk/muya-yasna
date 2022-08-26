import { useContext } from 'react';
import { SelectedObjectContext } from '../../../context/SelectedObjectContext';
import { YasnaObjectSummary } from '../../../typings/ObjectTracking';
import { SectionTitle } from '../Sidebar.style';
import { ButtonAsLink } from './CrossReferences.style';

export type CrossReferencesProps = {
  list: YasnaObjectSummary[];
};

export function CrossReferences({ list }: CrossReferencesProps) {
  const { setSelectedObjectId } = useContext(SelectedObjectContext);

  if (list.length === 0) {
    return null;
  }

  return (
    <>
      <SectionTitle>See also</SectionTitle>
      <ul>
        {list.map(({ id, label }) => (
          <li key={id}>
            <ButtonAsLink onClick={() => setSelectedObjectId(id)}>{label}</ButtonAsLink>
          </li>
        ))}
      </ul>
    </>
  );
}
