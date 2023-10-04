import { Row, Col, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { bookIcon, exerciseIcon, conversateIcon, wordsIcon, topicsIcon, alphabetIcon, guessIcon, signIcon, fingerspellIcon, allIcon, questionIcon } from './icons';
import { useNavigate } from 'react-router-dom';
import '../styles/cards.css';
import "../styles/buttons.css";
import { ModalWebcam, ModalEnd } from './Modal';
import { useState, useEffect } from 'react';

function HomepageCards() {
  const navigate = useNavigate();
  return (
    <div className='groupCard'>
      <Card className="card-main" role='button' onClick={() => { navigate('/learn'); }}>
        <Card.Body>
          <Card.Title >Learn</Card.Title>
          <>{bookIcon}</>
          {/* <Card.Text className='light-color'> */}
          <Card.Text className="card-main-text">
            Learn new signs to enrich your vocabulary
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card-main" role='button' onClick={() => { navigate('/exercise'); }}>
        <Card.Body>
          <Card.Title>Exercise</Card.Title>
          <>{exerciseIcon}</>
          {/* <Card.Text className='light-color'> */}
          <Card.Text className="card-main-text">
            Improve your skills through different types of interactive exercises
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="card-disabled">
        <Card.Body>
          <Card.Title>Conversate</Card.Title>
          <>{conversateIcon}</>
          {/* <Card.Text className='light-color'> */}
          <Card.Text className="card-main-text">
            Video-chat with a friend or with our signing avatar
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function LearnCards() {
  const navigate = useNavigate();
  return (
    <div className='groupCard'>
      <Card className="card-disabled">
        <Card.Body>
          <Card.Title>Words</Card.Title>
          <>{wordsIcon}</>
          <Card.Text className="card-main-text" >
            Learn a new word searching it in the vocabulary
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="card-disabled">
        <Card.Body>
          <Card.Title>Topics</Card.Title>
          <>{topicsIcon}</>
          <Card.Text className="card-main-text">
            Learn a new word searching between topics
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="card-main" role="button" onClick={() => { navigate('/learn/alphabet'); }}>
        <Card.Body>
          <Card.Title>Alphabet</Card.Title>
          <>{alphabetIcon}</>
          <Card.Text className="card-main-text">
            Learn a sign from the LIS alphabet
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function ExerciseCards() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');

  const [shouldShowModal, setShouldShowModal] = useState(true);
  useEffect(() => {
    const getModalSetting = async () => {
      try {
        fetch("http://localhost:3001/modalsetting/")
          .then(res => res.json())
          .then(result =>
            setShouldShowModal(result.map(json => json.webcam)[0])
          ).catch("Error " + console.log);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getModalSetting();

  }, [shouldShowModal]);

  return (
    <>
      {shouldShowModal ?
        <ModalWebcam setShow={setShow} show={show} type={type} navigateTo={'/exercise/choosetopics'} text={<>In this kind of exercises the system accesses your webcam to detect your signs and provide you a feedback.<br></br>Are you sure you want to continue?</>} />
        :
        <></>
      }
      <div className='groupCard'>
        <Card className="card-disabled">
          <Card.Body>
            <Card.Title>Guess the sign</Card.Title>
            <>{guessIcon}</>
            <Card.Text className="card-main-text">
              You can try to guess the words signed by the avatar
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="card-disabled">
          <Card.Body>
            <Card.Title>Sign the word</Card.Title>
            <>{signIcon}</>
            <Card.Text className="card-main-text">
              You can try yourself to sign the proposed words
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="card-main" role="button" onClick={() => {
          setType('fingerspelltheword');
          if (shouldShowModal) {
            setShow(true);
          } else {
            navigate('/exercise/choosetopics', { state: { type: 'fingerspelltheword' } })
          }
        }}>
          <Card.Body>
            <Card.Title>Fingerspell the word</Card.Title>
            <>{fingerspellIcon}</>
            <Card.Text className="card-main-text">
              You will be requested to fingerspell the proposed words
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="card-disabled">
          <Card.Body>
            <Card.Title>All together</Card.Title>
            <>{allIcon}</>
            <Card.Text className="card-main-text">
              You can find here a mix of all the types of exercise
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}


export { HomepageCards, LearnCards, ExerciseCards};