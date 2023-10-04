import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { HomepageCards, LearnCards, ExerciseCards} from './cards';
import '../styles/exerLISViews.css';
import '../styles/exercises.css';
import "../styles/buttons.css";
import { bookIcon, exerciseIcon, conversateIcon, addFriendIcon, questionIcon } from './icons';


// The default route that contains the basic structure of all the pages
function DefaultRoute() {
  return (
    <Container className='App'>
      <Row id='content-row' className='justify-content-center background-main vh-100'>
        <Outlet />
      </Row>
    </Container>
  );
}
/*<img src={logo} className='col-10' />*/
function HomepageRoute() {
  return (
    <Col className="homePage col-12 d-flex flex-column ">
      <Row className="my-3 justify-content-center d-flex">
        <Logo />
      </Row>
      <Row className='my-2 justify-content-center'>
        <Col className='col-12'>
          <h5 className='h5-main'>Hello John!</h5>
          <h5 className='h5-main'>Here you can learn, exercise and conversate using Italian Sign Lanuage.</h5>
        </Col>
      </Row>
      <Row className='my-2 justify-content-center'>
        <Col className='col-6'>
          <h5 className='h5-main'>Choose a section: </h5>
          <HomepageCards />
        </Col>
      </Row>
    </Col>
  );
}


function Logo() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <h1 className='px-2 light-color' id='big'>exerLIS</h1>
      <h3 className='px-2 pt-5 light-color' id='small'>The interactive way<br></br>to improve your LIS</h3>
    </div>
  );
}

function LearnRoute() {
  return (
    <Col className='col-12'>
      <Titles title="Learn" icon1={bookIcon} subtitle="Learn new signs to enrich your vocabulary" />
      <Row className='my-2'>
        <Col className='justify-content-center my-5 col-12'>
          <h5 className='h5-main'>Here you can learn how to sign a word or a letter, selecting from:</h5>
        </Col>
      </Row>
      <Row className='justify-content-md-center my-5'> {/*align-items-center vh-100*/}
        <Col className='col-6 my-2'>
          <LearnCards />
        </Col>
      </Row>
    </Col>
  );
}

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props} >
    <div className=' py-2'>
      You can <strong>earn points </strong>doing these exercises. You will earn five points every time an exercise is successfully completed. On the other hand, you will <strong>not gain any points </strong>if you wrongly complete the exercise or you reveal/skip the solution.
    </div>
  </Tooltip>
);

//Exercise route
function ExerciseRoute() {
  return (
    <Col className='col-12'>
      <Titles title="Exercise" icon1={exerciseIcon} subtitle="Exercise your skills with interactive exercises" />
      <Row className='my-1'>
        <Col className='justify-content-end  d-flex align-items-end col-8 my-3' style={{ paddingRight: '0', marginTop: '1' }}>
          <h5 className='h5-main ' style={{ paddingRight: '0', marginRight: '0' }}>Here you can exercise in different ways and earn points.</h5>
        </Col>
        <Col className='justify-content-start d-flex align-items-center col-4 my-3' style={{ marginTop: '1' }} >
          <OverlayTrigger
            className='overlayTrigger'
            placement="right"
            delay={{ show: 50, hide: 200 }}
            overlay={renderTooltip}
          >
            <Button className='questionButton d-flex justify-content-start align-items-center' style={{ borderRadius: '50%', backgroundColor: '#ECF39E', borderColor: '#ECF39E', padding: '0' }}>
              <>{questionIcon}</>
            </Button>
          </OverlayTrigger>
        </Col>

      </Row>
      <Row className='mt-4 mb-3'>
        <h5 className='h5-main ' style={{ paddingRight: '0', marginRight: '0' }}>Choose a type of exercise:</h5>
      </Row>
      <Row className='justify-content-md-center'> {/*align-items-center vh-100*/}
        <Col className='col-8'>
          <ExerciseCards />
        </Col>
      </Row>
    </Col>
  );
}

//Conversate route
function ConversateRoute() {
  return (
    <Col className='col-12 background-main'>
      <Titles title="Conversate" icon1={conversateIcon} subtitle="Enjoy a conversation with our avatar or video call your friends to exercise together" button='friend' />
      <Row className='my-1'>
        <Col className='justify-content-center my-5'>
          <h5 className='h5-main'>Choose a user or the avatar to begin a conversation:</h5>
        </Col>
      </Row>
      <Row className='justify-content-center mb-5'>
        <Col className='d-flex flex-row col-6 ps-5 ms-5'>
        </Col>
      </Row>
    </Col>
  );
}

// The wrong route if the url is not one of the allowed/existing ones
function WrongRoute() {
  return (
    <Col className='col-6 my-3'>
      <h1>No data here.</h1>
      <h2>This is not the route you are looking for!</h2>
    </Col>
  );
}

function Titles(props) {
  return (
    <>
      <FirstTitle title={props.title} title2={props.title2} icon1={props.icon1} icon2={props.icon2} />
      <Row className='subtitle'>
        <Col className='col-8 d-flex justify-content-start py-3 ps-5  headerTitle'>
          <h4 className='my-auto ms-5'>{props.subtitle}</h4>
        </Col>
        {props.button !== undefined &&
          <Col className='d-flex justify-content-end py-2 headerTitle'>
            <Button className='py-0 d-flex align-items-center brownButton'>Add a friend&nbsp;&nbsp;<>{addFriendIcon}</>
            </Button>
          </Col>
        }
        {props.button === undefined &&
          <Col className='d-flex justify-content-end  headerTitle'>
          </Col>
        }

      </Row>
    </>
  );
}

function FirstTitle(props) {
  return (
    <Row className='headerFirstTitle'>
      <Col className='py-1 d-flex justify-content-start align-items-center my-2 ps-5 col-5 '>
        <h4 className='my-auto ms-5'>{props.title}</h4>
        &nbsp;&nbsp;
        <>{props.icon1}</>
        {props.icon2 &&
          <>
            {/*&nbsp;&nbsp;
              <h4 className='my-auto'>></h4>*/}
            &nbsp;&nbsp;&nbsp;
            <h4 className='my-auto'>{props.title2}</h4>
            &nbsp;&nbsp;
            <>{props.icon2}</>
          </>
        }
      </Col>
      {props.buttons &&
        <Col className='d-flex justify-content-end col-7'>
          {props.buttons}
        </Col>
      }
    </Row>
  )

}

export { DefaultRoute, HomepageRoute, WrongRoute, LearnRoute, ExerciseRoute, ConversateRoute, Titles, FirstTitle };