import { FormControl, FormGroup } from '@angular/forms';
import { AddressDtoForm } from './address-dto-forms';

export class CustomerDtoForm {
  customerId: FormControl<string | null> = new FormControl;
  companyName: FormControl<string | null> = new FormControl;
  contactName: FormControl<string | null> = new FormControl;
  contactTitle: FormControl<string | null> = new FormControl;
  address: FormGroup<AddressDtoForm> = new FormGroup(new AddressDtoForm);
}
