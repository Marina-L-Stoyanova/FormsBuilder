import { html, css, LitElement, nothing } from 'lit';
import { customElement,  query, eventOptions  } from 'lit/decorators.js';
import { defineComponents, IgcInputComponent, IgcSelectComponent, IgcSnackbarComponent, IgcSelectItemComponent, IgcComboComponent, IgcMaskInputComponent, IgcTextareaComponent, IgcCheckboxComponent, IgcButtonComponent  } from 'igniteui-webcomponents';
import { states } from "./data";

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
    .input {
      height: max-content;
      min-width: min-content;
      flex-shrink: 0;
    }
    .textarea {
      height: max-content;
      min-width: min-content;
      flex-shrink: 0;
    }
    form igc-input:not([invalid]) span[slot="helper-text"], 
    form igc-textarea:not([invalid]) span[slot="helper-text"], 
    form igc-select:not([invalid]) span[slot="helper-text"],
    form igc-combo:not([invalid]) span[slot="helper-text"] { 
      display: none;
     }
  `;

  public states: string[] = states;

  @query("form")
  public form!: HTMLFormElement;
    
  @eventOptions({capture: true})
  invalidHandler() {
    this.requestUpdate();
  }
  
  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    for (const [name, value] of new FormData(this.form).entries()) {
        console.log(`${name}: ${value}`);
    }
    return false;
}

  render() {
    return html`
    <div id="root">
    <div class="container sample">
        <form id="form" @invalid="${this.invalidHandler}" @onSubmit="${this.onSubmit}">
            <igc-input class="form-input" name="first-name" label="First name" placeholder="First Name" minLength="3" required>
              ${(this.form?.elements.namedItem("first-name") as IgcInputComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required</span>` : nothing}
              ${(this.form?.elements.namedItem("first-name") as IgcInputComponent)?.validity.tooShort ? html `<span slot="helper-text" class="helper-text">The name should be at least 3 characters.</span>` : nothing}
            </igc-input>
            <igc-input class="form-input" name="last-name" label="Last name" placeholder="Last Name" required>                        
              ${(this.form?.elements.namedItem("last-name") as IgcInputComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required!</span>` : nothing}
            </igc-input>
            <igc-input class="form-input" name="company-name" label="Company name" placeholder="Company Name" required>                    
              ${(this.form?.elements.namedItem("company-name") as IgcInputComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required!</span>` : nothing}
          </igc-input>
            <igc-select class="form-input"  name="business-role" label="Business role" placeholder="Please Select" required >
                <igc-select-item value="Health & Clinical">Health & Clinical</igc-select-item>
                <igc-select-item value="HR & Benefits">HR & Benefits</igc-select-item>
                <igc-select-item value="Academia">Academia</igc-select-item>
                <igc-select-item value="Marketing">Marketing</igc-select-item>
            ${(this.form?.elements.namedItem("business-role") as IgcSelectComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required!</span>` : nothing}
            </igc-select>
            <igc-select class="form-input" name="title-level" label="Title level" placeholder="Please Select" required>
                <igc-select-item value="Consultant">Consultant</igc-select-item>
                <igc-select-item value="Director">Director</igc-select-item>
                <igc-select-item value="VP">VP</igc-select-item>
              ${(this.form?.elements.namedItem("title-level") as IgcSelectComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required!</span>` : nothing}
            </igc-select>
            <igc-combo class="form-input" name="state" label="State" .data="${this.states}" placeholder="Please Select" single-select>
              ${(this.form?.elements.namedItem("state") as IgcComboComponent)?.validity.valueMissing ? html `<span slot="helper-text" class="helper-text">This field is required!</span>` : nothing}
            </igc-combo>
            <igc-input class="form-input" id="email" name="email" label="Company Email" type="email" placeholder="Email" required minLength="5">                        
              ${(this.form?.elements.namedItem("email") as IgcInputComponent)?.validity.valid ? html `<span slot="helper-text" class="helper-text">Please enter a valid email address.</span>` : nothing}
            </igc-input>
            <igc-mask-input class="form-input" name="telephone" label="Phone number" mask="+1 (999) 999-9999" placeholder="US based telephone number" prompt="#"></igc-mask-input>
            <igc-textarea class="form-input" resize="auto" id="message" name="message" label="Contact us Message" placeholder="Contact us message" required  maxLength="20" validate-only>                        
              ${(this.form?.elements.namedItem("message") as IgcTextareaComponent)?.validity.tooLong ? html `<span slot="helper-text" class="helper-text">This field max length is 20 characters.</span>` : nothing}
            </igc-textarea>
            <igc-checkbox name="toc-accepted" class="form-input" required checked> By submitting your information, you are signing up to receive offers, promotions and other commercial messages from FooBar Inc. </igc-checkbox>

            <div class="form-input">
                <igc-button type="submit">Submit request</igc-button>
                <igc-button type="reset" variant="outlined">Reset information</igc-button>
            </div>
        </form>
    </div>
    <igc-snackbar class="form-notification" display-time="2000" position="middle">
        <h3>Form submitted successfully!</h3>
    </igc-snackbar>
</div>
    `;
  }
}
