import 'igniteui-webcomponents-grids/grids/combined.js';
import { IgcButtonComponent, IgcCheckboxComponent, IgcComboComponent, IgcInputComponent, IgcMaskInputComponent, IgcSelectComponent, IgcSnackbarComponent, IgcTextareaComponent, defineComponents } from "igniteui-webcomponents";
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, eventOptions, query, state } from 'lit/decorators.js';
import { CustomerDto } from '../models/DataSource2/customer-dto';
import { dataSource2Service } from '../services/DataSource2-service';

defineComponents(IgcInputComponent, IgcSelectComponent, IgcComboComponent, IgcSnackbarComponent, IgcTextareaComponent, IgcCheckboxComponent, IgcMaskInputComponent, IgcButtonComponent);

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

  @eventOptions({capture: true})
  invalidHandler() {
    this.requestUpdate();
  }

  handleRowSelection(args: any) {
    const selectedRow = args.detail.newSelection;
    console.log('Selected row:', selectedRow);
  }

  onSubmit() {
    for (const [name, value] of new FormData(this.form).entries()) {
        console.log(`${name}: ${value}`);
    }
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
      <div class="column-layout group">
        <igc-grid id="grid" primary-key="customerId" display-density="cosy" row-selection="single" auto-generate="false" class="ig-typography ig-scrollbar grid">
          <igc-column field="customerId" data-type="string" header="customerId" filterable="false" selectable="false"></igc-column>
          <igc-column field="companyName" data-type="string" header="companyName" filterable="false" selectable="false"></igc-column>
          <igc-column field="contactName" data-type="string" header="contactName" filterable="false" selectable="false"></igc-column>
          <igc-column field="contactTitle" data-type="string" header="contactTitle" filterable="false" selectable="false"></igc-column>
          <igc-column field="address.city" data-type="string" header="address city" filterable="false" selectable="false"></igc-column>
          <igc-column field="address.country" data-type="string" header="address country" filterable="false" selectable="false"></igc-column>
        </igc-grid>
      </div>
      <div class="column-layout group">
        <form id="form" @invalid="${this.invalidHandler}">
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

          <div class="form-input">
            <igc-button type="submit" @onsubmit="${this.onSubmit}">Submit request</igc-button>
            <igc-button type="reset" variant="outlined">Reset information</igc-button>
          </div>
        </form>
      </div>
    `;
  }
  firstUpdated() {
/*
    if (this.grid) {
      this.grid.addEventListener("rowSelectionChanging", this.handleRowSelection);
    } else {
      console.error('Grid element not found');
    } */
  }
}
