import { Test, TestingModule } from '@nestjs/testing';
import { convertUnits, Units } from './utils';

describe('Utils', () => {
  it('should return meters', async () => {
    const units = Units.cm;
    const distance = 5461165;
    expect(convertUnits(units, distance)).toEqual(distance * 100 + units);
  });

  it('should return miles', async () => {
    const units = Units.km;
    const distance = 5461165;
    expect(convertUnits(units, distance)).toEqual(distance / 100 + units);
  });
});
