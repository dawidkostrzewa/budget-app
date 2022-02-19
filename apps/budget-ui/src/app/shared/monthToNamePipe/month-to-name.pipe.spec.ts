import { MonthToNamePipe } from './month-to-name.pipe';

describe('MonthToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new MonthToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
