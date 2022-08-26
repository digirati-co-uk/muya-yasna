import { displayTime } from './formatTime';

describe('displayTime', () => {
  it('converts a time in seconds to hours:mins:seconds', () => {
    expect(displayTime(0.0)).toEqual('00:00:00');
    expect(displayTime(0.9)).toEqual('00:00:00');
    expect(displayTime(1)).toEqual('00:00:01');
    expect(displayTime(59)).toEqual('00:00:59');
    expect(displayTime(60)).toEqual('00:01:00');
    expect(displayTime(3540)).toEqual('00:59:00');
    expect(displayTime(3600)).toEqual('01:00:00');
    expect(displayTime(360000)).toEqual('100:00:00');
  });
});
