import { IgrButton, IgrButtonModule, IgrInput, IgrInputModule, IgrTextareaModule } from "@infragistics/igniteui-react";
import { useEffect, useReducer, useRef } from "react";
import createClassTransformer from '../style-utils';
import styles from './master-view.module.css';

IgrButtonModule.register();
IgrInputModule.register();
IgrTextareaModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const [ forceUpdate] = useReducer(x => x + 1, 0);
  const formElement = useRef<HTMLFormElement>(null);

  const next = () => {
    forceUpdate();
  };

  const onConfirm = () => {
    alert("Submit!")
  };

  useEffect(() => {
    if (formElement.current) {
      (formElement.current.elements.namedItem("companyName") as HTMLInputElement).value = "";
      (formElement.current.elements.namedItem("customerId") as HTMLInputElement).value = "";
      (formElement.current.elements.namedItem("contactName") as HTMLInputElement).value = "";
      (formElement.current.elements.namedItem("contactTitle") as HTMLInputElement).value = "";
    }
  }, []); // Empty dependency array means this runs once after the initial render

  return (
      <div className={classes("row-layout master-view-container")}>
          <form className="form" ref={formElement}>
            <IgrInput label="Customer ID" outlined="true" name="customerId" className={classes("user-input")} key="customerId" blur={next}>
            </IgrInput>
            <IgrInput label="Company name" outlined="true" name="companyName" className={classes("user-input")} key="companyName" blur={next}>
            </IgrInput>
            <IgrInput label="Contact name" outlined="true" name="contactName" className={classes("user-input")} key="contactName" blur={next}>
            </IgrInput>
            <IgrInput label="Contact title" outlined="true" name="contactTitle" className={classes("user-input")} key="contactTitle" blur={next}>
            </IgrInput>
          </form>
          <div slot="footer">
            <IgrButton clicked={onConfirm} variant="flat"><span>Submit</span></IgrButton>
          </div>
      </div>
  );
}
