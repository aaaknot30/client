import React, { useState } from 'react';
import LogInModal from './LogInModal'
import RegisterModal from './RegisterModal'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown
} from 'reactstrap';

function AppNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar {...args} color="dark" dark expand="sm">
        <NavbarBrand href="/">ShoppingList</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <LogInModal />
            <RegisterModal />
            <UncontrolledDropdown nav inNavbar>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;