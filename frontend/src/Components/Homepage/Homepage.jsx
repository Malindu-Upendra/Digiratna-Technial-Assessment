import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Homepage.css";
import axios from "axios";
import { AddUserModal } from "../Add-User-Modal/AddUserModal";
import { UpdateUserModal } from "../UpdateUserModal/UpdateUserModal";

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addUserModal: false,
      updateUserModal: false,
      userToUpdate: 0,
    };
  }

  componentDidMount = async () => {
    await axios.get("http://localhost:5000/getAllUsers").then((res) => {
      this.setState({ users: res.data });
    });
  };

  // method to get the userid to pass the subcomponent
  updateUser = async (id) => {
    await this.setState({ userToUpdate: parseInt(id) });
    this.setState({ updateUserModal: true });
  };

  // once the user is updated, table also will get updated using this method
  updateUserArray = (updatedUser) => {
    let oldUserList = this.state.users

    oldUserList.forEach((user,index) => {
      if(user.userId === updatedUser.userId){
        oldUserList[index] = updatedUser
      }
    })
    
    this.setState({ users: oldUserList})
  }

  // adding new user to the table
  addItem = (user) => {
    this.setState({ users: [...this.state.users, user] });
  };

  // enabling the Modal to add the user
  addUser = () => {
    this.setState({ addUserModal: true });
  };

  // closing the add User modal
  closeAddUserModal = () => {
    this.setState({ addUserModal: false });
  };

  // closing the Update user modal
  closeUpdateUserModal = () => {
    this.setState({ updateUserModal: false });
  };

  // this method will update the table once the user is deleted
  deleteUser = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:5000/deleteUser/${id}`).then((res) => {
      if (res.data) {
        this.setState({
          users: this.state.users.filter((user) => {
            return user.userId !== id;
          }),
        });
      }
    });
  };

  render() {
    return (
      <div className="homepage-body">
        <div className="add-user-button-div">
          <Button
            className="add-user-button"
            onClick={this.addUser}
            variant="success"
          >
            Add User
          </Button>
        </div>

        {/* ----------------------------------- User table -------------------------------------------- */}
        <div className="user-table">
          <Table striped bordered hover>
            <thead className="table-header">
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={this.deleteUser.bind(this, user.userId)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="success"
                      onClick={this.updateUser.bind(this, user.userId)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* ----------------------------------- End of the User table -------------------------------------------- */}
        {/* ----------------------------------- User Adding Modal -------------------------------------------- */}
        <AddUserModal
          show={this.state.addUserModal}
          onHide={this.closeAddUserModal}
          addItem={this.addItem}
        />
        {/* ----------------------------------- end of the User Adding Modal -------------------------------------------- */}
        {/* ----------------------------------- Updating User Adding Modal -------------------------------------------- */}
        {this.state.updateUserModal ? (
          <UpdateUserModal
            show={this.state.updateUserModal}
            updateUser={this.updateUserArray}
            onHide={this.closeUpdateUserModal}
            id={this.state.userToUpdate}
          />
        ) : null}
         {/* ----------------------------------- end of the Updating User Adding Modal -------------------------------------------- */}
      </div>
    );
  }
}
