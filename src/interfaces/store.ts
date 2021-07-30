export interface IStore {
  id: string;
  name: string;
  description?: string;
  address: string;
  createdAt: Date;
  modifiedAt: Date;
  storeSettings: IStoreSettings;
}

export interface IStoreSettings {
  taxCode: string;
  open: boolean;
}
