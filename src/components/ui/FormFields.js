import React from 'react';

const FormFields = ({ formData, id, change }) => {
   const showError = () => {
      let errorMsg = (
         <div className='error_label'>
            {formData.validation && !formData.valid
               ? formData.validationMessage
               : null}
         </div>
      );
      return errorMsg;
   };
   const renderTemplete = () => {
      let formTemplate = null;
      switch (formData.element) {
         case 'input':
            formTemplate = (
               <div>
                  <input
                     {...formData.config}
                     value={formData.value}
                     onChange={event => change({ event, id })}
                  />
                  {showError()}
               </div>
            );
            break;
         default:
            formTemplate = null;
      }
      return formTemplate;
   };
   return <div>{renderTemplete()}</div>;
};

export default FormFields;
