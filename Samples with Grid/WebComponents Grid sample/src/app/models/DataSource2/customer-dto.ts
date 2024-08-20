import { AddressDto } from './address-dto';

export interface CustomerDto {
	customerId: string | null;
	companyName: string | null;
	contactName: string | null;
	contactTitle: string | null;
	address: AddressDto;
}
