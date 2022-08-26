import { Text, SectionTitle } from '../Sidebar.style';

export type BlurbProps = {
  title?: string;
  text?: string;
};

export function Blurb({ title, text }: BlurbProps) {
  if (!text) {
    return null;
  }

  return (
    <>
      {title && <SectionTitle>{title}</SectionTitle>}
      <Text dangerouslySetInnerHTML={{ __html: text }} />
    </>
  );
}
