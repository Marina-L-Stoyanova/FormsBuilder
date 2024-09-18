import { FormControl } from '@angular/forms';

export interface AddressDtoForm {
  street: FormControl<string | undefined | null>;
  city: FormControl<string | undefined | null>;
  region: FormControl<string | undefined | null>;
  postalCode: FormControl<string | undefined | null>;
  country: FormControl<string | undefined | null>;
  phone: FormControl<string | undefined | null>;
}
