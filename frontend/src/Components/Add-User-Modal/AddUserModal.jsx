import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import React from "react";
import "./AddUserModal.css";
import axios from "axios";

export class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
    };
  }

  //   handling the changing values
  valuesOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //   passing values to the backend
  handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      userName: this.state.username,
    };
    await axios.post("http://localhost:5000/addNewUser", data).then((res) => {
      this.props.addItem(data);
      this.props.onHide();
    });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create A User
          </Modal.Title>
          <CloseButton onClick={this.props.onHide} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                name="email"
                onChange={this.valuesOnChange}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                name="username"
                onChange={this.valuesOnChange}
                placeholder="Username"
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "black" }}
              className="btn-publish"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
