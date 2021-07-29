export interface Store {
  id: string;
  name: string;
  description?: string;
  address: string;
  createdAt: Date;
  modifiedAt: Date;
  storeSettings: StoreSettings;
}

export interface StoreSettings {
  taxCode: string;
  open: boolean;
}
