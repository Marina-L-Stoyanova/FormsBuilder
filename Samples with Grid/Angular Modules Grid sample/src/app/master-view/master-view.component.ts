import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGridRowEventArgs, IgxDialogComponent, IgxGridComponent } from '@infragistics/igniteui-angular';
import { NorthwindService } from '../services/northwind.service';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {
  @ViewChild('grid', { read: IgxGridComponent, static: true }) public grid: IgxGridComponent;
  @ViewChild('form', { read: IgxDialogComponent, static: true }) public dialog: IgxDialogComponent;
  public northwindCustomers: any[] = [];
  public customer: ReturnType<MasterViewComponent['createCustomerForm']>;
  public errorMessage: string = '';
  public dialogTitle: string = '';
  public confirmText: string = '';
  public confirmEvent: string = '';
  public isDeleteButtonHidden: boolean = false;
  private originalCustomer: any | null = null;

  constructor(private northwindService: NorthwindService) {
    this.customer = this.createCustomerForm();
  }

  ngOnInit() {
    this.fetchCustomers();
  }

  private createCustomerForm() {
    return new FormGroup({
      customerId: new FormControl<string | null>(null),
      companyName: new FormControl<string | null>(null, Validators.required),
      contactName: new FormControl<string | null>(null, Validators.pattern("^[a-zA-Z]+( [a-zA-Z]+)*$")),
      contactTitle: new FormControl<string | null>(null, Validators.required),
      address: new FormGroup({
        street: new FormControl<string | null>(null, Validators.required),
        city: new FormControl<string | null>(null, Validators.required),
        region: new FormControl<string | null>(null, Validators.required),
        postalCode: new FormControl<string | null>(null, Validators.required),
        country: new FormControl<string | null>(null, Validators.required),
        phone: new FormControl<string | null>(null, Validators.required)
      })
    });
  }

  private fetchCustomers(): void {
    this.northwindService.getCustomers().subscribe({
      next: (data) => this.northwindCustomers = data,
      error: () => this.northwindCustomers = []
    });
  }

  public handleRowSelection(event: IGridRowEventArgs): void {
    if (event.row.data) {
      this.originalCustomer = JSON.parse(JSON.stringify(event.row.data));
      this.customer.patchValue(event.row.data);
      this.dialogTitle = 'Edit customer';
      this.confirmText = 'Edit customer';
      this.confirmEvent = 'onEditCustomer';
      this.dialog.open();
    }
  }

  public resetCustomer(): void {
    if (this.originalCustomer) {
      this.customer.patchValue(this.originalCustomer);
      this.errorMessage = '';
    }
  }

  public resetHandler(): void {
    if (this.confirmText === 'Add customer') {
      this.resetForm();
    } else if (this.confirmText === 'Edit customer') {
      this.resetCustomer();
    }
  }

  public onFormOpen(): void {
    this.customer.reset();
    this.dialogTitle = 'Add new customer';
    this.confirmText = 'Add customer';
    this.confirmEvent = 'onAddNewCustomer';
    this.isDeleteButtonHidden = true;
    this.dialog.open();
  }

  private resetForm(): void {
    this.customer.reset();
    this.errorMessage = '';
  }

  private handleResponse(response: any): void {
    this.fetchCustomers(); // Update customer list
    this.resetForm();
    this.dialog.close();
  }

  private handleError(error: any): void {
    if (error.error) {
      this.errorMessage = Object.values(error.error).join('\n');
    } else {
      this.errorMessage = error.message || 'An error occurred.';
    }
  }

  public onEditCustomer(): void {
    if (this.customer.valid) {
      const updatedCustomer = this.customer.getRawValue();
      this.northwindService.updateCustomer(updatedCustomer).subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error)
      });
    } else {
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  public onAddNewCustomer(): void {
    if (this.customer.valid) {
      const newCustomer = this.customer.getRawValue();
      this.northwindService.addCustomer(newCustomer).subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error)
      });
    } else {
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  public onDelete(): void {
    const myCustomerId = this.customer.value.customerId;
    if (myCustomerId) {
      this.northwindService.deleteCustomer(myCustomerId).subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error)
      });
    } else {
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  public onConfirm(): void {
    if (this.confirmText === 'Add customer') {
      this.onAddNewCustomer();
    } else if (this.confirmText === 'Edit customer') {
      this.onEditCustomer();
    }
  }

  public onDialogClosed(): void {
    this.isDeleteButtonHidden = false;
  }
}
