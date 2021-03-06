import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormFields from "../../ui/FormFields";
import { validate } from "../../ui/misc";
import { firebaseDB, firebase, firebasePlayers } from "../../../firebase";
import Fileuploader from "../../ui/fileUploader";
export default class AddEditPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: "",
      formType: "",
      formError: false,
      formSuccess: "",
      defaultImg: "",
      formData: {
        name: {
          element: "input",
          value: "",
          config: {
            label: "Player Name",
            name: "name_input",
            type: "text"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: "true"
        },
        lastname: {
          element: "input",
          value: "",
          config: {
            label: "Player Last Name",
            name: "lastname_input",
            type: "text"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: "true"
        },
        number: {
          element: "input",
          value: "",
          config: {
            label: "Player Number",
            name: "lastname_input",
            type: "number"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: "true"
        },
        position: {
          element: "select",
          value: "",
          config: {
            label: "Select Position",
            name: "select_position",
            type: "select",
            options: [
              {
                key: "Keeper",
                value: "Keeper"
              },
              {
                key: "Defence",
                value: "Defence"
              },
              {
                key: "Midfield",
                value: "Midfield"
              },
              {
                key: "Striker",
                value: "Striker"
              }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: false
        },
        image: {
          element: "image",
          value: "",
          validation: {
            required: true
          },
          valid: true
        }
      }
    };
  }
  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        formType: "Add Player"
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, "Edit Player", url);
            })
            .catch(e => {
              this.updateFields(
                { ...playerData, image: "" },
                playerId,
                "Edit Player",
                ""
              );
            });
        });
    }
  }
  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData
    });
  };
  successForm(message) {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
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
      if (this.state.formType === "Edit Player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Update correctly");
            // this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(err => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }
  updateForm(element, content = "") {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  }
  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;
    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };
  storeFileName = filename => {
    this.updateForm({ id: "image" }, filename);
  };
  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form
              onSubmit={event => {
                this.submitForm(event);
              }}
            >
              <Fileuploader
                dir="players"
                tag={"Player Image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => {
                  this.resetImage();
                }}
                filename={filename => this.storeFileName(filename)}
              />
              <FormFields
                id={"name"}
                formData={this.state.formData.name}
                change={element => {
                  this.updateForm(element);
                }}
              />
              <FormFields
                id={"lastname"}
                formData={this.state.formData.lastname}
                change={element => {
                  this.updateForm(element);
                }}
              />
              <FormFields
                id={"number"}
                formData={this.state.formData.number}
                change={element => {
                  this.updateForm(element);
                }}
              />
              <FormFields
                id={"position"}
                formData={this.state.formData.position}
                change={element => {
                  this.updateForm(element);
                }}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label"> Something went wrong</div>
              ) : (
                ""
              )}

              <div className="admin_submit">
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
