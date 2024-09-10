import { IgrButton, IgrButtonModule, IgrInput, IgrInputModule, IgrRipple, IgrRippleModule, SubmitEvent } from "@infragistics/igniteui-react";
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
  const uuid = () => crypto.randomUUID();

  function submit(args: SubmitEvent) {
    args.preventDefault();
    const submitCustomerDto = formDataToObject(args.target as HTMLFormElement);
    postCustomerDto(submitCustomerDto).then((res) => {
      if (res) {
        // TODO: handle here local data update if needed.
      } else {
        // TODO: handle error here!
      }
    });
  }

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <form onSubmit={submit} className={classes("column-layout form")}>
          <IgrInput name="customerId" label="customerId" outlined="true"></IgrInput>
          <IgrInput name="companyName" label="companyName" outlined="true"></IgrInput>
          <IgrInput name="contactName" label="contactName" outlined="true"></IgrInput>
          <IgrInput name="contactTitle" label="contactTitle" outlined="true"></IgrInput>
          <IgrInput name="address.street" label="address.street" outlined="true"></IgrInput>
          <IgrInput name="address.city" label="address.city" outlined="true"></IgrInput>
          <IgrInput name="address.region" label="address.region" outlined="true"></IgrInput>
          <IgrInput name="address.postalCode" label="address.postalCode" outlined="true"></IgrInput>
          <IgrInput name="address.country" label="address.country" outlined="true"></IgrInput>
          <IgrInput name="address.phone" label="address.phone" outlined="true"></IgrInput>
          <IgrButton className={classes("button")}>
            <span key={uuid()}>Submit</span>
            <IgrRipple key={uuid()}></IgrRipple>
          </IgrButton>
        </form>
      </div>
    </>
  );
}
