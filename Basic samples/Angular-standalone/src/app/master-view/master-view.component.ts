import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxOverlayOutletDirective, IgxRippleDirective, IgxSnackbarComponent, IgxToggleActionDirective, IgxToggleDirective } from '@infragistics/igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDtoForm } from '../models/north-wind-api/customer-dto-forms';
import { CustomerDto } from '../models/north-wind-api/customer-dto';
import { NorthWindAPIService } from '../services/north-wind-api.service';

@Component({
  selector: 'app-master-view',
  standalone: true,
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, IgxSnackbarComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _customer?: CustomerDto;
  public get customer(): CustomerDto | undefined {
    return this._customer;
  }
  public set customer(value: CustomerDto | undefined) {
    this._customer = value;
    this.customerDtoFormModel.reset(value);
  }

  public customerDtoFormModel: FormGroup<CustomerDtoForm> = new FormGroup(new CustomerDtoForm);
  public customerDtoFormModel1: FormGroup<CustomerDtoForm> = new FormGroup(new CustomerDtoForm);
  @ViewChild('snackbarsuccess') snackbarsuccess!: any;
  @ViewChild('snackbarerror') snackbarerror!: any;
  @ViewChild('snackbarsuccess1') snackbarsuccess1!: any;
  @ViewChild('snackbarerror1') snackbarerror1!: any;

  constructor(
    private northWindAPIService: NorthWindAPIService,
  ) {}

  ngOnInit() {
    this.northWindAPIService.getCustomerDto('QUEEN').pipe(takeUntil(this.destroy$)).subscribe(
      data => this.customer = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onUpdateNgSubmit() {
    this.northWindAPIService.putCustomerDto(this.customerDtoFormModel.value).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data) {
          this.customer = data;
          this.snackbarsuccess.open();
        } else {
          this.snackbarerror.open();
        }
    });
  }

  public onResetForm(e: Event) {
    e.preventDefault();
    this.customerDtoFormModel.reset();
  }

  public onCreateNgSubmit() {
    this.northWindAPIService.postCustomerDto(this.customerDtoFormModel1.value).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data) {
          this.customerDtoFormModel1.reset();
          this.snackbarsuccess1.open();
        } else {
          this.snackbarerror1.open();
        }
    });
  }

  public onResetForm1(e: Event) {
    e.preventDefault();
    this.customerDtoFormModel1.reset();
  }
}
