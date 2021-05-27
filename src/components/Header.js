import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({ user }) => {
    return ( 
        <Navbar variant="dark" bg="success" className="ps-2">
        <Navbar.Brand href="/">SmoothBank</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Accounts" id="basic-nav-dropdown">
            <NavDropdown.Item href="">Sign up for an Account</NavDropdown.Item>
            <NavDropdown.Item href="#">View Account Types</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Cards" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cards">Sign up for a Card</NavDropdown.Item>
            <NavDropdown.Item href="/cardTypes">View Card Offerings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#loans">Loans</Nav.Link>
          <Nav.Link href="#loans">Branches</Nav.Link>
        </Nav>
        <Nav className="login">
        {!user &&
        <>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        </>
        }
        {user &&
        <>
            <Nav.Link href="#profile">{user}</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
        </>
        }

        </Nav>
      </Navbar>
     );
}
 
export default Header;