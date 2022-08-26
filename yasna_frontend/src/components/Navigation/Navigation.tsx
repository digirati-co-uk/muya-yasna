import { Dropdown } from './Dropdown';
import { Container } from './Navigation.style';
import { useNavigation } from './useNavigation';

export function Navigation() {
  const { chapterOptions, selectedChapterOptions, setSelectedChapter, setSelectedTime } = useNavigation();

  const handleChapterSelect = (value: string | number) => {
    setSelectedChapter(value as string);
  };

  const handleSubsectionSelect = (value: string | number) => {
    setSelectedTime(value as number);
  };

  return (
    <Container>
      <Dropdown placeholder="Chapter" options={chapterOptions} onSelect={handleChapterSelect} />
      <Dropdown placeholder="Stanza & subsection" options={selectedChapterOptions} onSelect={handleSubsectionSelect} />
    </Container>
  );
}
