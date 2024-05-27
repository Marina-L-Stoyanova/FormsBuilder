import { Form, IgrCheckbox, IgrCheckboxModule, IgrCombo, IgrComboModule, IgrInput, IgrInputModule, IgrTextarea, IgrTextareaModule } from '@infragistics/igniteui-react';
import { useGetBoxOfficeRevenue } from '../hooks/financial-hooks';
import styles from './master-view.module.css';
import createClassTransformer from '../style-utils';
import { useReducer, useRef, useState } from 'react';

IgrCheckboxModule.register();
IgrComboModule.register();
IgrInputModule.register();
IgrTextareaModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { financialBoxOfficeRevenue } = useGetBoxOfficeRevenue();
  //const [valid, setValid] = useState(true);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const formElement = useRef<HTMLFormElement>(null);
  //formElement.current
  // const validate = () => {
  //   let isValid = true;
  //    if(formElement){
  //     if(formElement.current){
  //       const element = formElement?.current?.elements.namedItem("name") as HTMLInputElement;
  //       if(element){
  //         isValid = element.validity.valueMissing;
  //       }
  //     }
  //   }
  //   setValid(isValid);
  //   //{(formElement?.current?.elements.namedItem("name") as HTMLInputElement)?.validity.valueMissing ? `<span slot="helper-text" class="helper-text">This field is required</span>` : `<p></p>`}
  //   //return isValid ? `<span slot="helper-text" className={classes("helper-text")} key={uuid()}>This field is required</span>` : `<p key={uuid()}></p>`
  // }

  const next = () =>{
    forceUpdate();
  }

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
      <form className="form" ref={formElement}>
        <IgrInput label="Label/Placeholder" outlined="true" name="name" className={classes("user-input")} key={uuid()} required={true} blur={next}>
        {(formElement?.current?.elements.namedItem("name") as HTMLInputElement)?.validity.valueMissing ? <span slot="helper-text" className={classes("helper-text")} key={uuid()}>This field is required</span> : undefined}
        </IgrInput>
        <IgrCombo outlined="true" data={financialBoxOfficeRevenue} label="Label/Placeholder" displayKey="Franchise" key={uuid()} singleSelect="true" className={classes("user-input")}></IgrCombo>
        <IgrTextarea label="Label/Placeholder" className={classes("textarea")} key={uuid()}></IgrTextarea>
        <IgrCheckbox labelPosition="after" className={classes("checkbox")} key={uuid()}>
          <span key={uuid()}>Label</span>
        </IgrCheckbox>
        </form>
      </div>
    </>
  );
}
