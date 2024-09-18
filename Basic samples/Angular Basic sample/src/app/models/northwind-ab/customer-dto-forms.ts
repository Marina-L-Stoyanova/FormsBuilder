import { FormControl, FormGroup } from '@angular/forms';
import { AddressDtoForm } from './address-dto-forms';

export interface CustomerDtoForm {
  customerId: FormControl<string | undefined | null>;
  companyName: FormControl<string | undefined | null>;
  contactName: FormControl<string | undefined | null>;
  contactTitle: FormControl<string | undefined | null>;
  address: FormGroup<AddressDtoForm>;
}
