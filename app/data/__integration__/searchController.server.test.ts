/*
/!*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *!/
import { startServer } from './utils/startServer';
import { Auth } from '../../types/Auth';
import { loginAsDivaAdmin } from './utils/loginUtil';
import { Server } from 'http';
import supertest from 'supertest';
import { createDivaOutput, deleteDivaOutput } from './utils/dataUtil.server';
import { createExampleDivaOuput } from './utils/testData';

describe('SearchController', () => {
  let server: Server;
  beforeAll(async () => {
    server = await startServer();
  });
  afterAll((done) => {
    server.close(done);
  });

  describe('/api/advanced/search', () => {
    it('makes a simple search', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'sqip';

      const { id } = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .get('/api/search/advanced/diva-outputSimpleSearch')
        .set('Authtoken', authToken)
        .query({
          query: JSON.stringify({
            search: { include: { includePart: { genericSearchTerm: [{ value: title }] } } }
          })
        });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
      expect(parseInt(response.body.totalNo)).toBeGreaterThanOrEqual(1);

      // Cleanup
      await deleteDivaOutput(id, authToken);
    });
  });

  describe('/api/search/divaOutput', () => {
    it('makes a simple search', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'sqip';

      const { id } = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .get('/api/search/divaOutput')
        .set('Authtoken', authToken)

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);

      // Cleanup
      await deleteDivaOutput(id, authToken);
    });
  });
});
*/
