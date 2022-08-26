import {
  createContext,
  createRef,
  ReactNode,
  Reducer,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { initialState, reducer, VideoPlayerAction, VideoPlayerState } from './reducer';

type Dimensions = {
  height: number;
  width: number;
};

export type VideoPlayerContextType = {
  videoElementRef: RefObject<HTMLVideoElement>;
  play: () => void;
  pause: () => void;
  isPaused: boolean;
  isPlaying: boolean;
  dimensions: Dimensions;
  setDimensions: (dimensions: Dimensions) => void;
  currentTime: number;
  timeUpdate: (currentTime: number) => void;
  playbackRate: number;
  setPlaybackRate: (playbackRate: number) => void;
  seekTo: (seconds: number) => void;
};

export const initialContextState: VideoPlayerContextType = {
  videoElementRef: createRef(),
  play: () => null,
  pause: () => null,
  isPaused: false,
  isPlaying: false,
  dimensions: { height: 0, width: 0 },
  setDimensions: () => null,
  currentTime: 0.0,
  timeUpdate: () => null,
  playbackRate: 1.0,
  setPlaybackRate: (playbackRate: number) => null,
  seekTo: () => null,
};

export const VideoPlayerContext = createContext(initialContextState);

export type VideoPlayerProviderProps = {
  children: ReactNode;
};

export function VideoPlayerProvider({ children }: VideoPlayerProviderProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [state, dispatch] = useReducer<Reducer<VideoPlayerState, VideoPlayerAction>>(reducer, initialState);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const resizeVideo = useCallback(() => {
    if (videoElementRef.current) {
      const { clientHeight, clientWidth } = videoElementRef.current;
      setDimensions({ height: clientHeight, width: clientWidth });
    }
  }, []);

  const requestRef = useRef(0);

  useLayoutEffect(() => {
    const getCurrentTime = () => {
      requestRef.current = requestAnimationFrame(getCurrentTime);
      timeUpdate(videoElementRef.current?.currentTime || 0);
    };
    requestRef.current = requestAnimationFrame(getCurrentTime);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeVideo);
    return () => window.removeEventListener('resize', resizeVideo);
  }, [resizeVideo]);

  const play = useCallback(() => {
    dispatch({ type: 'play' });
    if (videoElementRef.current) {
      resizeVideo();
      videoElementRef.current.play();
    }
  }, [resizeVideo]);

  const pause = () => {
    dispatch({ type: 'pause' });
    if (videoElementRef.current) {
      videoElementRef.current.pause();
    }
  };

  const timeUpdate = (currentTime: number) => {
    dispatch({ type: 'timeUpdate', currentTime });
  };

  const setPlaybackRate = (playbackRate: number) => {
    dispatch({ type: 'setPlaybackRate', playbackRate });
    if (videoElementRef.current) {
      videoElementRef.current.playbackRate = playbackRate;
    }
  };

  const seekTo = useCallback((seconds: number) => {
    timeUpdate(seconds);
    if (videoElementRef.current) {
      if (videoElementRef.current.fastSeek) {
        videoElementRef.current.fastSeek(seconds);
      } else {
        videoElementRef.current.currentTime = seconds;
      }
    }
  }, []);

  const contextValue = useMemo(() => {
    const { status, currentTime, playbackRate } = state;
    return {
      isPaused: status === 'paused',
      isPlaying: status === 'playing',
      videoElementRef,
      play,
      pause,
      dimensions,
      setDimensions,
      currentTime,
      timeUpdate,
      playbackRate,
      setPlaybackRate,
      seekTo,
    };
  }, [state, dimensions, play, seekTo]);

  return <VideoPlayerContext.Provider value={contextValue}>{children}</VideoPlayerContext.Provider>;
}
