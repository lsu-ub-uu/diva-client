import {
  DataListWrapper,
  RecordWrapper,
} from '../../../utils/cora-data/CoraData';
import httpClient from '../../../utils/http/HttpClient';
import { IHttpClientRequestParameters } from '../../../utils/http/IHttpClient';
import convertToObjectWithRecordType from '../../../utils/converter/RecordTypeConverter';
import { RecordType } from '../../../types/Record';
import extractListFromDataList from './api/DataListHandler';
import { List } from '../../../types/List';

export function getRecordById<T>(
  recordType: RecordType,
  id: string,
  authToken?: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (id === '') {
      reject(
        new Error(
          `getRecordById was called with recordType ${recordType} but no id.`,
        ),
      );
    } else {
      // const urlForRecord = `${process.env.REST_API_BASE_URL}record/${recordType}/${id}`;
      const urlForRecord = `https://cora.test.diva-portal.org/diva/rest/record/${recordType}/${id}`;

      const parameters: IHttpClientRequestParameters = {
        url: urlForRecord,
        authToken,
      };
      httpClient
        .get<RecordWrapper>(parameters)
        .then((recordWrapper) => {
          const obj = convertToObjectWithRecordType<T>(
            recordWrapper.record.data,
            recordType,
          );
          resolve(obj);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

export function getRecords(
  recordType: RecordType,
  authToken?: string,
): Promise<List> {
  return new Promise((resolve, reject) => {
    // const urlForRecord = `${process.env.REST_API_BASE_URL}record/${recordType}/`;
    const urlForRecord = `https://cora.test.diva-portal.org/diva/rest/record/${recordType}/`;

    const parameters: IHttpClientRequestParameters = {
      url: urlForRecord,
      authToken,
    };

    httpClient
      .get<DataListWrapper>(parameters)
      .then((dataListWrapper) => {
        const list = extractListFromDataList(dataListWrapper, recordType);
        resolve(list);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// export { default as SearchPersonsByGeneralSearch2 } from './api/SearchPersonByGeneralSearch2';
export * from './api/searchPersonByGeneralSearch';
export * from './api/searchOrganisation';
