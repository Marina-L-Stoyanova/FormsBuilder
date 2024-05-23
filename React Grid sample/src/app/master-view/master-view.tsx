import { Form, IgrButton, IgrDialog, IgrButtonModule, IgrDialogModule, IgrInput, IgrInputModule, IgrTextareaModule } from "@infragistics/igniteui-react";
import { IgrColumn, IgrGrid, IgrGridModule } from '@infragistics/igniteui-react-grids';
import { useGetCustomerInputModelList } from '../hooks/north-wind-crud-hooks';
import '@infragistics/igniteui-react-grids/grids';
import styles from './master-view.module.css';
import createClassTransformer from '../style-utils';
import React, { useReducer, useRef } from "react";

IgrButtonModule.register();
IgrDialogModule.register();
IgrGridModule.register();
IgrInputModule.register();
IgrTextareaModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { northWindCRUDCustomerInputModel } = useGetCustomerInputModelList();
  const dialogRef = React.useRef<IgrDialog>(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const formElement = useRef<HTMLFormElement>(null);

  const next = () =>{
    forceUpdate();
  }

  const onDialogShow = () => {
    if (dialogRef.current) {
      dialogRef.current.show();
    }
  };

  const onDialogHide = () => {
    if (dialogRef.current) {
      dialogRef.current.hide();
    }
  };

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <IgrGrid data={northWindCRUDCustomerInputModel} primaryKey="customerId" displayDensity="cosy" allowFiltering="true" filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar grid")}>
          <IgrColumn field="customerId" dataType="string" header="customerId" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="companyName" dataType="string" header="companyName" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="contactName" dataType="string" header="contactName" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="contactTitle" dataType="string" header="contactTitle" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="address.city" dataType="string" header="address city" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="address.country" dataType="string" header="address country" sortable="true" selectable="false"></IgrColumn>
        </IgrGrid>
        <IgrDialog title="Confirmation" ref={dialogRef}>
          <form className="form" ref={formElement}>
            <IgrInput label="Label/Placeholder" outlined="true" name="name" className={classes("user-input")} key={uuid()} required={true} blur={next}>
              {(formElement?.current?.elements.namedItem("name") as HTMLInputElement)?.validity.valueMissing ? <span slot="helper-text" className={classes("helper-text")} key={uuid()}>This field is required</span> : undefined}
            </IgrInput>
          </form>
        <div slot="footer">
          <IgrButton clicked={onDialogHide} variant="flat"><span>Cancel</span></IgrButton>
          <IgrButton clicked={onDialogHide} variant="flat"><span>OK</span></IgrButton>
        </div>
      </IgrDialog>
      <IgrButton variant="contained" clicked={onDialogShow}>
        <span>Add customer</span>
      </IgrButton>
      </div>
    </>
  );
}
