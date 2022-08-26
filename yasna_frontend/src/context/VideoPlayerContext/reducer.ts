export type VideoPlayerAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'timeUpdate'; currentTime: number }
  | { type: 'setPlaybackRate'; playbackRate: number };

export type VideoPlayerState = {
  status: 'initial' | 'playing' | 'paused';
  currentTime: number;
  playbackRate: number;
};

export const initialState: VideoPlayerState = {
  status: 'initial',
  currentTime: 0.0,
  playbackRate: 1.0,
};

export function reducer(state: VideoPlayerState, action: VideoPlayerAction): VideoPlayerState {
  switch (action.type) {
    case 'play': {
      return { ...state, status: 'playing' };
    }
    case 'pause': {
      return { ...state, status: 'paused' };
    }
    case 'timeUpdate': {
      const { currentTime } = action;
      return { ...state, currentTime };
    }
    case 'setPlaybackRate': {
      const { playbackRate } = action;
      return { ...state, playbackRate };
    }
    default: {
      return state;
    }
  }
}
