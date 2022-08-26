import { initialState, reducer, VideoPlayerState } from './reducer';

const { objectContaining } = expect;

describe('reducer', () => {
  it('can be played from initial state', () => {
    expect(reducer(initialState, { type: 'play' })).toEqual(
      objectContaining({
        status: 'playing',
      }),
    );
  });

  it('can be paused', () => {
    const state: VideoPlayerState = { ...initialState, status: 'playing' };
    expect(reducer(state, { type: 'pause' })).toEqual(
      objectContaining({
        status: 'paused',
      }),
    );
  });

  it('can update the current time', () => {
    const state: VideoPlayerState = { ...initialState, status: 'playing', currentTime: 1.38 };
    expect(reducer(state, { type: 'timeUpdate', currentTime: 1.39 })).toEqual(
      objectContaining({
        status: 'playing',
        currentTime: 1.39,
      }),
    );
  });

  it('can be played from paused state', () => {
    const state: VideoPlayerState = { ...initialState, status: 'paused' };
    expect(reducer(state, { type: 'play' })).toEqual(
      objectContaining({
        status: 'playing',
      }),
    );
  });

  it('can update the playback rate', () => {
    const state: VideoPlayerState = { ...initialState, playbackRate: 1.0 };
    expect(reducer(state, { type: 'setPlaybackRate', playbackRate: 2.0 })).toEqual(
      objectContaining({
        playbackRate: 2.0,
      }),
    );
  });
});
