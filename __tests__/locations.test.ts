import {LOCATIONS, formatCoordinates, getLocationById} from '../src/data/locations';

describe('locations', () => {
  it('contains all 12 nearby locations', () => {
    expect(LOCATIONS).toHaveLength(12);
  });

  it('formats coordinates with degree symbols', () => {
    expect(formatCoordinates(41.3124, 19.4458)).toBe('41.3124° N, 19.4458° E');
  });

  it('finds location by id', () => {
    const location = getLocationById('sunset-beach');
    expect(location?.name).toBe('Sunset Beach');
    expect(location?.tagline).toBe('Golden sand and sea views.');
    expect(location?.description).toHaveLength(2);
  });
});
