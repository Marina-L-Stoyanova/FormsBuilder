import { FormControl, FormGroup } from '@angular/forms';
import { AddressType } from './address-type';

export type FormType<Type> = {
  [Property in keyof Type] :
    Type[Property] extends Record<any, any>
      ? FormGroup<FormType<Type[Property]>>
      : FormControl<Type[Property]>;
};

export interface CustomersType {
  customerID: string | null;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  address: AddressType;
}

export type CustomersForm = FormType<CustomersType>;
export type AddressForm = FormType<AddressType>;
