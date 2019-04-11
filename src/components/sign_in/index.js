import React, { Component } from "react";
import { firebase } from "../../firebase";
import FormFields from "../ui/FormFields";
import { validate } from "../ui/misc";
export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: "",
      formData: {
        email: {
          element: "input",
          value: "",
          config: {
            name: "email_input",
            type: "email",
            placeholder: "Enter your email"
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          validationMessage: ""
        },
        password: {
          element: "input",
          value: "",
          config: {
            name: "password_input",
            type: "password",
            placeholder: "Enter your password"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: ""
        }
      }
    };
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
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch(err => {
          this.setState({
            formError: true
          });
        });
      console.log(dataToSubmit);
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
      <div>
        <div className="container">
          <div
            className="signin_wrapper"
            style={{
              margin: "100px"
            }}
          >
            <form
              onSubmit={event => {
                this.submitForm(event);
              }}
            >
              <h2>Please Login</h2>

              <FormFields
                id={"email"}
                formData={this.state.formData.email}
                change={element => {
                  this.updateForm(element);
                }}
              />
              <FormFields
                id={"password"}
                formData={this.state.formData.password}
                change={element => {
                  this.updateForm(element);
                }}
              />
              {this.state.formError ? (
                <div className="error_label">
                  {"Something is wrong try again"}
                </div>
              ) : null}
              <button
                onClick={event => {
                  this.submitForm(event);
                }}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
