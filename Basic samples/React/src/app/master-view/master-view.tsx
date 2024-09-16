import { IgrButton, IgrButtonModule, IgrInput, IgrInputModule, IgrRipple, IgrRippleModule, IgrSnackbar, IgrSnackbarModule, SubmitEvent } from '@infragistics/igniteui-react';
import { useState } from 'react';
import { formDataToObject } from '../utils/form-utils';
import { postCustomerDto, putCustomerDto } from '../services/northwind-ab';
import { useGetCustomerDto } from '../hooks/northwind-ab-hooks';
import styles from './master-view.module.css';
import createClassTransformer from '../style-utils';

IgrButtonModule.register();
IgrInputModule.register();
IgrRippleModule.register();
IgrSnackbarModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { northwindABCustomerDto: customer } = useGetCustomerDto('QUEEN');
  const [ newCustomer, setNewCustomer ] = useState('');

  function submit(args: SubmitEvent) {
    args.preventDefault();
    const submitCustomerDto = formDataToObject(args.target as HTMLFormElement);
    putCustomerDto(submitCustomerDto).then((res) => {
      if (res) {
        // TODO: handle here local data update if needed.
      } else {
        // TODO: handle error here!
      }
    });
  }

  function submit1(args: SubmitEvent) {
    args.preventDefault();
    const submitCustomerDto = formDataToObject(args.target as HTMLFormElement);
    postCustomerDto(submitCustomerDto).then((res) => {
      if (res) {
        // TODO: handle here local data update if needed.
        setNewCustomer(res.customerId);
      } else {
        // TODO: handle error here!
      }
    });
  }

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <form onSubmit={submit} className={classes("column-layout form")}>
          <p>Edit form pointing to existing variable with {customer?.customerId ?? 'NONE'}</p>
          <IgrInput value={customer?.customerId} name="customerId" label="customerId" outlined="true"></IgrInput>
          <IgrInput value={customer?.companyName} name="companyName" label="companyName" outlined="true"></IgrInput>
          <IgrInput value={customer?.contactName} name="contactName" label="contactName" outlined="true"></IgrInput>
          <IgrInput value={customer?.contactTitle} name="contactTitle" label="contactTitle" outlined="true"></IgrInput>
          <IgrInput value={customer?.address.street} name="address.street" label="address.street" outlined="true"></IgrInput>
          <IgrInput value={customer?.address.city} name="address.city" label="address.city" outlined="true"></IgrInput>
          <IgrInput value={customer?.address.region} name="address.region" label="address.region" outlined="true"></IgrInput>
          <IgrInput value={customer?.address.postalCode} name="address.postalCode" label="address.postalCode" outlined="true"></IgrInput>
          <IgrInput value={customer?.address.country} name="address.country" label="address.country" outlined="true"></IgrInput>
          <IgrInput value={customer?.address.phone} name="address.phone" label="address.phone" outlined="true"></IgrInput>
          <div className={classes("row-layout group")}>
            <IgrButton variant="outlined" type="reset" className={classes("button")}>
              <span key={uuid()}>Reset</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
            <IgrButton type="submit" className={classes("button")}>
              <span key={uuid()}>Add</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
          </div>
        </form>
        <form onSubmit={submit1} className={classes("column-layout form")}>
          <p>Created customer has ID {newCustomer ?? 'NONE'}</p>
          <p>Create form not related to any variable</p>
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
          <div className={classes("row-layout group")}>
            <IgrButton variant="outlined" type="reset" className={classes("button")}>
              <span key={uuid()}>Reset</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
            <IgrButton type="submit" className={classes("button")}>
              <span key={uuid()}>Add</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
          </div>
        </form>
      </div>
    </>
  );
}
