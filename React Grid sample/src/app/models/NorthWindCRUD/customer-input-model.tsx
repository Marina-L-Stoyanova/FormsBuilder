import { AddressInputModel } from './address-input-model';

export interface CustomerInputModel {
	customerId: string | null;
	companyName: string | null;
	contactName: string | null;
	contactTitle: string | null;
	address: AddressInputModel;
}
