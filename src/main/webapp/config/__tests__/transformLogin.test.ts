import emptyTestData from '../../__mocks__/emptyDataList.json';
import testLoginWebRedirect from '../../__mocks__/coraLoginWebRedirect.json';
import testLoginWithTwoWebRedirect from '../../__mocks__/coraLoginWithTwoWebRedirect.json';
import testLoginLDAP from '../../__mocks__/coraLoginLDAP.json';
import testLoginWithTwoLDAP from '../../__mocks__/coraLoginWithTwoLDAP.json';
import testLoginMixed from '../../__mocks__/coraLoginMixed.json';
import { transformLogin } from '../transformLogin';

describe('transformLogin', () => {
  it('Empty list should return empty', () => {
    const login = transformLogin(emptyTestData);
    expect(login).toStrictEqual([]);
  });

  it('Returns one login entry', () => {
    const login = transformLogin(testLoginWebRedirect);
    expect(login).toHaveLength(1);
  });

  it('Returns one loginUnit entry with id', () => {
    const login = transformLogin(testLoginWebRedirect);
    const firstLogin = login[0];
    expect(firstLogin.id).toEqual('someLoginUnitId');
  });

  describe('webRedirect', () => {
    it('Returns one login entry with correct keys', () => {
      const login = transformLogin(testLoginWebRedirect);
      expect(login).toHaveLength(1);
      expect(login[0]).toStrictEqual({
        id: 'someLoginUnitId',
        loginName: 'DiVA Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      });
    });

    it('Returns two login entries correct keys', () => {
      const login = transformLogin(testLoginWithTwoWebRedirect);
      expect(login).toHaveLength(2);
      expect(login[0]).toStrictEqual({
        id: 'someLoginUnitId',
        loginName: 'DiVA Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      });
      expect(login[1]).toStrictEqual({
        id: 'someLoginOtherUnitId',
        loginName: 'DiVA Other Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      });
    });
  });

  describe('ldap', () => {
    it('Returns one login entry with correct keys', () => {
      const login = transformLogin(testLoginLDAP);
      expect(login).toHaveLength(1);
      expect(login[0]).toStrictEqual({
        id: 'systemOneLoginPassword',
        viewDefinition: 'viewDefinitionPasswordGroup',
        viewPresentation: 'viewDefinitionPasswordPGroup',
        description: 'Password login for systemOne',
        type: 'password'
      });
    });

    it('Returns two login entries correct keys', () => {
      const login = transformLogin(testLoginWithTwoLDAP);
      expect(login).toHaveLength(2);
      expect(login[0]).toStrictEqual({
        id: 'systemOneLoginPassword',
        viewDefinition: 'viewDefinitionPasswordGroup',
        viewPresentation: 'viewDefinitionPasswordPGroup',
        description: 'Password login for systemOne',
        type: 'password'
      });
      expect(login[1]).toStrictEqual({
        id: 'systemOneLoginPassword2',
        viewDefinition: 'viewDefinitionPasswordGroup',
        viewPresentation: 'viewDefinitionPasswordPGroup',
        description: 'Password login for systemOne',
        type: 'password'
      });
    });
  });

  describe('mixed', () => {
    it('Returns two login entries mixed types', () => {
      const login = transformLogin(testLoginMixed);
      expect(login).toHaveLength(2);
      expect(login[0]).toStrictEqual({
        id: 'systemOneLoginPassword',
        viewDefinition: 'viewDefinitionPasswordGroup',
        viewPresentation: 'viewDefinitionPasswordPGroup',
        description: 'Password login for systemOne',
        type: 'password'
      });
      expect(login[1]).toStrictEqual({
        id: 'someLoginUnitId',
        loginName: 'DiVA Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      });
    });
  });
});
