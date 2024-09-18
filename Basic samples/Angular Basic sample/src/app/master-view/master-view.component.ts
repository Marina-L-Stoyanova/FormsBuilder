import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxOverlayOutletDirective, IgxRippleDirective, IgxSnackbarComponent, IgxToggleActionDirective, IgxToggleDirective } from '@infragistics/igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDtoForm } from '../models/northwind-ab/customer-dto-forms';
import { CustomerDto } from '../models/northwind-ab/customer-dto';
import { NorthwindABService } from '../services/northwind-ab.service';

@Component({
  selector: 'app-master-view',
  standalone: true,
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxSnackbarComponent, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, ReactiveFormsModule, FormsModule],
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public customer?: CustomerDto;
  public customerDtoFormModel: FormGroup<CustomerDtoForm>;
  public customerDtoFormModel1: FormGroup<CustomerDtoForm>;

  @ViewChild('snackbar') snackbar!: IgxSnackbarComponent;
  @ViewChild('snackbar1') snackbar1!: IgxSnackbarComponent;

  @ViewChild('snackbar2') snackbar2: any;
  @ViewChild('snackbar3') snackbar3: any;

  constructor(
    private northwindABService: NorthwindABService,
  ) {
    this.customerDtoFormModel1 = this.createCustomerDtoFormGroup();
    this.customerDtoFormModel = this.createCustomerDtoFormGroup();
  }

  ngOnInit() {
    this.northwindABService.getCustomerDto('QUEEN').pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.customer = data;
        this.customerDtoFormModel = this.createCustomerDtoFormGroupWithData(this.customer);
      }
    );
  }

  private createCustomerDtoFormGroup(): FormGroup<CustomerDtoForm> {
    return new FormGroup({
      address: new FormGroup({
        phone: new FormControl<string | undefined>(undefined),
        country: new FormControl<string | undefined>(undefined),
        postalCode: new FormControl<string | undefined>(undefined),
        region: new FormControl<string | undefined>(undefined),
        city: new FormControl<string | undefined>(undefined),
        street: new FormControl<string | undefined>(undefined),
      }),
      contactTitle: new FormControl<string | undefined>(undefined),
      contactName: new FormControl<string | undefined>(undefined),
      companyName: new FormControl<string | undefined>(undefined),
      customerId: new FormControl<string | undefined>(undefined),
    });
  }

  private createCustomerDtoFormGroupWithData(data: CustomerDto | undefined): FormGroup<CustomerDtoForm> {
    return new FormGroup({
      address: new FormGroup({
        phone: new FormControl<string | null | undefined>(data?.address.phone, { nonNullable: true }),
        country: new FormControl<string | null | undefined>(data?.address.country, { nonNullable: true }),
        postalCode: new FormControl<string | null | undefined>(data?.address.postalCode, { nonNullable: true }),
        region: new FormControl<string | null | undefined>(data?.address.region, { nonNullable: true }),
        city: new FormControl<string | null | undefined>(data?.address.city, { nonNullable: true }),
        street: new FormControl<string | null | undefined>(data?.address.street, { nonNullable: true }),
      }),
      contactTitle: new FormControl<string | null | undefined>(data?.contactTitle, { nonNullable: true }),
      contactName: new FormControl<string | null | undefined>(data?.contactName, { nonNullable: true }),
      companyName: new FormControl<string | null | undefined>(data?.companyName, { nonNullable: true }),
      customerId: new FormControl<string | null | undefined>(data?.customerId, { nonNullable: true }),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onResetForm(e: Event, form: FormGroupDirective){
    e.preventDefault();
    form.reset();
  }

  public onUpdateNgSubmit() {
    this.northwindABService.putCustomerDto(this.customerDtoFormModel.value).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data) {
          this.customer = data;
          this.customerDtoFormModel = this.createCustomerDtoFormGroupWithData(this.customer);
          this.snackbar.open();
        } else {
          this.snackbar1.open();
        }
      }
    );
  }

  public onAddNewNgSubmit() {
    this.northwindABService.postCustomerDto(this.customerDtoFormModel1.value).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data){
          this.customerDtoFormModel1 = this.createCustomerDtoFormGroup();
          this.snackbar2.open();
        } else {
          this.snackbar3.open();
        }
      }
    );
  }
}
