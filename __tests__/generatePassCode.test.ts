/**
 * @format
 */

import {generatePassCode} from '../src/utils/generatePassCode';

describe('generatePassCode', () => {
  it('returns a code in BGS-XXXX format', () => {
    const code = generatePassCode();
    expect(code).toMatch(/^BGS-\d{4}$/);
  });
});
