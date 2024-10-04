import { FormControl } from '@angular/forms';

export class AddressDtoForm {
  street: FormControl<string | null> = new FormControl;
  city: FormControl<string | null> = new FormControl;
  region: FormControl<string | null> = new FormControl;
  postalCode: FormControl<string | null> = new FormControl;
  country: FormControl<string | null> = new FormControl;
  phone: FormControl<string | null> = new FormControl;
}
