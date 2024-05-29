import { IgrButton, IgrButtonModule, IgrDialog, IgrDialogModule, IgrInput, IgrInputModule, IgrTextareaModule } from "@infragistics/igniteui-react";
import { IgrColumn, IgrGrid, IgrGridModule, IgrRowSelectionEventArgs } from '@infragistics/igniteui-react-grids';
import '@infragistics/igniteui-react-grids/grids';
import { useReducer, useRef, useState } from "react";
import { useGetCustomerInputModelList } from '../hooks/north-wind-crud-hooks';
import createClassTransformer from '../style-utils';
import styles from './master-view.module.css';
import { CustomerInputModel } from "../models/NorthWindCRUD/customer-input-model";
import { addCustomer, getCustomerInputModelList, updateCustomer } from "../services/north-wind-crud";

IgrButtonModule.register();
IgrDialogModule.register();
IgrGridModule.register();
IgrInputModule.register();
IgrTextareaModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const [customers, setCustomers] = useState<CustomerInputModel[]>([]);
  const { northWindCRUDCustomerInputModel } = useGetCustomerInputModelList();
  const dialogRef = useRef<IgrDialog>(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const formElement = useRef<HTMLFormElement>(null);
  const [confirmText, setConfirmText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const next = () => {
    forceUpdate();
  };

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

  const onAddFormOpen = () => {
    //resetForm();
    setConfirmText("Add customer");
    if (dialogRef.current) {
      dialogRef.current.show();
    }
  };

  const onAddNewCustomer = () => {
    const formData = new FormData(formElement.current);
    const newCustomer = {
      customerId: formData.get('customerId'),
      companyName: formData.get('companyName'),
      contactName: formData.get('contactName'),
      contactTitle: formData.get('contactTitle'),
      address: {
        city: '',
        country: '',
        street: '',
        region: '',
        postalCode: '',
        phone: ''
      }
    };

    addCustomer(newCustomer).then(handleResponse).catch(handleError);
  };

  const onEditCustomer = () => {
      const formData = new FormData(formElement.current);
      const updatedCustomer = {
        customerId: formData.get('customerId'),
        companyName: formData.get('companyName'),
        contactName: formData.get('contactName'),
        contactTitle: formData.get('contactTitle'),
        address: {
          city: '',
          country: '',
          street: '',
          region: '',
          postalCode: '',
          phone: ''
        }
      };

      updateCustomer(updatedCustomer).then(handleResponse).catch(handleError);
  };

  const onConfirm = () => {
    if (confirmText === 'Add customer') {
      onAddNewCustomer();
    } else if (confirmText === 'Edit customer') {
      onEditCustomer();
    }
  };

  const resetForm = () => {
    formElement.current?.reset();
  };

  const resetCustomer = () => {
    if (selectedCustomer) {
      (formElement.current?.elements.namedItem("companyName") as HTMLInputElement).value = selectedCustomer.companyName;
      (formElement.current?.elements.namedItem("customerId") as HTMLInputElement).value = selectedCustomer.customerId;
      (formElement.current?.elements.namedItem("contactName") as HTMLInputElement).value = selectedCustomer.contactName;
      (formElement.current?.elements.namedItem("contactTitle") as HTMLInputElement).value = selectedCustomer.contactTitle;
    }
  };

  const resetHandler = () => {
    if (confirmText === 'Add customer') {
      resetForm();
    } else if (confirmText === 'Edit customer') {
      resetCustomer();
    }
  };

  const handleResponse = (response) => {
    console.log('Operation successful:', response);
    getCustomerInputModelList().then(setCustomers).catch(console.error);
    onDialogHide();
  };

  const handleError = (error) => {
    console.error('Error:', error);
    setErrorMessage(error.message || 'An error occurred.');
  };

  const renderHelperText = (fieldName) => {
    const field = formElement.current?.elements.namedItem(fieldName);
    if (field && (field as HTMLInputElement).validity.valueMissing) {
      return (
        <span slot="helper-text" className={classes("helper-text")} key={`${fieldName}-helper`}>
          This field is required
        </span>
      );
    }
    return null;
  };

  const handleRowSelection = (owner: IgrGrid, args: IgrRowSelectionEventArgs) => {
    setConfirmText("Edit customer");
    const selectedRow = args.detail.newSelection[0];

    setSelectedCustomer(selectedRow);

    (formElement.current?.elements.namedItem("customerId") as HTMLInputElement).value = selectedRow.customerId;
    (formElement.current?.elements.namedItem("companyName") as HTMLInputElement).value = selectedRow.companyName;
    (formElement.current?.elements.namedItem("contactName") as HTMLInputElement).value = selectedRow.contactName;
    (formElement.current?.elements.namedItem("contactTitle") as HTMLInputElement).value = selectedRow.contactTitle;

    onDialogShow();
  };

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <IgrGrid data={northWindCRUDCustomerInputModel} rowSelection="single" rowSelectionChanging={handleRowSelection} primaryKey="customerId" displayDensity="cosy" allowFiltering="true" filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar grid")}>
          <IgrColumn field="customerId" dataType="string" header="customerId" sortable="true" selectable="false" />
          <IgrColumn field="companyName" dataType="string" header="companyName" sortable="true" selectable="false" />
          <IgrColumn field="contactName" dataType="string" header="contactName" sortable="true" selectable="false" />
          <IgrColumn field="contactTitle" dataType="string" header="contactTitle" sortable="true" selectable="false" />
          <IgrColumn field="address.city" dataType="string" header="address city" sortable="true" selectable="false" />
          <IgrColumn field="address.country" dataType="string" header="address country" sortable="true" selectable="false" />
        </IgrGrid>
        <IgrDialog title="Confirmation" ref={dialogRef}>
          <form className="form" ref={formElement}>
            <IgrInput label="Customer ID" outlined="true" name="customerId" className={classes("user-input")} key="customerId" blur={next}>
            </IgrInput>
            <IgrInput label="Company name" outlined="true" name="companyName" className={classes("user-input")} key="companyName" required={true} blur={next}>
              {renderHelperText("companyName")}
            </IgrInput>
            <IgrInput label="Contact name" outlined="true" name="contactName" className={classes("user-input")} key="contactName" required={true} blur={next}>
              {renderHelperText("contactName")}
            </IgrInput>
            <IgrInput label="Contact title" outlined="true" name="contactTitle" className={classes("user-input")} key="contactTitle" required={true} blur={next}>
              {renderHelperText("contactTitle")}
            </IgrInput>
          </form>
          <div slot="footer">
            <IgrButton clicked={onDialogHide} variant="flat"><span>Cancel</span></IgrButton>
            <IgrButton clicked={resetHandler} variant="flat"><span>Reset form</span></IgrButton>
            <IgrButton clicked={onConfirm} variant="flat"><span>{confirmText}</span></IgrButton>
          </div>
        </IgrDialog>
        <IgrButton variant="contained" clicked={onAddFormOpen}>
          <span>Add customer</span>
        </IgrButton>
      </div>
    </>
  );
}
