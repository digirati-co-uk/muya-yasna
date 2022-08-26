import styled from 'styled-components';

export const FullPage = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'video'
    'subtitles'
    'sidebar';

  @media only screen and (min-width: 720px) {
    grid-template-columns: minmax(70%, min-content) auto;
    grid-template-rows: min-content auto;
    grid-template-areas:
      'video sidebar'
      'subtitles subtitles';
  }
`;

export const VideoPlayerContainer = styled.section`
  grid-area: video;
  background-color: ${props => props.theme.colors.brand.black};
`;

export const SubtitlesContainer = styled.div`
  grid-area: subtitles;
  background-color: rebeccapurple;
`;

export const SidebarContainer = styled.div`
  grid-area: sidebar;
  background-color: dodgerblue;
`;
