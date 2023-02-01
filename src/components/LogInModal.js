import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';

function LogInModal() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const toggle = () => setModal(!modal);

  const handleNameChangeName = (e) => setName(e.target.value);
  const handleEmailChangeName = (e) => setEmail(e.target.value);
  const handlePasswordChangeName = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    logInUser(name, email, password);
  };


  const logOut = async () => {
    console.log('Logout')
    setLoggedIn(false)
    //localStorage.removeItem('token')
  }


  const logInUser = async (name, email, password) => {
    fetch('/api/auth', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.msg) {
          setErrorMsg(data.msg)
        } else {
          setLoggedIn(true)
          localStorage.setItem('token', data.token);
          toggle();
        }
        
      })
  }


  return (
    <div>
      {
        loggedIn ? 
        <NavLink onClick={logOut} href="#">LogOut</NavLink> : 
        <NavLink onClick={toggle} href="#">LogIn</NavLink>
      } 
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
        {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
        <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={handleNameChangeName}
              />
              <Label for="item">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleEmailChangeName}
              />
              <Label for="item">Password</Label>
              <Input
                type="password"
                name="passwor"
                id="password"
                placeholder="Password"
                onChange={handlePasswordChangeName}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                LogIn
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default LogInModal;