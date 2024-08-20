import { FormControl, FormGroup } from '@angular/forms';
import { AddressForm } from './address-form';

export interface CustomersForm {
  customerId: FormControl<string | null>,
  companyName: FormControl<string | null>,
  contactName: FormControl<string | null>,
  contactTitle: FormControl<string | null>,
  address: FormGroup<AddressForm>
}
