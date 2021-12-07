import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import './Header.css'
import { logout } from '../action/userAction'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ShoppingCart</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <div className='nav'>
                            <Nav className='ml-auto '>
                                <LinkContainer to="/cart" id='cart'>
                                    <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/bundle" id='bundle'>
                                    <Nav.Link> <i className="fas fa-box"></i> Bundle</Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item >profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/myorders' id='myorders'>
                                            <NavDropdown.Item>My Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/login' id='LogOut' >
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login" id='Login'>
                                        <Nav.Link> <i className="fas fa-user"></i>Sign In</Nav.Link>
                                    </LinkContainer>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to='/admin/userlist' id='users'>
                                            <NavDropdown.Item>users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist' id='products'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist' id='orders'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
