export interface AddressPayload {
  city: string | null;
  country: string | null;
}

export interface CustomerPayload {
  customerId: string | null;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  address: AddressPayload | null;
}
