import { AddressType } from './address-type';

export interface CustomersType {
  customerID: string | null;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  address: AddressType;
}
