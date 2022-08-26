import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { FullPage, SidebarContainer, SubtitlesContainer, VideoPlayerContainer } from './App.style';
import { VideoPlayer } from './components/VideoPlayer';
import { Sidebar } from './components/Sidebar';
import { VideoPlayerProvider } from './context/VideoPlayerContext';
import { Subtitles } from './components/Subtitles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SelectedObjectProvider } from './context/SelectedObjectContext';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <VideoPlayerProvider>
          <SelectedObjectProvider>
            <FullPage>
              <VideoPlayerContainer>
                <VideoPlayer />
              </VideoPlayerContainer>
              <SubtitlesContainer>
                <Subtitles />
              </SubtitlesContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
            </FullPage>
          </SelectedObjectProvider>
        </VideoPlayerProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
