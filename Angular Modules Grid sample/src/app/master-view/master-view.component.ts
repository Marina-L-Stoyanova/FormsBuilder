import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGridRowEventArgs, IgxDialogComponent, IgxGridComponent } from '@infragistics/igniteui-angular';
import { CustomersType } from '../models/northwind/customers-type';
import { Address, Customer } from '../models/northwind/northwind-forms/northwind-forms';
import { NorthwindService } from '../services/northwind.service';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {
  @ViewChild('grid', { read: IgxGridComponent, static: true }) public grid: IgxGridComponent;
  @ViewChild('form', { read: IgxDialogComponent, static: true }) public dialog: IgxDialogComponent;
  public northwindCustomers: CustomersType[] = [];
  public customer!: FormGroup<Customer>;
  public errorMessage: string = '';
  public dialogTitle: string = '';
  public confirmText: string = '';
  public confirmEvent: string = '';
  public isDeleteButtonHidden: boolean = false;

  constructor(private northwindService: NorthwindService) {
    this.customer = new FormGroup<Customer>({
      customerId: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.pattern("^[a-zA-Z]+( [a-zA-Z]+)*$")),
      contactTitle: new FormControl('', Validators.required),
      address: new FormGroup<Address>({
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required)
      }),
    })
  }

  ngOnInit() {
    this.northwindService.getCustomers().subscribe({
      next: (data) => this.northwindCustomers = data,
      error: (_err: any) => this.northwindCustomers = []
    });
  }

  public handleRowSelection(event: IGridRowEventArgs) {
    if (event.row.data) {
      this.customer.patchValue(event.row.data);
      this.dialogTitle = 'Edit customer';
      this.confirmText = 'Edit customer';
      this.confirmEvent = "onSubmit()";
      this.dialog.open();
    }
  }

  public onFormOpen() {
    this.customer.reset();
    this.dialogTitle = 'Add new customer';
    this.confirmText = 'Add customer';
    this.confirmEvent = "onAddNewCustomer()";
    this.isDeleteButtonHidden = true;
    this.dialog.open();
  }

  private fetchCustomers(): void {
    this.northwindService.getCustomers().subscribe({
      next: (data) => this.northwindCustomers = data,
      error: (_err: any) => this.northwindCustomers = []
    });
  }

  private resetForm(): void {
    this.customer.reset();
    this.errorMessage = '';
  }

  private handleResponse(response: any): void {
    console.log('Operation successful:', response);
    this.fetchCustomers(); // Update customer list
    this.resetForm();
    this.dialog.close();
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    if (error.error) {
      this.errorMessage = Object.values(error.error).join('\n');
    } else {
      this.errorMessage = error.message || 'An error occurred.';
    }
  }

  onEditCustomer(): void {
    if (this.customer.valid) {
      const myCustomerId = this.customer.value.customerId;
      const myCompanyName = this.customer.value.companyName;
      const myEditedContactName = this.customer.value.contactName;
      const myContactTitle = this.customer.value.contactTitle;
      const myAddressCity = this.customer.value.address?.city;
      const myAddressCountry = this.customer.value.address?.country;

      if (myEditedContactName !== undefined && myEditedContactName !== null && myCompanyName !== undefined && myContactTitle !== undefined &&
        myAddressCity !== undefined && myAddressCountry !== undefined && myCustomerId !== undefined) {
        const updatedCustomer: CustomersType = {
          customerID: myCustomerId,
          companyName: myCompanyName,
          contactName: myEditedContactName,
          contactTitle: myContactTitle,
          address: {
            city: myAddressCity,
            country: myAddressCountry,
            street: '',
            region: '',
            postalCode: '',
            phone: ''
          }
        };

        this.northwindService.updateCustomer(updatedCustomer).subscribe({
          next: (response) => this.handleResponse(response),
          error: (error) => this.handleError(error)
        });
      }
    } else {
      // Handle invalid form state
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  onAddNewCustomer(): void {
    if (this.customer.valid) {
      const myCustomerId = this.customer.value.customerId;
      const myCompanyName = this.customer.value.companyName;
      const myEditedContactName = this.customer.value.contactName;
      const myContactTitle = this.customer.value.contactTitle;
      const myAddressCity = this.customer.value.address?.city;
      const myAddressCountry = this.customer.value.address?.country;

      if (myEditedContactName !== undefined && myEditedContactName !== null && myCompanyName !== undefined && myContactTitle !== undefined &&
        myAddressCity !== undefined && myAddressCountry !== undefined && myCustomerId !== undefined) {
        const newCustomer: CustomersType = {
          customerID: myCustomerId,
          companyName: myCompanyName,
          contactName: myEditedContactName,
          contactTitle: myContactTitle,
          address: {
            city: myAddressCity,
            country: myAddressCountry,
            street: '',
            region: '',
            postalCode: '',
            phone: ''
          }
        };

        this.northwindService.addCustomer(newCustomer).subscribe({
          next: (response) => this.handleResponse(response),
          error: (error) => this.handleError(error)
        });
      }
    } else {
      // Handle invalid form state
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  onDelete(): void {
    if (this.customer.valid) {
      const myCustomerId = this.customer.value.customerId;

      if (myCustomerId !== null && myCustomerId !== undefined) {
        this.northwindService.deleteCustomer(myCustomerId).subscribe({
          next: (response) => this.handleResponse(response),
          error: (error) => this.handleError(error)
        });
      }
    } else {
      // Handle invalid form state
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  onConfirm(): void {
    if (this.confirmText === 'Add customer') {
      this.onAddNewCustomer();
    } else if (this.confirmText === 'Edit customer') {
      this.onEditCustomer();
    }
  }

  onDialogClosed(): void {
    this.isDeleteButtonHidden = false;
  }
}
