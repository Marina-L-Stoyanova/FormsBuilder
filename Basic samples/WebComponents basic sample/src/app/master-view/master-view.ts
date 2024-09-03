import {  IgcInputComponent,  defineComponents } from "igniteui-webcomponents";
import { LitElement, css, html } from 'lit';
import { formDataToObject } from '../utils/form-utils';
import { customElement, eventOptions, query, state } from 'lit/decorators.js';
import { CustomerDto } from '../models/DataSource2/customer-dto';
import { dataSource2Service } from '../services/DataSource2-service';

defineComponents(IgcInputComponent);

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

  public dataSource2Customers: CustomerDto[] = [];

  private onAddNewSubmit(args: SubmitEvent ) {
    args.preventDefault();
  const formObject = formDataToObject(args.target as HTMLFormElement);
  dataSource2Service.addCustomer(formObject).then(data => {
      // TODO: handle here local data update if needed.
    });
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <form @submit="${this.onAddNewSubmit}" class="column-layout form" id="form">
          <igc-input class="form-input" id="customerId" name="customerId" label="Customer ID" placeholder="Customer ID">
          </igc-input>
          <igc-input class="form-input" name="companyName" label="Company name" placeholder="Company name" ></igc-input>
          <igc-input class="form-input" name="contactName" label="Contact name" placeholder="Contact name" ></igc-input>
          <igc-input class="form-input" name="contactTitle" label="Contact title" placeholder="Contact title" ></igc-input>
          <igc-button class="button">
          Submit
          <igc-ripple></igc-ripple>
        </igc-button>
        </form>        
    `;
  }
}
