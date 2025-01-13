export abstract class DataElement {
  name: string;

  repeatId?: string;
}

export type Attributes = {
  [key: string]: string;
};

export interface DataGroup extends DataElement {
  children: (DataAtomic | DataGroup | RecordLink)[];
  attributes?: Attributes;
}

export interface DataAtomic extends DataElement {
  value: string;
  attributes?: Attributes;
}

export interface RecordLink extends DataElement {
  actionLinks?: ActionLinks;
  children: DataAtomic[];
  attributes?: Attributes;
}

export interface ActionLink {
  requestMethod: string;
  rel: string;
  url: string;
  accept?: string;
  contentType?: string;
  body?: DataGroup;
}

export interface ActionLinks {
  read?: ActionLink;
  update?: ActionLink;
  index?: ActionLink;
  delete?: ActionLink;
  renew?: ActionLink;
}

type Permissions = {
  read?: string[];
  write?: string[];
};

type CoraRecord = {
  data: DataGroup;
  permissions?: Permissions;
  actionLinks?: ActionLinks;
};

type RecordWrapper = {
  record: CoraRecord;
};

type DataList = {
  fromNo: string;
  data: RecordWrapper[];
  totalNo: string;
  containDataOfType: string;
  toNo: string;
};

export type DataListWrapper = {
  dataList: DataList;
};
