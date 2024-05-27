import 'igniteui-webcomponents-grids/grids/combined.js';
import { IgcButtonComponent, IgcCheckboxComponent, IgcComboComponent, IgcDialogComponent, IgcInputComponent, IgcMaskInputComponent, IgcSelectComponent, IgcSnackbarComponent, IgcTextareaComponent, defineComponents } from "igniteui-webcomponents";
import { IgcGridComponent, IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, eventOptions, query, state } from 'lit/decorators.js';
import { CustomerDto } from '../models/DataSource2/customer-dto';
import { dataSource2Service } from '../services/DataSource2-service';

defineComponents(IgcInputComponent, IgcSelectComponent, IgcComboComponent, IgcSnackbarComponent, IgcTextareaComponent, IgcCheckboxComponent, IgcMaskInputComponent, IgcButtonComponent, IgcDialogComponent);

@customElement('app-master-view')
export default class MasterView extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      padding: 16px;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .grid {
      min-width: 600px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
  `;

  @query('#grid')
  private grid!: IgcGridComponent;

  @query("form")
  public form!: HTMLFormElement;

  @query("#dialog")
  public dialog!: IgcDialogComponent;

  @eventOptions({capture: true})
  invalidHandler() {
    this.requestUpdate();
  }

  public dataSource2Customers: CustomerDto[] = [];
  public errorMessage:string = "";

  @state()
  public confirmText: string = '';

  @state()
  public arguments: IgcRowSelectionEventArgs | undefined;

  private fetchCustomers(): void {
    dataSource2Service.getCustomerDtoList().then((data) => {
      this.northwindDS = data;
      this.grid.data = data;
    }, err => console.log(err));
  }

  private handleResponse(response: any): void {
    console.log('Operation successful:', response);
    this.fetchCustomers(); // Update customer list
    //this.resetForm();
    this.dialog.hide();
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
    const myCompanyName = (this.form?.elements.namedItem("companyName") as IgcInputComponent).value;
    const myCustomerId = (this.form?.elements.namedItem("customerId") as IgcInputComponent).value;
    const myContactName = (this.form?.elements.namedItem("contactName") as IgcInputComponent).value;
    const myContactTitle = (this.form?.elements.namedItem("contactTitle") as IgcInputComponent).value;

    if (myContactName !== undefined && myContactName !== null && myCompanyName !== undefined && myContactTitle !== undefined &&
      myCustomerId !== undefined) {
      const updatedCustomer = {
        customerId: myCustomerId,
        companyName: myCompanyName,
        contactName: myContactName,
        contactTitle: myContactTitle,
        address: {
          city: '',
          country: '',
          street: '',
          region: '',
          postalCode: '',
          phone: ''
        }
      };

      dataSource2Service.updateCustomer(updatedCustomer).then(
        (response) => this.handleResponse(response),
        (error) => this.handleError(error)
      );
    }
    else {
      // Handle invalid form state
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  onAddNewCustomer(): void {
    const myCompanyName = (this.form?.elements.namedItem("companyName") as IgcInputComponent).value;
    const myCustomerId = (this.form?.elements.namedItem("customerId") as IgcInputComponent).value;
    const myContactName = (this.form?.elements.namedItem("contactName") as IgcInputComponent).value;
    const myContactTitle = (this.form?.elements.namedItem("contactTitle") as IgcInputComponent).value;

    if (myContactName !== undefined && myContactName !== null && myCompanyName !== undefined && myContactTitle !== undefined &&
      myCustomerId !== undefined) {
      const updatedCustomer = {
        customerId: myCustomerId,
        companyName: myCompanyName,
        contactName: myContactName,
        contactTitle: myContactTitle,
        address: {
          city: '',
          country: '',
          street: '',
          region: '',
          postalCode: '',
          phone: ''
        }
      };

      dataSource2Service.addCustomer(updatedCustomer).then(
        (response) => this.handleResponse(response),
        (error) => this.handleError(error)
      );
    }
    else {
      // Handle invalid form state
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }

  public resetCustomer(){
    const customer = this.arguments as any;
    const oldCustomer = customer.detail.newSelection[0];
    const companyName = oldCustomer.companyName;
    const customerId = oldCustomer.customerId;
    const contactName = oldCustomer.contactName;
    const contactTitle = oldCustomer.contactTitle;

    (this.form?.elements.namedItem("companyName") as IgcInputComponent).value = companyName;
    (this.form?.elements.namedItem("customerId") as IgcInputComponent).value = customerId;
    (this.form?.elements.namedItem("contactName") as IgcInputComponent).value = contactName;
    (this.form?.elements.namedItem("contactTitle") as IgcInputComponent).value = contactTitle;

  }

  public resetHandler(){
    if (this.confirmText === 'Add customer') {
      this.resetForm();
    } else if (this.confirmText === 'Edit customer') {
      this.resetCustomer();
    }
  }

  handleRowSelection(args: IgcRowSelectionEventArgs) {
    this.confirmText = "Edit customer";
    this.dialog.show();

    const detailedArgs = args as any; // Using 'any' to bypass the type check
    this.arguments = detailedArgs;

    const selectedRow = detailedArgs.detail.newSelection[0];
    const companyName = selectedRow.companyName;
    const customerId = selectedRow.customerId;
    const contactName = selectedRow.contactName;
    const contactTitle = selectedRow.contactTitle;

    (this.form?.elements.namedItem("companyName") as IgcInputComponent).value = companyName;
    (this.form?.elements.namedItem("customerId") as IgcInputComponent).value = customerId;
    (this.form?.elements.namedItem("contactName") as IgcInputComponent).value = contactName;
    (this.form?.elements.namedItem("contactTitle") as IgcInputComponent).value = contactTitle;

    console.log('Selected row:', selectedRow);
}

  public onAddFormOpen(){
    this.resetForm();
    this.confirmText = "Add customer";
    this.dialog.show();
  }

  public onConfirm(): void{

    if(this.confirmText === 'Add customer') {
      this.onAddNewCustomer();
    }
    else if(this.confirmText === 'Edit customer') {
      this.onEditCustomer();
    }
  }

  onSubmit() {
    for (const [name, value] of new FormData(this.form).entries()) {
        console.log(`${name}: ${value}`);
    }
  }

  private resetForm(): void {
    this.form.reset();
  }

  public closeDialog(){
    this.dialog.hide();
  }

  constructor() {
    super();
    dataSource2Service.getCustomerDtoList().then((data) => {
      this.northwindDS = data;
      this.grid.data = data;
    }, err => console.log(err));
  }

  @state()
  private northwindDS: CustomerDto[] = [];

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/igniteui-webcomponents-grids/grids/themes/light/material.css'>

        <igc-grid id="grid" primary-key="customerId" display-density="cosy" row-selection="single" auto-generate="false" class="ig-typography ig-scrollbar grid" @rowSelectionChanging="${this.handleRowSelection}">
          <igc-column field="customerId" data-type="string" header="customerId" filterable="false" selectable="false"></igc-column>
          <igc-column field="companyName" data-type="string" header="companyName" filterable="false" selectable="false"></igc-column>
          <igc-column field="contactName" data-type="string" header="contactName" filterable="false" selectable="false"></igc-column>
          <igc-column field="contactTitle" data-type="string" header="contactTitle" filterable="false" selectable="false"></igc-column>
          <igc-column field="address.city" data-type="string" header="address city" filterable="false" selectable="false"></igc-column>
          <igc-column field="address.country" data-type="string" header="address country" filterable="false" selectable="false"></igc-column>
        </igc-grid>

      <igc-dialog id="dialog" closeOnOutsideClick="true">
        <form id="form" @invalid="${this.invalidHandler}" method="dialog">
          <igc-input class="form-input" id="customerId" name="customerId" label="Customer ID" placeholder="Customer ID">
              <span slot="helper-text" class="helper-text"></span>
          </igc-input>
          <igc-input class="form-input" name="companyName" label="Company name" placeholder="Company name" minLength="3" required>
            ${(this.form?.elements.namedItem("companyName") as IgcInputComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required</span>` : nothing}
            ${(this.form?.elements.namedItem("companyName") as IgcInputComponent)?.validity.tooShort ? html `<span slot="helper-text" class="helper-text">Company name is too short!</span>` : nothing}
          </igc-input>
          <igc-input class="form-input" name="contactName" label="Contact name" placeholder="Contact name" minLength="3" required>
            ${(this.form?.elements.namedItem("contactName") as IgcInputComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required</span>` : nothing}
            ${(this.form?.elements.namedItem("contactName") as IgcInputComponent)?.validity.tooShort ? html `<span slot="helper-text" class="helper-text">Contact name is too short!</span>` : nothing}
          </igc-input>
          <igc-input class="form-input" name="contactTitle" label="Contact title" placeholder="Contact title" required>
            ${(this.form?.elements.namedItem("contactTitle") as IgcInputComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required</span>` : nothing}
          </igc-input>
        </form>
        <igc-dialog-actions>
          <igc-button @click="${this.closeDialog}">CANCEL</igc-button>
          <igc-button @click="${this.resetHandler}">Reset form</igc-button>
          <igc-button @click="${this.onConfirm}">${this.confirmText}</igc-button>
        </igc-dialog-actions>
      </igc-dialog>
      <igc-button @click="${this.onAddFormOpen}">Add new customer</igc-button>
    `;
  }
}
