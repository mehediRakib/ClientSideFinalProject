import React from 'react';
import userStore from "../../store/userStore.js";

const UserSubmitButton = (props) => {
    const {isFormSubmit}=userStore();
  if(isFormSubmit===false){
      return (

              <button onClick={props.onClick} className={props.className}>{props.text}</button>
      );
  }
  else {
      return (
          <button disabled={true} className={props.className}><div className="spinner-border-sm spinner-border" role="status"></div>Processing....</button>
      )
  }
};

export default UserSubmitButton;