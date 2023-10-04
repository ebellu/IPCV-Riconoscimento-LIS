import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import '../styles/Modal.css';
import { questionIconModal, exclamationIconModal, errorIcon, wrongIconModal, partyPopperLeft, partyPopperRight } from './icons';

function ModalWebcam(props) {

  const navigate = useNavigate();
  const handleClose = () => props.setShow(false);
  const [checked, setChecked] = useState(false);

  // If the modal is called in Conversate a username is necessary to navigate in the correct path
  const selectedUser = props.selectedUser !== undefined ? props.selectedUser : "";

  const registerChoice = async () => {
    try {
      fetch("http://localhost:3001/modalsetting/0", {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 0, webcam: false }) //MODAL WILL NOT APPEAR ANYMORE
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (<>
    <Modal show={props.show} onHide={handleClose} centered >
      <Modal.Header id='mainModalTitle' closeButton>
        <Modal.Title  className='d-flex e align-items-center'>Important&nbsp;{exclamationIconModal}</Modal.Title>
      </Modal.Header>

      <Modal.Body id='textModal'>
        <p>{props.text}</p>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" checked={checked} label="Don't show anymore" onChange={() => { setChecked(!checked) }} />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer id='mainModal'>
        {props.selectedUser === undefined || props.selectedUser === "Avatar" ?
          <Button className='main-button-color' onClick={() => {
            if(props.hasVariant == null){
            navigate(props.navigateTo + selectedUser, { state: { type: props.type } })
            }
            else if(props.hasVariant===true) {navigate(props.navigateTo, { state: props.type })}
            else navigate(props.navigateTo)
            
            if (checked)
              registerChoice()
          }}>Continue</Button>
          :
          <Button className='main-button-color' onClick={() => {
            props.setShowConfirm(true);
            if (checked)
              registerChoice()
            handleClose();
          }}>Continue</Button>
        }
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}

function ModalEnd(props) {

  const handleClose = () => props.setShow(false);
  const navigate = useNavigate();

  return (

    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header id='mainModalTitle' closeButton>

        <Modal.Title className='d-flex e align-items-center'>
          Are you sure&nbsp;{questionIconModal}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id='textModal'>
        <p>{props.text}</p>
      </Modal.Body>

      <Modal.Footer id='mainModal'>
        <Button className='main-button-color' onClick={() => { navigate(props.navigateTo); handleClose(); }}>Yes</Button>
        <Button variant="secondary" onClick={handleClose}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalSkip(props) {

  const handleClose = () => props.setShow(false);
  const [checked, setChecked] = useState(false);

  const registerChoice = async () => {
    try {
      fetch("http://localhost:3001/modalsetting/0", {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 0, skip: false }) //MODAL WILL NOT APPEAR ANYMORE
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (

    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header id='mainModalTitle' closeButton>

        <Modal.Title className='d-flex e align-items-center'>
          Are you sure you want to skip&nbsp;{questionIconModal}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id='textModal'>
        <p>{props.text}</p>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" checked={checked} label="Don't show anymore" onChange={() => { setChecked(!checked) }} />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer id='mainModal'>
        <Button className='main-button-color' onClick={() => {
          if (props.isLastToSkip) {
            // last to skip
            props.setCompleted(true)
          } else {
            // there are others exercises available
            props.setCurrentExercise((curr) => curr + 1)
          }
          if (props.setPaused !== undefined) {
            props.setPaused(false)
          }
          if (props.setCheckingAlphabet !== undefined) {
            props.setCheckingAlphabet(false)
          }
          props.setWrong(false)

          // register choiche
          if (checked)
              registerChoice()

          handleClose();
        }}>Skip</Button>
        <Button variant="secondary" onClick={handleClose}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalError(props) {

  const handleClose = () => props.setShow(false);

  return (

    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header id='mainModalTitle' closeButton>
        <Modal.Title className='d-flex e align-items-center'>Error&nbsp;{errorIcon}</Modal.Title>
      </Modal.Header>

      <Modal.Body id='textModal'>
        <p>The system is not recognising your presence. Please, return in front of the screen or adjust your webcam to continue.</p>
      </Modal.Body>

      <Modal.Footer id='mainModal'>
        <Button className='main-button-color' onClick={handleClose}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
function ModalWarning(props) {

  const handleClose = () => props.setShowRevealing(false);
  const [checked, setChecked] = useState(false);
  const registerChoice = async () => {
    try {
      fetch("http://localhost:3001/modalsetting/0", {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 0, warning: false }) //MODAL WILL NOT APPEAR ANYMORE
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (

    <Modal show={props.showRevealing} onHide={handleClose} centered>
      <Modal.Header id='mainModalTitle' closeButton>
        <Modal.Title className='d-flex e align-items-center'>Warning <>{wrongIconModal}</></Modal.Title>
      </Modal.Header>

      <Modal.Body id='textModal'>
        <p>{props.text}</p>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" checked={checked} label="Don't show anymore" onChange={() => { setChecked(!checked) }} />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer id='mainModal'>
        <Button className='main-button-color' onClick={() => {
          if (checked)
            registerChoice()
          props.setRevealing(true);
          handleClose();
          if (props.setLoader !== undefined)
            props.setLoader(true);
        }}>Yes</Button>
        <Button variant="secondary" onClick={handleClose}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalForm(props) {
  const [feedback, setFeedback] = useState(false);

  const [value, setValue] = useState("");

  const handleClose = () => {
    props.setShowForm(false);
    setValue("");
  };

  return (
    <>

      <Modal show={feedback} onHide={()=>setFeedback(false)} centered>
        <Modal.Header id='mainModalTitle' closeButton/>
        <Modal.Body id='textModal'>Thank you! Your message has been registered. </Modal.Body>
        <Modal.Footer id='mainModal' />
      </Modal>

      <Modal show={props.showForm} onHide={handleClose} centered>
        <Modal.Header id='mainModalTitle' closeButton>
          <Modal.Title>Is something not working?</Modal.Title>
        </Modal.Header>
        <Modal.Body id='textModal'>
          <Form>
            <Form.Group className="row m-1" controlId="formBasicProblem">
              <Form.Label className="col-12">Please, describe the problem</Form.Label>
              <Form.Control className="col formtesto" style={{ resize: "none" }} value={value} onChange={ev => setValue(ev.target.value)} as="textarea" rows={10} type="text" placeholder="Type here to describe the problem..." required />
            </Form.Group>
            <Form.Text className="text-muted">
              We will use your data to improve our services. We will never share your data with anyone else.
            </Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer id='mainModal'>
          <Button className='main-button-color' id="buttonSubmit" type="submit" 
            disabled={value.length === 0}
            onClick={() => {
              setFeedback(true);
              props.setShowForm(false);
              setTimeout(function () { setFeedback(false) }, 3000);
              setValue("");
            }}>Submit</Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function ModalCompleted(props) {

  const navigate = useNavigate();
  const handleClose = () => navigate("/exercise");

  return (
    <Modal show={props.show} centered backdrop="static">
      <Modal.Header id='mainModalTitle' className='d-flex align-items-center justify-content-center'>
        <Modal.Title>
          <div className='d-flex flex-row'><>{partyPopperLeft}&nbsp;&nbsp;Session completed&nbsp;&nbsp;{partyPopperRight}</></div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id='textModal' className='d-flex flex-column align-items-center'>
        
        {
          props.totalPoints !== undefined ?
            <>
              {props.totalPoints.current === 0 ?
                <p>Unfortunately, you earned 0 points in this session :&#40;</p>
                :
                <>
                  <h3>Congratulations!!!</h3>
                  <p>You earned {props.totalPoints.current} points in this session!</p>
                </>
              }
            </>
          :
            <>
              {props.points === 0 ?
                <p>Unfortunately, you earned 0 points in this session :&#40;</p>
                :
                <>
                  <h3>Congratulations!!!</h3>
                  <p>You earned {props.points} points in this session!</p>
                </>
              }
            </>
        }

      </Modal.Body>

      <Modal.Footer id='mainModal' style={{ "justifyContent": "center" }}>
        <Button className='main-button-color' onClick={() => { navigate("/exercise"); }}>Return to the exercise menu</Button>
      </Modal.Footer>
    </Modal>
  );
}


export { ModalWebcam, ModalError, ModalEnd, ModalSkip, ModalWarning, ModalForm, ModalCompleted };