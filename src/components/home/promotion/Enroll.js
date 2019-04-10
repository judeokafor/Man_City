import React, { Component } from 'react';
import Fade from 'react-reveal';
import FormFields from '../../ui/FormFields';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';

export default class Enroll extends Component {
   constructor(props) {
      super(props);

      this.state = {
         formError: false,
         formSuccess: '',
         formData: {
            email: {
               element: 'input',
               value: '',
               config: {
                  name: 'email_input',
                  type: 'email',
                  placeholder: 'Enter your email'
               },
               validation: {
                  required: true,
                  email: true
               },
               valid: false,
               validationMessage: ''
            }
         }
      };
   }
   resetFormSuccess(type) {
      const newFormData = { ...this.state.formData };
      for (let key in newFormData) {
         newFormData[key].value = '';
         newFormData[key].valid = false;
         newFormData[key].validationMessage = '';
      }
      this.setState({
         formError: false,
         formData: newFormData,
         formSuccess: type ? 'Congratulations' : 'Already on the database'
      });
      this.successMessage();
   }
   successMessage() {
      setTimeout(() => {
         this.setState({
            formSuccess: ''
         });
      }, 3000);
   }

   submitForm(event) {
      event.preventDefault();
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formData) {
         dataToSubmit[key] = this.state.formData[key].value;
         formIsValid = this.state.formData[key].valid && formIsValid;
      }
      if (formIsValid) {
         firebasePromotions
            .orderByChild('email')
            .equalTo(dataToSubmit.email)
            .once('value')
            .then(snapshot => {
               if (snapshot.val() === null) {
                  firebasePromotions.push(dataToSubmit);
                  this.resetFormSuccess(true);
               } else {
                  this.resetFormSuccess(false);
               }
            });
      } else {
         this.setState({
            formError: true
         });
      }
   }
   updateForm(element) {
      const newFormData = { ...this.state.formData };
      const newElement = { ...newFormData[element.id] };

      newElement.value = element.event.target.value;

      let validData = validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];

      newFormData[element.id] = newElement;
      this.setState({
         formError: false,
         formData: newFormData
      });
   }

   render() {
      return (
         <Fade>
            <div className='enroll_wrapper'>
               <form
                  onSubmit={event => {
                     this.submitForm(event);
                  }}
               >
                  <div className='enroll_title'>Enter your email</div>
                  <div className='enroll_input'>
                     <FormFields
                        id={'email'}
                        formData={this.state.formData.email}
                        change={element => {
                           this.updateForm(element);
                        }}
                     />
                     {this.state.formError ? (
                        <div className='error_label'>
                           {'Something is wrong try again'}
                        </div>
                     ) : null}
                     <div className='success_label'>
                        {this.state.formSuccess}
                     </div>
                     <button
                        onClick={event => {
                           this.submitForm(event);
                        }}
                     >
                        Enroll
                     </button>
                     <div className='enroll_discl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia suscipit dolore animi, expedita libero facere!
                     </div>
                  </div>
               </form>
            </div>
         </Fade>
      );
   }
}
