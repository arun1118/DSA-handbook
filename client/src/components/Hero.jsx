import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
    return (
      <div className=' py-5'>
        <Container className='d-flex justify-content-center'>
          <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1 className='text-center mb-4'>Get started!</h1>
            <p className='text-center mb-4'>
            DSA Handbook is a user-friendly app that helps you keep track of your DSA questions, approaches, and solutions.
            You can set the difficulty of each question and add tags to them for easy searching.
            DSA Handbook is the perfect tool to help you revise for your DSA exams. To get started, simply SignIn or SignUp.
            </p>
            <div className='d-flex'>
              <LinkContainer to='/login'>
                  <Button variant='dark' className='me-3'>
                    Login
                  </Button>
              </LinkContainer>
    
              <LinkContainer to='/register'>
                  <Button variant='info'>
                    Register
                  </Button>
              </LinkContainer>
            </div>
          </Card>
        </Container>
      </div>
    );
};

export default Hero;