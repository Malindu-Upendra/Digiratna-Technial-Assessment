import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import React from "react";
import "./UpdateUserModal.css";
import axios from "axios";

export class UpdateUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      email: "",
      username: "",
    };
  }

//   retriving the data of specific user
  componentDidMount = async () => {
    await axios
      .get(`http://localhost:5000/getUser/${this.props.id}`)
      .then((res) => {
        this.setState({
          userId: res.data.userId,
          email: res.data.email,
          username: res.data.userName,
        });
      });
  };

//   handling the changing values
  valuesOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

//   passing values to the backend
  handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId: this.state.userId,
      email: this.state.email,
      userName: this.state.username,
    };
    await axios.put(`http://localhost:5000/updateUser/${this.state.userId}`, data).then((res) => {
      this.props.updateUser(res.data);
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
            Update The User
          </Modal.Title>
          <CloseButton onClick={this.props.onHide} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                name="email"
                value={this.state.email}
                onChange={this.valuesOnChange}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                value={this.state.username}
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
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
