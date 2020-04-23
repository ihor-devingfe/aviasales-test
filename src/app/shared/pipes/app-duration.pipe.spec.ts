import {AppDurationPipe} from './app-duration.pipe';

describe('AppDurationPipe', () => {
  let pipe: AppDurationPipe;

  beforeEach(() => {
    pipe = new AppDurationPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('should return only minutes', () => {
      expect(pipe.transform(59)).toBe('59мин');
      expect(pipe.transform(1)).toBe('1мин');
    });

    it('should return 0min in case of improper values', () => {
      expect(pipe.transform(0)).toBe('0мин');
      expect(pipe.transform(-1)).toBe('0мин');
    });

    it('should return only hours', () => {
      expect(pipe.transform(60)).toBe('1ч');
      expect(pipe.transform(120)).toBe('2ч');
    });

    it('should return both hours and minutes', () => {
      expect(pipe.transform(61)).toBe('1ч 1мин');
      expect(pipe.transform(149)).toBe('2ч 29мин');
    });
  });
});
