import { YasnaObject } from '../../../typings/ObjectTracking';
import { Blurb } from '../Blurb';
import { CrossReferences } from '../CrossReferences';
import { ObjectImages } from '../ObjectImages';
import { InfoContainer, Label, Translation } from '../Sidebar.style';

export type ObjectInfoProps = YasnaObject;

export function ObjectInfo({
  label,
  name_in_avestan,
  name_in_middle_persian,
  name_in_gujarati,
  object_images,
  translation,
  definition,
  function: objectFunction,
  description_of_action,
  where_during_ritual,
  interpretation,
  comments,
  references,
  cross_references,
  collaborator,
}: ObjectInfoProps) {
  return (
    <InfoContainer>
      <ObjectImages images={object_images} />
      <Label dangerouslySetInnerHTML={{ __html: label }} />
      <Translation>{translation}</Translation>
      <Blurb title="Avestan" text={name_in_avestan} />
      <Blurb title="Middle Persian" text={name_in_middle_persian} />
      <Blurb title="Gujarati" text={name_in_gujarati} />
      <Blurb title="Definition" text={definition} />
      <Blurb title="Action" text={description_of_action} />
      <Blurb title="Function" text={objectFunction} />
      <Blurb title="Where?" text={where_during_ritual} />
      <Blurb title="Interpretation" text={interpretation} />
      <Blurb title="Collaborator" text={collaborator} />
      <Blurb title="References" text={references} />
      <CrossReferences list={cross_references} />
      <Blurb title="Comments" text={comments} />
    </InfoContainer>
  );
}
