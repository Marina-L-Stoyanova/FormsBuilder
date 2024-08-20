import 'igniteui-webcomponents-grids/grids/combined.js';
import { IgcButtonComponent, IgcCheckboxComponent, IgcComboComponent, IgcDialogComponent, IgcInputComponent, IgcMaskInputComponent, IgcSelectComponent, IgcSnackbarComponent, IgcTextareaComponent, defineComponents } from "igniteui-webcomponents";
import { IgcGridComponent, IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';
import { LitElement, PropertyValues, css, html, nothing } from 'lit';
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

  @query("form")
  public form!: HTMLFormElement;

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

      dataSource2Service.addCustomer(updatedCustomer);
     /*  .then(
        (response) => this.handleResponse(response),
        (error) => this.handleError(error)
      ); */
    }
    else {
      // Handle invalid form state
      this.errorMessage = 'Please provide valid data for all fields.';
    }
  }


  constructor() {
    super();
  }


  firstUpdated() {
    (this.form?.elements.namedItem("companyName") as IgcInputComponent).value = "";
    (this.form?.elements.namedItem("customerId") as IgcInputComponent).value = "";
    (this.form?.elements.namedItem("contactName") as IgcInputComponent).value = "";
    (this.form?.elements.namedItem("contactTitle") as IgcInputComponent).value = "";
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/igniteui-webcomponents-grids/grids/themes/light/material.css'>

        <form id="form">
          <igc-input class="form-input" id="customerId" name="customerId" label="Customer ID" placeholder="Customer ID">
          </igc-input>
          <igc-input class="form-input" name="companyName" label="Company name" placeholder="Company name" ></igc-input>
          <igc-input class="form-input" name="contactName" label="Contact name" placeholder="Contact name" ></igc-input>
          <igc-input class="form-input" name="contactTitle" label="Contact title" placeholder="Contact title" ></igc-input>
        </form>        
        <igc-button slot="footer" @click="${this.onAddNewCustomer}">${this.confirmText}</igc-button>  
    `;
  }
}
