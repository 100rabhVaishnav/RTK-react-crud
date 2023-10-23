import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser, deleteUser, updateUser } from "../store/slices/UserSlice";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const List = () => {

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(showUser());
  }, []);

  const [Show, setShow] = useState(false);
  const [userId, setUserId] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState([]);


  const handleEdit = async (id, userName, Email, Age, Gender) => {
    setShow(true);
    setUserId(id);
    setName(userName);
    setEmail(Email);
    setAge(Age);
    setGender(Gender);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users...", users);
    dispatch(updateUser({id:userId,name:name,email:email,age:age,gender:gender}));
    if (users) {
        window.alert("data updated successfully.")
    }
    handleClose();
};
  
  const handleClose = () => setShow(false);
  return (
    <>
        <h1>Users Details</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users &&
            users.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>{data.gender}</td>
                <td>
                  <div>
                    <button onClick={() => {
                      handleEdit(data.id, data.name, data.email, data.age, data.gender)
                    }}>Edit</button>
                    <button onClick={() => dispatch(deleteUser(data.id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={Show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update UserData</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label className="form-label">Id</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={userId}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>


              <div className="mb-3">
                <input
                  className="form-check-input"
                  name="gender"
                  value={gender==="Male"}
                  type="checkbox"
                  onChange={() => setGender("Male")}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="mb-3">
                <input
                  className="form-check-input"
                  name="gender"
                  checked={gender==="Female"}
                  type="checkbox"
                  onChange={() => setGender("Female")}

                />
                <label className="form-check-label">Female</label>
              </div>
              <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">Close</Button>
                <Button type='submit' variant="primary">Save changes</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
export default List