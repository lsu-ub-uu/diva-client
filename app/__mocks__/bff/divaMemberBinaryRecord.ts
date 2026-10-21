const divaMemberBinaryRecord = (id: string) => {
  return {
    record: {
      data: {
        children: [
          {
            children: [
              {
                children: [
                  { name: 'linkedRecordType', value: 'system' },
                  { name: 'linkedRecordId', value: 'divaPreview' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'http://testUrl.com/diva/rest/record/system/divaPreview',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'dataDivider',
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'validationType' },
                  { name: 'linkedRecordId', value: 'genericBinary' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'http://testUrl.com/diva/rest/record/validationType/genericBinary',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'validationType',
              },
              { name: 'visibility', value: 'unpublished' },
              {
                children: [
                  { name: 'linkedRecordType', value: 'diva-member' },
                  { name: 'linkedRecordId', value: 'nordiskamuseet' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'http://testUrl.com/diva/rest/record/diva-member/nordiskamuseet',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'hostRecord',
              },
              { name: 'id', value: id },
              {
                children: [
                  { name: 'linkedRecordType', value: 'recordType' },
                  { name: 'linkedRecordId', value: 'binary' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'http://testUrl.com/diva/rest/record/recordType/binary',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'type',
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'user' },
                  { name: 'linkedRecordId', value: '161616' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'http://testUrl.com/diva/rest/record/user/161616',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'createdBy',
              },
              { name: 'tsCreated', value: '2026-10-20T12:01:48.835021Z' },
              {
                repeatId: '0',
                children: [
                  { name: 'tsUpdated', value: '2026-10-20T12:01:56.653329Z' },
                  {
                    children: [
                      { name: 'linkedRecordType', value: 'user' },
                      { name: 'linkedRecordId', value: 'binaryConverter' },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'http://testUrl.com/diva/rest/record/user/binaryConverter',
                        accept: 'application/vnd.cora.record+json',
                      },
                    },
                    name: 'updatedBy',
                  },
                ],
                name: 'updated',
              },
              { name: 'tsVisibility', value: '2026-10-20T12:01:48.833418Z' },
            ],
            name: 'recordInfo',
          },
          {
            children: [
              {
                name: 'resourceId',
                value: `${id}-master`,
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'binary' },
                  {
                    name: 'linkedRecordId',
                    value: id,
                  },
                  { name: 'mimeType', value: 'image/png' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: `http://testUrl.com/diva/rest/record/binary/${id}/master`,
                    accept: 'image/png',
                  },
                },
                name: 'master',
              },
              { name: 'fileSize', value: '141694' },
              { name: 'mimeType', value: 'image/png' },
              {
                name: 'checksum',
                value:
                  'b745b6db8e37e3add07dcc4356ad3a0816533939148d462a18bf77cdaab25325cdb94aed53ee2f0c1728d92c4ee86ac25aa8449a958cbcae2d196bd747776496',
              },
              { name: 'checksumType', value: 'SHA-512' },
              { name: 'originalFileName', value: 'nm-sv.png' },
              { name: 'height', value: '1530' },
              { name: 'width', value: '1920' },
              {
                name: 'resolution',
                value: '28.350000000000001421x28.350000000000001421',
              },
            ],
            name: 'master',
          },
          {
            children: [
              {
                name: 'resourceId',
                value: `/tmp/sharedFileStorage/diva/streams/divaPreview/29d/999/c4b/29d999c4b584d286d0ac03ee3842eeb197c08b7e04a0c81996f75e6c30fe792e/binary:${id}-large`,
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'binary' },
                  {
                    name: 'linkedRecordId',
                    value: id,
                  },
                  { name: 'mimeType', value: 'image/jpeg' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: `http://testUrl.com/diva/rest/record/binary/${id}/large`,
                    accept: 'image/jpeg',
                  },
                },
                name: 'large',
              },
              { name: 'fileSize', value: '64665' },
              { name: 'mimeType', value: 'image/jpeg' },
              { name: 'height', value: '478' },
              { name: 'width', value: '600' },
            ],
            name: 'large',
          },
          {
            children: [
              {
                name: 'resourceId',
                value: `/tmp/sharedFileStorage/diva/streams/divaPreview/29d/999/c4b/29d999c4b584d286d0ac03ee3842eeb197c08b7e04a0c81996f75e6c30fe792e/binary:${id}-medium`,
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'binary' },
                  {
                    name: 'linkedRecordId',
                    value: id,
                  },
                  { name: 'mimeType', value: 'image/jpeg' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: `http://testUrl.com/diva/rest/record/binary/${id}/medium`,
                    accept: 'image/jpeg',
                  },
                },
                name: 'medium',
              },
              { name: 'fileSize', value: '28051' },
              { name: 'mimeType', value: 'image/jpeg' },
              { name: 'height', value: '239' },
              { name: 'width', value: '300' },
            ],
            name: 'medium',
          },
          {
            children: [
              {
                name: 'resourceId',
                value: `/tmp/sharedFileStorage/diva/streams/divaPreview/29d/999/c4b/29d999c4b584d286d0ac03ee3842eeb197c08b7e04a0c81996f75e6c30fe792e/binary:${id}-thumbnail`,
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'binary' },
                  {
                    name: 'linkedRecordId',
                    value: id,
                  },
                  { name: 'mimeType', value: 'image/jpeg' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: `http://testUrl.com/diva/rest/record/binary/${id}/thumbnail`,
                    accept: 'image/jpeg',
                  },
                },
                name: 'thumbnail',
              },
              { name: 'fileSize', value: '6315' },
              { name: 'mimeType', value: 'image/jpeg' },
              { name: 'height', value: '80' },
              { name: 'width', value: '100' },
            ],
            name: 'thumbnail',
          },
          {
            children: [
              {
                name: 'resourceId',
                value: `/tmp/sharedFileStorage/diva/streams/divaPreview/29d/999/c4b/29d999c4b584d286d0ac03ee3842eeb197c08b7e04a0c81996f75e6c30fe792e/binary:${id}-jp2`,
              },
              {
                children: [
                  { name: 'linkedRecordType', value: 'binary' },
                  {
                    name: 'linkedRecordId',
                    value: id,
                  },
                  { name: 'mimeType', value: 'image/jp2' },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: `http://testUrl.com/diva/rest/record/binary/${id}/jp2`,
                    accept: 'image/jp2',
                  },
                },
                name: 'jp2',
              },
              { name: 'fileSize', value: '355815' },
              { name: 'mimeType', value: 'image/jp2' },
              { name: 'height', value: '1530' },
              { name: 'width', value: '1920' },
            ],
            name: 'jp2',
          },
        ],
        name: 'binary',
        attributes: { type: 'image' },
      },
      permissions: {
        read: [
          'originalFileName',
          'resourceId',
          'thumbnail',
          'large',
          'checksum',
          'checksumType',
          'medium',
          'resourceInfo',
          'jp2',
          'master',
        ],
        write: [
          'originalFileName',
          'resourceId',
          'thumbnail',
          'large',
          'checksum',
          'checksumType',
          'medium',
          'resourceInfo',
          'jp2',
          'master',
        ],
      },
      actionLinks: {
        read: {
          requestMethod: 'GET',
          rel: 'read',
          url: `http://testUrl.com/diva/rest/record/binary/${id}`,
          accept: 'application/vnd.cora.record+json',
        },
        upload: {
          requestMethod: 'POST',
          rel: 'upload',
          contentType: 'multipart/form-data',
          url: `http://testUrl.com/diva/rest/record/binary/${id}/master`,
        },
        read_incoming_links: {
          requestMethod: 'GET',
          rel: 'read_incoming_links',
          url: `http://testUrl.com/diva/rest/record/binary/${id}/incomingLinks`,
          accept: 'application/vnd.cora.recordList+json',
        },
        update: {
          requestMethod: 'POST',
          rel: 'update',
          contentType: 'application/vnd.cora.recordgroup+json',
          url: `http://testUrl.com/diva/rest/record/binary/${id}`,
          accept: 'application/vnd.cora.record+json',
        },
        index: {
          requestMethod: 'POST',
          rel: 'index',
          body: {
            children: [
              {
                children: [
                  { name: 'linkedRecordType', value: 'recordType' },
                  { name: 'linkedRecordId', value: 'binary' },
                ],
                name: 'recordType',
              },
              { name: 'recordId', value: id },
              { name: 'type', value: 'index' },
            ],
            name: 'workOrder',
          },
          contentType: 'application/vnd.cora.recordgroup+json',
          url: 'http://testUrl.com/diva/rest/record/workOrder/',
          accept: 'application/vnd.cora.record+json',
        },
      },
      otherProtocols: {
        iiif: {
          server: 'http://testUrl.com/diva/iiif/',
          identifier: id,
        },
      },
    },
  };
};

export default divaMemberBinaryRecord;
