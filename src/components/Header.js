import React from "react";
//usedipatch is use to call in action and useselector is use to take something in
import { useDispatch,useSelector } from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {Container,Nav,Navbar, NavDropdown} from "react-bootstrap";
import { logout } from "../actions/userActions";
const Header = () => {
  const dispatch=useDispatch()
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const logoutHandler=()=>{
   dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>My Shop</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <LinkContainer to='/cart/:id'>
            <Nav.Link><i className="fas fa-shopping-cart" > cart</i></Nav.Link>
            </LinkContainer>
            {userInfo ?(
              <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            )
            :(
              <LinkContainer to='/login'>
              <Nav.Link><i className="fas fa-user" >SignIn</i></Nav.Link>
              </LinkContainer>
            )
             }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
