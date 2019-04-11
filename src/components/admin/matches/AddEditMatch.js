import React, { Component } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import FormFields from '../../ui/FormFields';
import { validate } from '../../ui/misc';
export default class AddEditMatch extends Component {
   constructor(props) {
      super(props);

      this.state = {
         matchId: '',
         formType: '',
         formError: false,
         formSuccess: '',
         teams: [],
         formData: {
            date: {
               element: 'input',
               value: '',
               config: {
                  label: 'Event Date',
                  name: 'date_input',
                  type: 'date'
               },
               validation: {
                  required: true,
                  email: true
               },
               valid: false,
               validationMessage: '',
               showLabel: 'true'
            },
            local: {
               element: 'select',
               value: '',
               config: {
                  label: 'Select Local Team',
                  name: 'select_local',
                  type: 'select',
                  options: []
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: false
            },
            resultLocal: {
               element: 'input',
               value: '',
               config: {
                  label: 'Result Local',
                  name: 'result_local_input',
                  type: 'text'
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: false
            },
            away: {
               element: 'select',
               value: '',
               config: {
                  label: 'Select away Team',
                  name: 'select_away',
                  type: 'select',
                  options: []
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: false
            },
            resultAway: {
               element: 'input',
               value: '',
               config: {
                  label: 'Result away',
                  name: 'result_away_input',
                  type: 'text'
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: false
            },
            referee: {
               element: 'input',
               value: '',
               config: {
                  label: 'Referee',
                  name: 'referee_input',
                  type: 'text'
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: true
            },
            stadium: {
               element: 'input',
               value: '',
               config: {
                  label: 'Stadium',
                  name: 'stadium_input',
                  type: 'text'
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: true
            },
            result: {
               element: 'select',
               value: '',
               config: {
                  label: 'Team Result',
                  name: 'select_result',
                  type: 'select',
                  options: [
                     { key: 'W', value: 'W' },
                     { key: 'D', value: 'D' },
                     { key: 'L', value: 'L' },
                     { key: 'n/a', value: 'n/a' }
                  ]
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: true
            },
            final: {
               element: 'select',
               value: '',
               config: {
                  label: 'Game Played ?',
                  name: 'select_played',
                  type: 'select',
                  options: [
                     { key: 'Yes', value: 'Yes' },
                     { key: 'No', value: 'No' },
                     { key: 'L', value: 'L' }
                  ]
               },
               validation: {
                  required: true
               },
               valid: false,
               validationMessage: '',
               showLabel: true
            }
         }
      };
   }
   render() {
      return (
         <AdminLayout>
            <div className='editmatch_dialog_wrapper'>
               <h2>{this.state.formType}</h2>
               <div>
                  <form
                     onSubmit={event => {
                        this.submitForm(event);
                     }}
                  >
                     <FormFields
                        id={'date'}
                        formData={this.state.formData.date}
                        change={element => {
                           this.updateForm(element);
                        }}
                     />
                     <div className='select_team_layout'>
                        <div className='label_inputs'>Local</div>
                        <div className='wrapper'>
                           <div className='left'>
                              <FormFields
                                 id={'local'}
                                 formData={this.state.formData.local}
                                 change={element => {
                                    this.updateForm(element);
                                 }}
                              />
                           </div>
                           <div>
                              <FormFields
                                 id={'resultLocal'}
                                 formData={this.state.formData.resultLocal}
                                 change={element => {
                                    this.updateForm(element);
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                     <div className='select_team_layout'>
                        <div className='label_inputs'>Away</div>
                        <div className='wrapper'>
                           <div className='left'>
                              <FormFields
                                 id={'away'}
                                 formData={this.state.formData.away}
                                 change={element => {
                                    this.updateForm(element);
                                 }}
                              />
                           </div>
                           <div>
                              <FormFields
                                 id={'resultAway'}
                                 formData={this.state.formData.resultAway}
                                 change={element => {
                                    this.updateForm(element);
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                     <div className='split-fields'>
                        <FormFields
                           id={'referee'}
                           formData={this.state.formData.referee}
                           change={element => {
                              this.updateForm(element);
                           }}
                        />
                        <FormFields
                           id={'stadium'}
                           formData={this.state.formData.stadium}
                           change={element => {
                              this.updateForm(element);
                           }}
                        />
                     </div>
                     <div className='split-fields last'>
                        <FormFields
                           id={'result'}
                           formData={this.state.formData.result}
                           change={element => {
                              this.updateForm(element);
                           }}
                        />
                        <FormFields
                           id={'final'}
                           formData={this.state.formData.final}
                           change={element => {
                              this.updateForm(element);
                           }}
                        />
                     </div>
                     <div className='success_label'>
                        {this.state.formSuccess}
                     </div>
                     {this.state.formError ? (
                        <div className='error_label'> Something is wrong</div>
                     ) : (
                        ''
                     )}

                     <div className='admin_submit'>
                        <button
                           onClick={event => {
                              this.submitForm(event);
                           }}
                        >
                           {this.state.formType}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </AdminLayout>
      );
   }
}
