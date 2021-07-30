export interface Sale {
  id?: string;
  employeeId?: string;
  customerId?: string;
  storeId?: string;
  timeStamp?: Date;
  note?: string;
  amount: number;
}
