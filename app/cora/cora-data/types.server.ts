export interface DataElement {
  name: string;
  repeatId?: string;
}

export interface Attributes {
  [key: string]: string;
}

export type CoraData = DataGroup | DataAtomic | RecordLink;

export interface DataGroup extends DataElement {
  children: CoraData[];
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

export interface Permissions {
  read?: string[];
  write?: string[];
}

export interface CoraRecord {
  data: DataGroup;
  permissions?: Permissions;
  actionLinks?: ActionLinks;
}

export interface AuthWrapper {
  authentication: CoraRecord;
}

export interface RecordWrapper {
  record: CoraRecord;
}

export interface DataList {
  fromNo: string;
  data: RecordWrapper[];
  totalNo: string;
  containDataOfType: string;
  toNo: string;
}

export interface DataListWrapper {
  dataList: DataList;
}
