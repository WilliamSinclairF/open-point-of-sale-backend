export interface ISale {
  id?: number;
  employeeId?: string;
  customerId?: string;
  storeId?: string;
  timeStamp?: Date;
  note?: string;
  amount: number;
}
