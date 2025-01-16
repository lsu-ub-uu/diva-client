import emptyTestData from '@/__mocks__/bff/emptyDataList.json';
import testLoginUnit from '@/__mocks__/bff/coraLoginUnit.json';
import testLoginUnitWithTwoUnits from '@/__mocks__/bff/coraLoginUnitWithTwoUnits.json';
import { transformLoginUnit } from '../transformLoginUnit.server';

describe('transformLoginUnit', () => {
  it('Empty list should return empty', () => {
    const loginUnit = transformLoginUnit(emptyTestData);
    expect(loginUnit).toStrictEqual([]);
  });

  it('Returns one loginUnit entry', () => {
    const loginUnit = transformLoginUnit(testLoginUnit);
    expect(loginUnit).toHaveLength(1);
  });

  it('Returns one loginUnit entry with id', () => {
    const loginUnit = transformLoginUnit(testLoginUnit);
    const firstLoginUnit = loginUnit[0];
    expect(firstLoginUnit.id).toEqual('someLoginUnitId');
  });

  it('Returns one loginUnit entry with id and login', () => {
    const loginUnit = transformLoginUnit(testLoginUnit);
    expect(loginUnit).toHaveLength(1);
    expect(loginUnit[0]).toStrictEqual({
      id: 'someLoginUnitId',
      login: 'someLoginDiVAwr',
      loginDescription: 'someDiVALoginUnitText',
    });
  });

  it('Returns two loginUnit entries with id and login', () => {
    const loginUnit = transformLoginUnit(testLoginUnitWithTwoUnits);
    expect(loginUnit).toHaveLength(2);
    expect(loginUnit[0]).toStrictEqual({
      id: 'someLoginUnitId',
      login: 'someLoginDiVAwr',
      loginDescription: 'someDiVALoginUnitText',
    });
    expect(loginUnit[1]).toStrictEqual({
      id: 'someLoginUnitId2',
      login: 'someLoginDiVAwr2',
      loginDescription: 'someDiVALoginUnitText2',
    });
  });
});
