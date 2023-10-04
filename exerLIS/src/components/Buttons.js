import { Button, Row, Col } from "react-bootstrap";
import {
  translationOnIcon, translationOffIcon, callOffIcon, pauseIcon, playIcon, nextIcon, previousIcon,
  littleBookIcon, endSessionIcon, littleExerciseIcon, littleWordsIcon, profileIcon, littleAlphabetIcon,
  previousVariantIcon, nextVariantIcon
} from "./icons";
import "../styles/buttons.css";
import { alphabet } from "./alphabet";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModalEnd, ModalSkip } from "./Modal";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { words } from "./data.js";

function AlphabetButtons(props) {
  const navigate = useNavigate();

  return (
    <>
      <Button className="py-0 top-buttons-width navigation-main-button-color" disabled={props.currentLetter === "A"} onClick={() => {
        props.setPaused(false);
        const newLetter = alphabet.findIndex((letter) => letter.letter === props.currentLetter) - 1;
        navigate('/learn/alphabet/'.concat(alphabet[newLetter].letter))
      }}
      >
        Previous<br></br>
        <>{previousIcon}</>
      </Button>
      {!props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(true);
          props.handlePlayVideo();
        }}>Pause<br></br>
          <>{pauseIcon}</>
        </Button>
      }
      {props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(false);
          props.handlePlayVideo();
        }}>Play<br></br>
          <>{playIcon}</>
        </Button>
      }
      <Button className="py-0 top-buttons-width navigation-main-button-color" disabled={props.currentLetter === "Z"} onClick={() => {
        props.setPaused(false);
        const newLetter = alphabet.findIndex((letter) => letter.letter === props.currentLetter) + 1;
        navigate('/learn/alphabet/'.concat(alphabet[newLetter].letter))
      }}>
        Next<br></br>
        <>{nextIcon}</>
      </Button>
    </>
  )
}


function VariantButtons(props) {
  let isDisabledPrevious = false;
  let isDisabledNext = false;
  console.log(props.currentVariantIndex, props.selectedWord.variant.length - 2);
  if (props.currentVariantIndex === -1) { isDisabledPrevious = true; }
  else if (props.currentVariantIndex >= props.selectedWord.variant.length - 2) { isDisabledNext = true; }
  return (
    <>
      <Button className="variant-main-button-color" title={"Previous variant"} disabled={isDisabledPrevious}
        onClick={() => {
          // props.setPaused(false);
          let previousVariantIndex = props.currentVariantIndex - 1;
          props.setVariant(previousVariantIndex);
          if (previousVariantIndex === -1) {
            props.setVideo(props.selectedWord.video);
          }
          else {
            props.setVideo(props.selectedWord.variant[previousVariantIndex]);
          }
        }
        }>
        <>{previousVariantIcon}</>
      </Button>
      <Button className="variant-main-button-color" title={"Next variant"} disabled={isDisabledNext}
        onClick={() => {
          //props.setPaused(false);
          let nextVariantIndex = props.currentVariantIndex + 1;
          props.setVariant(nextVariantIndex);
          props.setVideo(props.selectedWord.variant[nextVariantIndex]);
        }
        }>
        <>{nextVariantIcon}</>
      </Button>
    </>
  )
}

function WordButtons(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Button className="py-0 top-buttons-width navigation-main-button-color"  disabled={
        words.findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        }) === 0
      } onClick={() => {
        props.setPaused(false);
        let pos = words.sort(function (a, b) {
          if (a.word < b.word) {
            return -1;
          }
          if (a.word > b.word) {
            return 1;
          }
          return 0;
        }).findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        });
        props.setVariant(-1);
        let previousWord = words.find((word) => word.word === words[pos - 1].word);
        props.setVideo(previousWord.video);
        navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')).concat("/", previousWord.word));
      }
      }>
        Previous<br></br>
        <>{previousIcon}</>
      </Button>
      {!props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(true);
          props.handlePlayVideo();
        }}>Pause<br></br>
          <>{pauseIcon}</>
        </Button>
      }
      {props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(false);
          props.handlePlayVideo();
        }}>Play<br></br>
          <>{playIcon}</>
        </Button>
      }
      <Button className="py-0 top-buttons-width navigation-main-button-color" disabled={
        words.findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        }) === words.length - 1
      } onClick={() => {
        props.setPaused(false);
        let pos = words.sort(function (a, b) {
          if (a.word < b.word) {
            return -1;
          }
          if (a.word > b.word) {
            return 1;
          }
          return 0;
        }).findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        });
        let nextWord = words.find((word) => word.word === words[pos + 1].word);
        props.setVariant(-1);
        props.setVideo(nextWord.video);
        navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')).concat("/", nextWord.word));
      }
      }>
        Next<br></br>
        <>{nextIcon}</>
      </Button>
    </>
  )
}

function TopicButtons(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Button className="py-0 top-buttons-width navigation-main-button-color" disabled={
        words.filter((word) => word.topic === props.topic).findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        }) === 0
      } onClick={() => {
        props.setPaused(false);
        let topicWords = words.filter((word) => word.topic === props.topic);
        let pos = topicWords.sort(function (a, b) {
          if (a.topic !== "Days of the week" || b.topic !== "Days of the week") {
            if (a.word < b.word) {
              return -1;
            }
            if (a.word > b.word) {
              return 1;
            }
            return 0;
          }
        }).findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        });
        let previousWord = topicWords[pos - 1];
        props.setVariant(-1);
        props.setVideo(previousWord.video);
        navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')).concat("/", previousWord.word));
      }
      }>
        Previous<br></br>
        <>{previousIcon}</>
      </Button>
      {!props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(true);
          props.handlePlayVideo();
        }}>Pause<br></br>
          <>{pauseIcon}</>
        </Button>
      }
      {props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(false);
          props.handlePlayVideo();
        }}>Play<br></br>
          <>{playIcon}</>
        </Button>
      }
      <Button className="py-0 top-buttons-width navigation-main-button-color" disabled={
        words.filter((word) => word.topic === props.topic).findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        }) === words.filter((word) => word.topic === props.topic).length - 1
      } onClick={() => {
        props.setPaused(false);
        let topicWords = words.filter((word) => word.topic === props.topic);
        let pos = topicWords.sort(function (a, b) {
          if (a.topic !== "Days of the week" || b.topic !== "Days of the week") {
            if (a.word < b.word) {
              return -1;
            }
            if (a.word > b.word) {
              return 1;
            }
            return 0;
          }
        }).findIndex((word) => {
          if (word.word === props.word) {
            return true;
          }
        });
        let nextWord = topicWords[pos + 1];
        props.setVariant(-1);
        props.setVideo(nextWord.video);
        navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')).concat("/", nextWord.word));
      }
      }>
        Next<br></br>
        <>{nextIcon}</>
      </Button>
    </>
  )
}

function TryToSignButtons(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {!props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(true);
          props.handlePlayVideo();
        }}>Pause<br></br>
          <>{pauseIcon}</>
        </Button>
      }
      {props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(false);
          props.handlePlayVideo();
        }}>Play<br></br>
          <>{playIcon}</>
        </Button>
      }

      {props.section !== "Alphabet" &&
        <Button className="py-0 top-buttons-width navigation-main-button-color" onClick={() => {
          if(props.variant==null){
            
          navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')))
        }
          else {
          let loc= location.pathname.substring(0, location.pathname.lastIndexOf('/'));
          navigate( loc , {state: {variantIndex: props.variant}})}
        }}>
          Return to the word<br></br>
          <>{littleWordsIcon}</>
        </Button>}
      {props.section === "Alphabet" &&
        <Button className="py-0 top-buttons-width navigation-main-button-color" onClick={() => {
          navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')));
        }}>
          Return to the letter<br></br>
          <>{littleAlphabetIcon}</>
        </Button>}
    </>
  )
}

function SignTheWordButtons(props) {
  const [show, setShow] = useState(false);

  // skipModal informations
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [isLastToSkip, setIsLastToSkip] = useState(false);

  const [shouldShowModal, setShouldShowModal] = useState(true);
  const [shouldShowSkipModal, setShouldShowSkipModal] = useState(true);

  useEffect(() => {
    const getModalSetting = async () => {
      try {
        fetch("http://localhost:3001/modalsetting/")
          .then(res => res.json())
          .then(result =>
            setShouldShowModal(result.map(json => json.warning)[0])
          ).catch("Error " + console.log);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getModalSetting();

    const getSkipSetting = async () => {
      try {
        fetch("http://localhost:3001/modalsetting/")
          .then(res => res.json())
          .then(result =>
            setShouldShowSkipModal(result.map(json => json.skip)[0])
          ).catch("Error " + console.log);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getSkipSetting();

  });

  return (
    <>
      <ModalEnd setShow={setShow} show={show} navigateTo={'/exercise'} text={<>Are you sure you want to exit the exercise session?</>} />
      <UserLevel userPoints={props.userPoints} />
      {props.revealing &&
        <>
          {!props.paused &&
            <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
              props.setPaused(true);
              props.handlePlayVideo();
            }}>Pause<br></br>
              <>{pauseIcon}</>
            </Button>
          }
          {props.paused &&
            <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
              props.setPaused(false);
              props.handlePlayVideo();
            }}>Play<br></br>
              <>{playIcon}</>
            </Button>
          }
        </>
      }

      {isLastToSkip ?
        shouldShowSkipModal &&
        <ModalSkip setShow={setShowSkipModal} show={showSkipModal} text={<>Are you sure you want to skip this exercise ? <br></br>You won't be able to come back  and this is the last exercise of the session!</>} setCompleted={props.setCompleted} setWrong={props.setWrong} isLastToSkip={isLastToSkip} />
        :
        shouldShowSkipModal &&
        <ModalSkip setShow={setShowSkipModal} show={showSkipModal} text={<>Are you sure you want to skip this exercise?<br></br>You won't be able to come back.</>} setCurrentExercise={props.setCurrentExercise} setWrong={props.setWrong} isLastToSkip={isLastToSkip} />
      }

      <Button className="py-0 navigation-main-button-color" disabled={props.revealing || props.completed || props.correct} onClick={() => {
        if (props.currentExercise.number < props.numberOfExercises) {
          // there is a next exercise
          // show the normal skip modal
          setIsLastToSkip(false);
        }
        else {
          // last exercise to skip
          setIsLastToSkip(true);
        }

        if (shouldShowSkipModal) {
          setShowSkipModal(true);
        }
        else {
          if (props.currentExercise.number < props.numberOfExercises) {
            // there are others exercises available
            props.setCurrentExercise((curr) => curr + 1)
          } else {
            // last to skip
            props.setCompleted(true)
          }
          if (props.setPaused !== undefined) {
            props.setPaused(false)
          }
          props.setWrong(false)
        }

      }}>Skip word<br></br>
        <>{nextIcon}</>
      </Button>
      <Button className="py-0 navigation-main-button-color" disabled={props.revealing || props.completed || props.correct} onClick={() => {
        if (shouldShowModal) {
          props.setShowRevealing(true);
        } else {
          props.setRevealing(true);
          props.setLoader(true);
        }

        props.setWrong(false);

      }}>Reveal the sign<br></br>
        <>{littleBookIcon}</>
      </Button>
      <Button className="py-0 endButton" disabled={props.completed} onClick={() => {
        setShow(true);
      }}>End session<br></br>
        <>{endSessionIcon}</>
      </Button>
    </>
  );
}

function GuessTheSignButtons(props) {
  const [show, setShow] = useState(false);

  // skipModal informations
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [isLastToSkip, setIsLastToSkip] = useState(false);

  const [shouldShowModal, setShouldShowModal] = useState(true);
  const [shouldShowSkipModal, setShouldShowSkipModal] = useState(true);
  useEffect(() => {
    const getModalSetting = async () => {
      try {
        fetch("http://localhost:3001/modalsetting/")
          .then(res => res.json())
          .then(result =>
            setShouldShowModal(result.map(json => json.warning)[0])
          ).catch("Error " + console.log);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getModalSetting();

    const getSkipSetting = async () => {
      try {
        fetch("http://localhost:3001/modalsetting/")
          .then(res => res.json())
          .then(result =>
            setShouldShowSkipModal(result.map(json => json.skip)[0])
          ).catch("Error " + console.log);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getSkipSetting();

  });

  return (
    <>
      <ModalEnd setShow={setShow} show={show} navigateTo={'/exercise'} text={<>Are you sure you want to exit the exercise session?</>} />
      <UserLevel userPoints={props.userPoints} />
      {!props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(true);
          props.handlePlayVideo();
        }}>Pause<br></br>
          <>{pauseIcon}</>
        </Button>
      }
      {props.paused &&
        <Button className="py-0 play-pause navigation-main-button-color" onClick={() => {
          props.setPaused(false);
          props.handlePlayVideo();
        }}>Play<br></br>
          <>{playIcon}</>
        </Button>
      }

      {isLastToSkip ?
        shouldShowSkipModal &&
        <ModalSkip setShow={setShowSkipModal} show={showSkipModal} text={<>Are you sure you want to skip this exercise?<br></br>You won't be able to come back  and this is the last exercise of the session.</>} setCompleted={props.setCompleted} setWrong={props.setWrong} isLastToSkip={isLastToSkip} setPaused={props.setPaused} />
        :
        shouldShowSkipModal &&
        <ModalSkip setShow={setShowSkipModal} show={showSkipModal} text={<>Are you sure you want to skip this exercise?<br></br>You won't be able to come back.</>} setCurrentExercise={props.setCurrentExercise} setWrong={props.setWrong} isLastToSkip={isLastToSkip} setPaused={props.setPaused} />
      }

      <Button className="py-0 navigation-main-button-color" disabled={props.revealing || props.completed || props.correct} onClick={() => {
        if (props.currentExercise.number < props.numberOfExercises) {
          // there are other exercises available
          // show the normal skip modal
          setIsLastToSkip(false);
        }
        else {
          // last exercise to skip
          setIsLastToSkip(true);
        }
        if (shouldShowSkipModal) {
          setShowSkipModal(true);
        }
        else {
          if (props.currentExercise.number < props.numberOfExercises) {
            // there are others exercises available
            props.setCurrentExercise((curr) => curr + 1)
          } else {
            // last to skip
            props.setCompleted(true)
          }
          if (props.setPaused !== undefined) {
            props.setPaused(false)
          }
          props.setWrong(false)
        }
      }}>Skip word<br></br>
        <>{nextIcon}</>
      </Button>
      <Button className="py-0 navigation-main-button-color" disabled={props.revealing || props.completed || props.correct} onClick={() => {
        props.setWrong(false);
        if (shouldShowModal) {
          props.setShowRevealing(true);
        } else {
          props.setRevealing(true);
        }

        if (props.paused) {
          props.setPaused(false);
          props.handlePlayVideo();
        }
      }}>Reveal the word<br></br>
        <>{littleBookIcon}</>
      </Button>
      <Button className="py-0 endButton" disabled={props.completed} onClick={() => {
        setShow(true);
      }}>End session<br></br>
        <>{endSessionIcon}</>
      </Button>
    </>
  );
}

function FingerspellTheWordButtons(props) {
  const [show, setShow] = useState(false);

  // skipModal informations
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [isLastToSkip, setIsLastToSkip] = useState(false);

  const [shouldShowSkipModal, setShouldShowSkipModal] = useState(true);
  useEffect(() => {
    const getSkipSetting = async () => {
      try {
        fetch("http://localhost:3001/modalsetting/")
          .then(res => res.json())
          .then(result =>
            setShouldShowSkipModal(result.map(json => json.skip)[0])
          ).catch("Error " + console.log);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getSkipSetting();

  });

  return (
    <>
      <ModalEnd setShow={setShow} show={show} navigateTo={'/exercise'} text={<>Are you sure you want to exit the exercise session?</>}></ModalEnd>
      <UserLevel userPoints={props.userPoints} />

      {isLastToSkip ?
        shouldShowSkipModal &&
        <ModalSkip setShow={setShowSkipModal} show={showSkipModal} text={<>Are you sure you want to skip this exercise?<br></br>You won't be able to come back  and this is the last exercise of the session.</>} setCompleted={props.setCompleted} setWrong={props.setWrong} isLastToSkip={isLastToSkip} setPaused={props.setPaused} setCheckingAlphabet={props.setCheckingAlphabet} />
        :
        shouldShowSkipModal &&
        <ModalSkip setShow={setShowSkipModal} show={showSkipModal} text={<>Are you sure you want to skip this exercise?<br></br>You won't be able to come back.</>} setCurrentExercise={props.setCurrentExercise} setWrong={props.setWrong} isLastToSkip={isLastToSkip} setPaused={props.setPaused} setCheckingAlphabet={props.setCheckingAlphabet} />
      }

      <Button className="py-0 navigation-main-button-color" disabled={props.revealing || props.completed || props.correct} onClick={() => {
        if (props.currentExercise.number < props.numberOfExercises) {
          // there are other exercises available
          // show the normal skip modal
          setIsLastToSkip(false);
        }
        else {
          // last exercise to skip
          setIsLastToSkip(true);
        }
        if (shouldShowSkipModal) {
          setShowSkipModal(true);
        }
        else {
          if (props.currentExercise.number < props.numberOfExercises) {
            // there are others exercises available
            props.setCurrentExercise((curr) => curr + 1)
          } else {
            // last to skip
            props.setCompleted(true)
          }
          if (props.setPaused !== undefined) {
            props.setPaused(false)
          }
          if (props.setCheckingAlphabet !== undefined) {
            props.setCheckingAlphabet(false)
          }
          props.setWrong(false)
        }
      }}>Skip word<br></br>
        <>{nextIcon}</>
      </Button>
      <Button className="py-0 top-buttons-width-large navigation-main-button-color" disabled={props.revealing || props.completed || props.correct} onClick={() => {
        props.setCheckingAlphabet((s) => !s);
        props.setWrong(false);
        props.setLoader(true);
      }}>
        {!props.checkingAlphabet &&
          <>
            Check the alphabet<br></br>
            <>{littleBookIcon}</>
          </>
        }
        {props.checkingAlphabet &&
          <>
            Return to the exercise<br></br>
            <>{littleExerciseIcon}</>
          </>
        }
      </Button>
      <Button className="py-0 endButton" disabled={props.completed} onClick={() => {
        setShow(true);
      }}>End session<br></br>
        <>{endSessionIcon}</>
      </Button>
    </>
  );
}

function UserLevel(props) {
  return (
    <>
      {
        props.inSidebar ?
          <>
            {/* THIS IS THE USERLEVEL INSIDE THE SIDEBAR */}
            <div className="user-level d-flex align-items-center me-5 userLevelSidebarColor" style={{ "paddingLeft": ".5em" }}>
              <div className='align-self-center pe-1' style={{ "opacity": "80%" }}> {profileIcon} </div>
              <div className='flex-column userLevelSidebar' style={{ "width": "55%" }}>
                <Row>
                  <Col className="">
                    <div className="my-auto" style={{ "textAlign": "center", "font-size": "16px" }}>John Doe</div>
                  </Col>
                  <Col className="">
                    <div className="my-auto" style={{ "textAlign": "center", "font-size": "16px" }}>john.doe@email.com</div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="userLevelSidebar" style={{ "paddingTop": "1.5em", "paddingLeft": ".9em", "width": "94%" }}>
              <Row>
                <Col className="d-flex justify-content-start">
                  <div className="my-auto" style={{ "font-size": "16px" }}>Level 3</div>
                </Col>
                <Col className="d-flex justify-content-end">
                  <div className="my-auto" style={{ "font-size": "16px" }}>{props.userPoints}/300</div>
                </Col>
              </Row>
              <div className='d-flex w-100 align-self-end'>
                <ProgressBar className='w-100' variant='success' now={100 * (props.userPoints) / 300} />
              </div>
            </div>
          </>

          :
          /* THIS IS THE USERLEVEL OUTSIDE THE SIDEBAR */
          <div className="user-level d-flex align-items-center me-5">
            <div className='align-self-center pe-1'>
              {profileIcon}
            </div>
            <div className='w-100 flex-column'>
              <Row>
                <Col className="d-flex justify-content-start">
                  <h5 className="my-auto">Level 3</h5>
                </Col>
                <Col className="d-flex justify-content-end">
                  <h5 className="my-auto">{props.userPoints}/300</h5>
                </Col>
              </Row>
              <div className='d-flex w-100 align-self-end'>
                <ProgressBar className='w-100' variant='success' now={100 * (props.userPoints) / 300} />
              </div>
            </div>
          </div>

      }
    </>
  );

}

function ConversateButtons(props) {
  return (
    <>
      {!props.translation &&
        <Button className="py-0 enable-disable navigation-main-button-color" onClick={() => {
          props.setTranslation(true);
        }
        }>
          Enable translations
          <br></br>
          <>{translationOnIcon}</>
        </Button>
      }
      {props.translation &&
        <Button className="py-0 enable-disable navigation-disable-main-button-color" onClick={() => { props.setTranslation(false); }}>
          Disable translations<br></br>
          <>{translationOffIcon}</>
        </Button>
      }
      <Button className="py-0 endButton" onClick={() => {
        props.setShow(true);
      }}>
        End conversation
        <br></br>
        <>{callOffIcon}</>
      </Button>

    </>
  )
}


export { VariantButtons, AlphabetButtons, WordButtons, TopicButtons, SignTheWordButtons, GuessTheSignButtons, FingerspellTheWordButtons, TryToSignButtons, UserLevel, ConversateButtons };