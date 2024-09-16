import { html, css, LitElement } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { defineComponents, IgcButtonComponent, IgcComboComponent, IgcInputComponent, IgcRippleComponent, IgcSnackbarComponent } from 'igniteui-webcomponents';
import { formDataToObject } from '../utils/form-utils';
import { CustomerDto } from '../models/NorthwindAB/customer-dto';
import { northwindABService } from '../services/NorthwindAB-service';
import { ifDefined } from 'lit/directives/if-defined.js';

defineComponents(IgcInputComponent, IgcSnackbarComponent, IgcButtonComponent, IgcRippleComponent, IgcComboComponent);

@customElement('app-master-view')
export default class MasterView extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 2rem;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .row-layout {
      display: flex;
    }
    .group {
      justify-content: flex-end;
      align-items: flex-end;
      align-content: flex-start;
      gap: 16px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .button {
      --ig-size: var(--ig-size-medium);
      flex-shrink: 0;
    }
    .form {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 0.5rem;
      width: 300px;
      min-width: 300px;
      max-width: 300px;
      flex-shrink: 0;
    }
  `;

  constructor() {
    super();
    northwindABService.getCustomerDto('QUEEN').then(data => this.customer = data);
  }

  @state()
  private customer?: CustomerDto;

  @state()
  private addedCustomer?: CustomerDto;

  private submit(args: CustomEvent<any>) {
    args.preventDefault();
    const submitCustomerDto = formDataToObject(args.target as HTMLFormElement);
    northwindABService.putCustomerDto(submitCustomerDto).then(data => {
      console.log(data);
    });
  }

  private submit1(args: CustomEvent<any>) {
    args.preventDefault();
    const submitCustomerDto = formDataToObject(args.target as HTMLFormElement);
    northwindABService.postCustomerDto(submitCustomerDto).then(data => {
      console.log(data);
      this.addedCustomer = data;
    });
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <form @submit="${this.submit}" class="column-layout form">
        <p>Edit form pointing to existing variable with ${this.customer?.customerId ?? 'NONE'}</p>
        <igc-input value="${ifDefined(this.customer?.customerId)}" name="customerId" label="customerId" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.companyName)}" name="companyName" label="companyName" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.contactName)}" name="contactName" label="contactName" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.contactTitle)}" name="contactTitle" label="contactTitle" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.address.street)}" name="address.street" label="address.street" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.address.city)}" name="address.city" label="address.city" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.address.region)}" name="address.region" label="address.region" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.address.postalCode)}" name="address.postalCode" label="address.postalCode" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.address.country)}" name="address.country" label="address.country" ?outlined="${true}"></igc-input>
        <igc-input value="${ifDefined(this.customer?.address.phone)}" name="address.phone" label="address.phone" ?outlined="${true}"></igc-input>
        <div class="row-layout group">
          <igc-button variant="outlined" type="reset" class="button">
            Reset
            <igc-ripple></igc-ripple>
          </igc-button>
          <igc-button type="submit" class="button">
            Add
            <igc-ripple></igc-ripple>
          </igc-button>
        </div>
      </form>
      <form InitialValue="customer!" @submit="${this.submit1}" class="column-layout form">
        <p>Created customer has ID ${this.addedCustomer?.customerId ?? 'NONE'}</p>
        <p>Create form not related to any variable</p>
        <igc-input name="customerId" label="customerId" ?outlined="${true}"></igc-input>
        <igc-input name="companyName" label="companyName" ?outlined="${true}"></igc-input>
        <igc-input name="contactName" label="contactName" ?outlined="${true}"></igc-input>
        <igc-input name="contactTitle" label="contactTitle" ?outlined="${true}"></igc-input>
        <igc-input name="address.street" label="address.street" ?outlined="${true}"></igc-input>
        <igc-input name="address.city" label="address.city" ?outlined="${true}"></igc-input>
        <igc-input name="address.region" label="address.region" ?outlined="${true}"></igc-input>
        <igc-input name="address.postalCode" label="address.postalCode" ?outlined="${true}"></igc-input>
        <igc-input name="address.country" label="address.country" ?outlined="${true}"></igc-input>
        <igc-input name="address.phone" label="address.phone" ?outlined="${true}"></igc-input>
        <div class="row-layout group">
          <igc-button variant="outlined" type="reset" class="button">
            Reset
            <igc-ripple></igc-ripple>
          </igc-button>
          <igc-button type="submit" class="button">
            Add
            <igc-ripple></igc-ripple>
          </igc-button>
        </div>
      </form>
    `;
  }
}

