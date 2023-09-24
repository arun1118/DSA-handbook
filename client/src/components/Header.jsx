import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt,FaHome,FaPen,FaRegUserCircle } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const {userInfo} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const [logoutApiCall]=useLogoutMutation();
  const navigate=useNavigate();

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          {/* <Navbar.Brand href='/'>MERN Auth</Navbar.Brand> */}

          {/* using this will not reload the page while directing to a new path */}
          <LinkContainer to='/'>
            <Navbar.Brand href='/'>DSA Handbook</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {
              userInfo
              ? 
              (
                <>
                <LinkContainer to='/problems'>
                  <Nav.Link>
                    <FaHome /> Home
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='problems/addproblem'>
                  <Nav.Link>
                    <FaPen /> Create
                  </Nav.Link>
                </LinkContainer>
                
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                    <FaRegUserCircle style={{color: 'black'}}/> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt />Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <ul>
                  <li><Link to="/problems">Home</Link></li>
                  <li><Link to='problems/addproblem'>Create</Link></li>
                </ul> */}
                </>
              )
              : 
              (
                <>
                <LinkContainer to='/login'>
                    <Nav.Link>
                        <FaSignInAlt /> Login
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                    <Nav.Link>
                        <FaSignOutAlt /> Register
                    </Nav.Link>
                </LinkContainer>
                </>
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