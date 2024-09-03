import { IgrButton, IgrButtonModule, IgrInput, IgrInputModule, IgrTextareaModule } from "@infragistics/igniteui-react";
import * as React from "react";
import { formDataToObject } from '../utils/form-utils';
import createClassTransformer from '../style-utils';
import styles from './master-view.module.css';
import { northwindCRUDService } from '../services/NorthwindCRUD-service';

IgrButtonModule.register();
IgrInputModule.register();
IgrTextareaModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const next = () => {
    forceUpdate();
  };

  const onAddNewSubmit = async (args: SubmitEvent) => {
    args.preventDefault(); // Prevent the default form submission

    const formObject = formDataToObject(args.target as HTMLFormElement);
    try {
      const data = await northwindCRUDService.postCustomerDto(formObject);
      // TODO: handle local data update if needed.
      console.log("Data submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
      <div className={classes("row-layout master-view-container")}>
          <form className="form" onSubmit={onAddNewSubmit}>
            <IgrInput label="Customer ID" outlined="true" name="customerId" className={classes("user-input")} key="customerId" blur={next}>
            </IgrInput>
            <IgrInput label="Company name" outlined="true" name="companyName" className={classes("user-input")} key="companyName" blur={next}>
            </IgrInput>
            <IgrInput label="Contact name" outlined="true" name="contactName" className={classes("user-input")} key="contactName" blur={next}>
            </IgrInput>
            <IgrInput label="Contact title" outlined="true" name="contactTitle" className={classes("user-input")} key="contactTitle" blur={next}>
            </IgrInput>
            <IgrButton type="submit" variant="flat">
          <span>Submit</span>
        </IgrButton>
          </form>
      </div>
  );
}
