import { Annotations } from '../../typings/Annotations';
import { Container, Label, Text } from './AnnotationDisplay.style';

type AnnotationDetailProps = {
  label?: string;
  children?: string;
  isRitualAction?: boolean;
};

type AnnotationLabelProps = {
  chapter?: string;
  stanza?: string;
  stanza_subdiv: string;
  chapter_title?: string;
};


function AnnotationLabel({ chapter, stanza, stanza_subdiv, chapter_title=""}: AnnotationLabelProps) {
  var label = stanza_subdiv || stanza || chapter; 
  return (
    <>
      <Label isRitualAction={false} dangerouslySetInnerHTML={{ __html: label! }} />
      <Text isRitualAction={false} dangerouslySetInnerHTML={{ __html: chapter_title }} />
    </>
  )
}

function AnnotationDetail({ label, children, isRitualAction = false }: AnnotationDetailProps) {
  return label && children ? (
    <>
      <Label isRitualAction={isRitualAction} dangerouslySetInnerHTML={{ __html: label }} />
      <Text isRitualAction={isRitualAction} dangerouslySetInnerHTML={{ __html: children }} />
    </>
  ) : null;
}

export type AnnotationDisplayProps = Annotations & {};

export function AnnotationDisplay({
  Chapter_Title,
  Chapter, 
  Ritual_Part, 
  Stanza_Ref, 
  Stanza_SubDiv, 
  Stanza_Lang,
  Stanza_OTxt,
  Stanza_TrTxt,
  RA_Description,
  RA_Guj,
  RA_MP,
}: AnnotationDisplayProps) {
  return (
    <Container>
    <AnnotationLabel stanza_subdiv={Stanza_SubDiv} stanza={Stanza_Ref} chapter={Chapter} chapter_title={Chapter_Title} />
      <AnnotationDetail label={Stanza_Lang}>{Stanza_OTxt}</AnnotationDetail>
      <AnnotationDetail label="English">{Stanza_TrTxt}</AnnotationDetail>
      <AnnotationDetail label="Ritual Action (English)" isRitualAction>
        {RA_Description}
      </AnnotationDetail>
      <AnnotationDetail label="Ritual Action (Gujarati)" isRitualAction>
        {RA_Guj}
      </AnnotationDetail>
      <AnnotationDetail label="Ritual Action (Middle Persian)" isRitualAction>
        {RA_MP}
      </AnnotationDetail>
    </Container>
  );
}
