import {AppJoinPipe} from './app-join.pipe';

describe('AppJoinPipe', () => {
  let pipe: AppJoinPipe;

  beforeEach(() => {
    pipe = new AppJoinPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('should join array with comma and space', () => {
      expect(pipe.transform(['str', 'str1'])).toBe('str, str1');
    });
  });
});
