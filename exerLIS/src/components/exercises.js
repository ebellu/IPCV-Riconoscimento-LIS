import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { correctAnim, wrongAnim, exerciseIcon, guessIcon, signIcon, fingerspellIcon, checkCorrectIcon, wrongIcon, letterIndicatorIcon, wellDoneIcon, partyPopperLeft, partyPopperRight, revealedIcon, revealedAnim } from './icons';
import Webcam from "react-webcam";
import { useState } from 'react';
import { FirstTitle } from './exerLISViews.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { GuessTheSignButtons, SignTheWordButtons, FingerspellTheWordButtons } from './Buttons';
import Spinner from 'react-bootstrap/Spinner';
import { AlphabetLite, alphabet } from './alphabet';
import { ModalWarning, ModalCompleted, ModalError, ModalForm } from './Modal';
import { topics } from './data';




function GuessTheSignExercise(props) {
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [guessed, setGuessed] = useState(false);
    const [points, setPoints] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [lastOne, setLastOne] = useState(false);
    const [paused, setPaused] = useState(false);
    const [revealing, setRevealing] = useState(false);
    const [showRevealing, setShowRevealing] = useState(false);

    const [userPoints, setUserPoints] = useState(0);

    const location = useLocation();

    useEffect(() => {
        setGuessed(false);

        const getUserPoints = async () => {
            try {
                fetch("http://localhost:3001/userpoints/")
                    .then(res => res.json())
                    .then(result =>
                        setUserPoints(result.map(json => json.points)[0])
                    ).catch("Error " + console.log);
            } catch (error) {
                console.log("Error", error);
            }
        };
        getUserPoints();

    }, [props.currentExercise]);

    const incrementUserPoints = async () => {
        try {
            fetch("http://localhost:3001/userpoints/")
                .then(res => res.json())
                .then(result => {
                    try {
                        fetch("http://localhost:3001/userPoints/0", {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: 0, points: result.map(json => json.points)[0] + 5 })
                        }).then(setUserPoints(result.map(json => json.points)[0] + 5));
                    } catch (error) {
                        console.log("error", error);
                    }
                }
                ).catch("Error " + console.log);
        } catch (error) {
            console.log("Error", error);
        }

        try {
            fetch("http://localhost:3001/donewords/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: 0, word: props.currentExercise.word.toLowerCase(), type: location.pathname.split("/").pop() })
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        if (paused)
            vidRef.current.play();
        else
            vidRef.current.pause();
    }

    const [shouldShowModal, setShouldShowModal] = useState(true);
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

    }, [shouldShowModal]);

    return (
        <>
            {shouldShowModal ?
                <ModalWarning text={"If you reveal the word, you will not earn any points. Are you sure you want to continue?"} setShowRevealing={setShowRevealing} showRevealing={showRevealing} setRevealing={setRevealing} />
                :
                <></>
            }
            <ModalCompleted show={completed} points={points} totalPoints={props.totalPoints} />
            <Col className='col-12 d-flex flex-column prevent-y-scroll'>

                <FirstTitle title="Exercise" title2="Guess the sign" icon1={exerciseIcon} icon2={guessIcon} buttons={<GuessTheSignButtons userPoints={userPoints} setShowRevealing={setShowRevealing} revealing={revealing} setRevealing={setRevealing} f handlePlayVideo={handlePlayVideo} numberOfExercises={location.state.numberOfExercises} setCompleted={setCompleted} setWrong={setWrong} correct={correct} completed={completed} setPaused={setPaused} paused={paused} setCurrentExercise={props.setCurrentExercise} currentExercise={props.currentExercise} />} />
                <Row className='subtitle py-2 headerTitle'>
                    <Col className='col-6 ps-5 d-flex'>
                        {!revealing &&
                            <h4 className='my-auto ps-5'>Your guess:</h4>
                        }
                        {revealing &&
                            <h4 className='my-auto ps-5'>This sign means:</h4>
                        }
                        &nbsp;&nbsp;
                        <EnterGuessForm totalPoints={props.totalPoints} setTotalPoints={props.setTotalPoints} incrementUserPoints={incrementUserPoints} revealing={revealing} paused={paused} handlePlayVideo={handlePlayVideo} setPaused={setPaused} setLastOne={setLastOne} number={props.currentExercise.number} numberOfExercises={location.state.numberOfExercises} word={props.currentExercise.word} guessed={guessed} setGuessed={setGuessed} setCorrect={setCorrect} setWrong={setWrong} wrong={wrong} />
                    </Col>
                    <Col className='col-6 py-2 pe-5 d-flex justify-content-end'>
                        <h4 className='my-auto me-4 pe-5'>Exercise {props.currentExercise.number} of {location.state.numberOfExercises}</h4>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-end flex-grow-1'>
                    <Col className='col-12 d-flex justify-content-end'>
                        <div className="me-5">
                            <Video vidRef={vidRef} vid={props.currentExercise.video} />
                            <div className='d-flex justify-content-center overlap-conversate'>
                                {(guessed || revealing) &&
                                    <Card className='hint-guessed'>
                                        <Card.Body>
                                            <h1>{props.currentExercise.word}</h1>
                                        </Card.Body>
                                    </Card>}
                                {!guessed && !revealing &&
                                    <Card className='hint-normal'>
                                        <Card.Body>
                                            <h1>?</h1>
                                        </Card.Body>
                                    </Card>}
                            </div>
                        </div>
                        <div className={wrong && !completed ? 'col-3 align-items-center justify-content-center d-flex flex-column mt-5' : 'col-3 align-items-center d-flex flex-column mt-5'}>
                            {correct && !completed &&
                                <>
                                    <img id='imggg' src={props.currentExercise.img} className='mb-5 tip-image border border-dark' />
                                    {/*<h3 className='pt-2'>{props.currentExercise.word}</h3>*/}
                                    <Correct lastOne={lastOne} setPoints={setPoints} setCurrentExercise={props.setCurrentExercise} setCorrect={setCorrect} setCompleted={setCompleted} />
                                </>
                            }
                            {wrong && !completed &&
                                <Wrong className='d-flex' setWrong={setWrong} />
                            }
                            {completed &&
                                <>
                                    <img id='imggg' src={props.currentExercise.img} className='mb-5 tip-image border border-dark' />
                                    {/*<h3 className='pt-2'>{props.currentExercise.word}</h3>*/}
                                </>
                            }
                            {revealing && !completed &&
                                <>
                                    <img id='imggg' src={props.currentExercise.img} className='mb-5 tip-image border border-dark' />
                                    {/*<h3 className='pt-2'>{props.currentExercise.word}</h3>*/}
                                    <Revealed number={props.currentExercise.number} setCurrentExercise={props.setCurrentExercise} setRevealing={setRevealing} setCompleted={setCompleted} numberOfExercises={location.state.numberOfExercises} />
                                </>
                            }
                        </div>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

/*OR => https://github.com/cookpete/react-player*/
const Video = (props) => {
    return (
        <video ref={props.vidRef} className="video-signs-conversate" src={props.vid} type="video/mp4" autoPlay loop muted />
    );
};

function EnterGuessForm(props) {
    const [guess, setGuess] = useState('');

    useEffect(() => {
        setGuess('');
    }, [props.word]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (guess.toLowerCase() === props.word.toLowerCase()) {
            props.incrementUserPoints();
            if (props.totalPoints !== undefined) {
                props.totalPoints.current += 5;
            }
            props.setCorrect(true);
            props.setWrong(false);
            props.setGuessed(true);
            if (props.paused) {
                props.handlePlayVideo();
            }
            props.setPaused(false);
            if (props.number === props.numberOfExercises) {
                props.setLastOne(true);
            }
        } else {
            props.setWrong(true);
            props.setCorrect(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className='d-flex flex-row align-items-center'>
                {!props.guessed && !props.revealing &&
                    <>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Type here the word..."
                                autocomplete="off"
                                className="align-text-end"
                                disabled={props.guessed}
                                required
                                value={guess}
                                onChange={ev => {
                                    setGuess(ev.target.value);
                                    if (props.wrong) {
                                        props.setWrong(false);
                                    }

                                }}
                            />
                        </Form.Group>
                        &nbsp;&nbsp;
                        <Button className='variant-main-button-color' type="submit">
                            Check
                            &nbsp;&nbsp;
                            <>{checkCorrectIcon}</>
                        </Button>
                    </>
                }
                {(props.guessed || props.revealing) &&
                    <>
                        &nbsp;
                        <h3 className='my-0'>{props.word.toUpperCase()}</h3>
                    </>
                }
            </Form>
        </>
    );
}

function Correct(props) {
    const location = useLocation();

    return (
        <Card className='feedback-welldone'>
            <Card.Body>
               <Card.Title style={{ fontWeight: 'bold' /*, color: 'black'*/ }}>Well done!</Card.Title>
                <div className='d-flex justify-content-center' style={{"overflow":"hidden"}}>
                        {correctAnim}
                </div>
                <Card.Text>
                    <div className=' py-2 d-flex flex-column align-items-center justify-content-center' /*style={{ color: 'black' }}*/>
                        
                        <h7>&nbsp;&nbsp;&nbsp;+5 POINTS&nbsp;&nbsp;&nbsp;</h7>
                        
                    </div>
                    <Button className='correctCard' /*style={{ color: 'black' }}*/
                        onClick={() => {
                            props.setCorrect(false);
                            props.setPoints((curr) => curr + 5);
                            if (!props.lastOne) {
                                props.setCurrentExercise((curr) => curr + 1);
                            } else {
                                props.setCompleted(true);
                            }
                            if ((location.pathname.split("/").pop() === "fingerspelltheword" || location.pathname.split("/").pop() === "alltogether") && !props.lastOne)
                                props.setArrowVisibility(true);
                        }}>Continue</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function Wrong() {
    return (
        <Card className='feedback-wrong'>
            <Card.Body >
                <Card.Title style={{ fontWeight: 'bold' /*, color: 'black'*/ }}>Wrong sign!</Card.Title>
                <Card.Text className='d-flex flex-column align-items-center'>
                    <div className='d-flex flex-column pt-3'>
                        {wrongAnim}
                        <p className='pt-4 mb-0'>Retry!</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function Revealed(props) {
    const location = useLocation();

    return (
        <Card className='feedback-revealed '>
            <Card.Body>
                <Card.Title>Revealed</Card.Title>
                <div className='d-flex justify-content-center ps-3'>
                    {revealedAnim}
                </div>
                <Card.Text>
                    <div className=' py-2 d-flex flex-row align-items-center justify-content-center'>
                        + 0 POINTS
                    </div>
                    <Button className='revealedCard'
                     onClick={() => {
                        if (props.number < props.numberOfExercises) {
                            props.setCurrentExercise((curr) => curr + 1);
                            props.setRevealing(false);
                            if (location.pathname.split("/").pop() !== "guessthesign")
                                props.setLoader(true);
                        }
                        else {
                            props.setCompleted(true);
                            //props.setRevealing(false);
                        }
                    }}>Continue</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}





function SignTheWordExercise(props) {
    const location = useLocation();
    const [correct, setCorrect] = useState(false);
    const [guessed, setGuessed] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [lastOne, setLastOne] = useState(false);
    const [revealing, setRevealing] = useState(false);
    const [points, setPoints] = useState(0);
    const [loader, setLoader] = useState(true);
    const [paused, setPaused] = useState(false);
    const [show, setShow] = useState(false);
    const [showRevealing, setShowRevealing] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        setGuessed(false);
        setPaused(false);

        const getUserPoints = async () => {
            try {
                fetch("http://localhost:3001/userpoints/")
                    .then(res => res.json())
                    .then(result =>
                        setUserPoints(result.map(json => json.points)[0])
                    ).catch("Error " + console.log);
            } catch (error) {
                console.log("Error", error);
            }
        };
        getUserPoints();

    }, [props.currentExercise]);

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);

        //VERY IMPORTANT
        return () => {
            document.removeEventListener("keydown", detectKeyDown, true);
        }
    }, [showForm, props.currentExercise]);


    const incrementUserPoints = async () => {
        try {
            fetch("http://localhost:3001/userpoints/")
                .then(res => res.json())
                .then(result => {
                    try {
                        fetch("http://localhost:3001/userPoints/0", {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: 0, points: result.map(json => json.points)[0] + 5 })
                        }).then(setUserPoints(result.map(json => json.points)[0] + 5));
                    } catch (error) {
                        console.log("error", error);
                    }
                }
                ).catch("Error " + console.log);
        } catch (error) {
            console.log("Error", error);
        }

        try {
            fetch("http://localhost:3001/donewords/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: 0, word: props.currentExercise.word.toLowerCase(), type: location.pathname.split("/").pop() })
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    let detectKeyDown = (e) => {
        if (!showForm) {
            //CORRECT
            if (e.key === "c") {
                incrementUserPoints();
                if (props.totalPoints !== undefined) {
                    props.totalPoints.current += 5;
                }
                if (props.currentExercise.number < location.state.numberOfExercises) {
                    setCorrect(true);
                    setGuessed(true);
                    setWrong(false);
                }
                else {
                    setLastOne(true);
                    setCorrect(true);
                    setGuessed(true);
                    setWrong(false);
                }
            }
            //WRONG
            if (e.key === "w") {
                setWrong(true);
                setCorrect(false);
            }
            //SHOW MODAL ERROR: USER NOT ON SCREEN CAMERA
            if (e.key === "e") {
                setShow(true);
            }
            //RESET
            if (e.key === "r") {
                setWrong(false);
                setCorrect(false);
                setCompleted(false);
                setGuessed(false);
                setShow(false);
            }
        }
    }

    let handleUserMedia = () => {
        setLoader(false);
    };

    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        if (paused)
            vidRef.current.play();
        else
            vidRef.current.pause();
    }

    const [shouldShowModal, setShouldShowModal] = useState(true);
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

    }, [shouldShowModal]);

    return (
        <>
            <ModalError setShow={setShow} show={show} />
            <ModalForm setShowForm={setShowForm} showForm={showForm} />
            {shouldShowModal ?
                <ModalWarning text={"If you reveal the sign, you will not earn any points. Are you sure you want to continue?"} setLoader={setLoader} setShowRevealing={setShowRevealing} showRevealing={showRevealing} setRevealing={setRevealing} />
                :
                <></>
            }
            <ModalCompleted show={completed} points={points} totalPoints={props.totalPoints} />
            <Col className='col-12 d-flex flex-column prevent-y-scroll'>
                <FirstTitle title="Exercise" title2="Sign the word" icon1={exerciseIcon} icon2={signIcon} buttons={<SignTheWordButtons userPoints={userPoints} setShowRevealing={setShowRevealing} revealing={revealing} setRevealing={setRevealing} handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setCompleted={setCompleted} setWrong={setWrong} correct={correct} completed={completed} setCurrentExercise={props.setCurrentExercise} currentExercise={props.currentExercise} numberOfExercises={location.state.numberOfExercises} />} />
                <Row className='subtitle py-2 headerTitle'>
                    <Col className='col-9 ps-5 d-flex'>
                        <h4 className='my-auto ms-5'>Topic: <b>{props.currentExercise.topic.toUpperCase()}</b></h4>
                        <h4 className='my-auto mx-4'>
                            {topics.filter(i => i.topic === props.currentExercise.topic)[0].icon}
                        </h4>
                        <h4 className='my-auto px-2'>Word to sign: <b>{props.currentExercise.word.toUpperCase()}</b></h4>
                    </Col>
                    <Col className='col-3 py-2 pe-5 d-flex justify-content-end'>
                        <h4 className='my-auto me-4 pe-5'>Exercise {props.currentExercise.number} of {location.state.numberOfExercises}</h4>
                    </Col>
                </Row>
                <Row className='justify-content-center flex-grow-1'>
                    {!revealing &&
                        <>
                            <Col className='col-2' />
                            <Col className='col-7 d-flex flex-column justify-content-center'>
                                {loader && <Spinner className="align-self-center" animation="border" />}
                                <Webcam className='video-signs-conversate' onUserMedia={() => handleUserMedia()} mirrored={true} audio={false}
                                    style={loader ? { display: "none" } : { display: "" }}
                                    videoConstraints={videoConstraints}
                                />
                                <div className='d-flex overlap-conversate justify-content-center'>
                                    {!loader && guessed &&
                                        <Card className='hint-guessed'>
                                            <Card.Body>
                                                <h1>{props.currentExercise.word}</h1>
                                            </Card.Body>
                                        </Card>}
                                    {!loader && !guessed &&
                                        <Card className='hint-normal'>
                                            <Card.Body>
                                                <h1>{props.currentExercise.word}</h1>
                                            </Card.Body>
                                        </Card>}
                                </div>
                            </Col>
                            <Col className='col-3 pe-4 d-flex flex-column align-items-center mt-5'>
                            <img id='imggg' src={props.currentExercise.img} className='mb-5 tip-image border border-dark' />
                                    {/*<h3 className='pt-2'>{props.currentExercise.word}</h3>*/}
                                <Row className="pt-1">
                                    {correct && !completed &&
                                        <Correct lastOne={lastOne} setPoints={setPoints} setCurrentExercise={props.setCurrentExercise} setCorrect={setCorrect} setCompleted={setCompleted} />
                                    }
                                    {wrong && !completed &&
                                        <Wrong setWrong={setWrong} />
                                    }
                                </Row>
                                {!loader &&
                                    <div className="col d-flex flex-column justify-content-end">
                                        Our AI-system is detecting your signs. <br />
                                        <p>If something is not working please <a style={{color:"#415E39"}} className='' role='button' onClick={() => {
                                            setShowForm(true);
                                            setShow(false);
                                            setWrong(false);
                                        }}>fill this form</a>.</p>
                                    </div>
                                }
                            </Col>
                        </>
                    }
                    {revealing &&
                        <>
                            <Col className='col-3 mx-0 px-0 d-flex justify-content-end'>
                                <div className='d-flex align-items-center justify-content-center revealing-window-size'>
                                    {loader && <Spinner className="align-self-center" animation="border" />}
                                    <Webcam onUserMedia={() => handleUserMedia()} mirrored={true} audio={false}
                                        style={loader ? { display: "none" } : { display: "" }}
                                        width={300}
                                        videoConstraints={videoConstraints} />
                                </div>
                            </Col>
                            <Col className='col-6 d-flex justify-content-center align-items-center flex-column'>
                                <div className='flex-grow-1'>
                                    <Video vidRef={vidRef} vid={props.currentExercise.video} />
                                </div>
                                <div className='d-flex justify-content-center overlap-conversate'>
                                    <Card className='hint-guessed'>
                                        <Card.Body>
                                            <h1>{props.currentExercise.word}</h1>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col className='col-3 pe-4  d-flex flex-column align-items-center mt-5'>
                               <img id='imggg' src={props.currentExercise.img} className='mb-5 tip-image border border-dark' />
                                    {/*<h3 className='pt-2'>{props.currentExercise.word}</h3>*/}
                                <Row className="pt-1">
                                    {!completed &&
                                        <Revealed setLoader={setLoader} number={props.currentExercise.number} setCurrentExercise={props.setCurrentExercise} setRevealing={setRevealing} setCompleted={setCompleted} numberOfExercises={location.state.numberOfExercises} />
                                    }
                                </Row>
                                {!loader &&
                                    <div className="col d-flex flex-column justify-content-end">
                                        Our AI-system is detecting your signs. <br />
                                        <p>If something is not working please <a style={{color:"#415E39"}} className='' role='button' onClick={() => {
                                            setShowForm(true);
                                            setShow(false);
                                            setWrong(false);
                                        }}>fill this form</a>.</p>
                                    </div>
                                }
                            </Col>
                        </>
                    }
                </Row>
            </Col>
        </>
    );
}

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "environment"
};

function splitWord(word) {
    let splitted = [];
    for (let i = 0; i < word.length; i++) {
        splitted.push(word[i].toUpperCase());
    }
    return splitted;
}

function FingerspellTheWordExercise(props) {
    const location = useLocation();
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [lastOne, setLastOne] = useState(false);
    const [points, setPoints] = useState(0);
    const [loader, setLoader] = useState(true);
    const [paused, setPaused] = useState(false);
    const [currentLetter, setCurrentLetter] = useState(0);
    const [spaces, setSpaces] = useState('');
    const [arrowVisibility, setArrowVisibility] = useState(true);
    const [show, setShow] = useState(false);
    const [revealing, setRevealing] = useState(false);
    const [checkingAlphabet, setCheckingAlphabet] = useState(false);
    const [letter, setLetter] = useState(alphabet[0]);


    const [showForm, setShowForm] = useState(false);

    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        setPaused(false);
        setCurrentLetter(0);
        setSpaces('');
        setLetter(alphabet[0]);

        const getUserPoints = async () => {
            try {
                fetch("http://localhost:3001/userpoints/")
                    .then(res => res.json())
                    .then(result =>
                        setUserPoints(result.map(json => json.points)[0])
                    ).catch("Error " + console.log);
            } catch (error) {
                console.log("Error", error);
            }
        };
        getUserPoints();

    }, [props.currentExercise]);

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);

        //VERY IMPORTANT
        return () => {
            document.removeEventListener("keydown", detectKeyDown, true);
        }
    }, [showForm, props.currentExercise]);

    const incrementUserPoints = async () => {
        try {
            fetch("http://localhost:3001/userpoints/")
                .then(res => res.json())
                .then(result => {
                    try {
                        fetch("http://localhost:3001/userPoints/0", {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: 0, points: result.map(json => json.points)[0] + 5 })
                        }).then(setUserPoints(result.map(json => json.points)[0] + 5));
                    } catch (error) {
                        console.log("error", error);
                    }
                }
                ).catch("Error " + console.log);
        } catch (error) {
            console.log("Error", error);
        }

        try {
            fetch("http://localhost:3001/donewords/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: 0, word: props.currentExercise.word.toLowerCase(), type: location.pathname.split("/").pop() })
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    let detectKeyDown = (e) => {
        if (!showForm) {
            //CORRECT LETTER
            if (e.key === "c") {
                setCurrentLetter((curr) => curr += 1);
                setSpaces((curr) => curr += "\xa0\xa0\xa0\xa0\xa0");
            }
            if (e.key === "f") {
                incrementUserPoints();
                if (props.totalPoints !== undefined) {
                    props.totalPoints.current += 5;
                }
                setCurrentLetter((curr) => curr += 1);
                setArrowVisibility(false);
                if (props.currentExercise.number < location.state.numberOfExercises) {
                    setCorrect(true);
                    setWrong(false);
                }
                else {
                    setLastOne(true);
                    setCorrect(true);
                    setWrong(false);
                }
            }
            //BACK LETTER
            if (e.key === "b") {
                setCurrentLetter((curr) => curr -= 1);
            }
            //ERROR
            if (e.key === "e") {
                setShow(true);
            }
            //WRONG
            if (e.key === "w") {
                setWrong(true);
                setCorrect(false);
            }
            //NEXT
            if (e.key === "n") {
                props.setCurrentExercise((curr) => curr + 1);
            }
            //RESET
            if (e.key === "r") {
                setWrong(false);
                setCorrect(false);
                setCompleted(false);
                setShow(false);
            }
        }
    }

    let handleUserMedia = () => {
        setLoader(false);
    };

    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        if (paused)
            vidRef.current.play();
        else
            vidRef.current.pause();
    }

    return (
        <>
            <ModalError setShow={setShow} show={show} />
            <ModalForm setShowForm={setShowForm} showForm={showForm} />
            <ModalCompleted show={completed} points={points} totalPoints={props.totalPoints} />
            <Col className='col-12 d-flex flex-column prevent-y-scroll'>
                <FirstTitle title="Exercise" title2="Fingerspell the word" icon1={exerciseIcon} icon2={fingerspellIcon} buttons={<FingerspellTheWordButtons userPoints={userPoints} setLetter={setLetter} revealing={revealing} setCheckingAlphabet={setCheckingAlphabet} checkingAlphabet={checkingAlphabet} handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setCompleted={setCompleted} setWrong={setWrong} correct={correct} completed={completed} setRevealing={setRevealing} setCurrentExercise={props.setCurrentExercise} currentExercise={props.currentExercise} numberOfExercises={location.state.numberOfExercises} />} />
                <Row className={!checkingAlphabet ? 'subtitle py-2 headerTitle' : 'subtitle py-2 headerTitle opaque'}>
                    <Col className='col-9 ps-5 d-flex'>
                        <h4 className='my-auto ms-5'>Topic: <b>{props.currentExercise.topic.toUpperCase()}</b></h4>
                        <h4 className='my-auto mx-4'>
                            {topics.filter(i => i.topic === props.currentExercise.topic)[0].icon}
                        </h4>
                        <h4 className='my-auto px-2'>Word to fingerspell: <b>{props.currentExercise.word.toUpperCase()}</b></h4>
                    </Col>
                    <Col className='col-3 py-2 pe-5 d-flex justify-content-end'>
                        <h4 className='my-auto me-4 pe-5'>Exercise {props.currentExercise.number} of {location.state.numberOfExercises}</h4>
                    </Col>
                </Row>
                {!checkingAlphabet &&
                    <Row className='justify-content-center flex-grow-1'>
                        <Col className='col-2' />
                        <Col className='col-7 d-flex flex-column justify-content-center'>
                            {loader && <Spinner className="align-self-center" animation="border" />}
                            <Webcam className='video-signs-conversate' onUserMedia={() => handleUserMedia()} mirrored={true} audio={false}
                                style={loader ? { display: "none" } : { display: "" }}
                                videoConstraints={videoConstraints} />
                            <div className='d-flex overlap-conversate justify-content-center'>
                                {!loader &&
                                    <Card className='hint-normal'>
                                        <Card.Body>
                                            <div className="">
                                                <h1 className="mono letters px-2">
                                                    {splitWord(props.currentExercise.word).map((letter, index) => {
                                                        return <Letter letter={letter} state={index < currentLetter} lastLetter={index < props.currentExercise.word.length - 1} />
                                                    })}
                                                </h1><br></br>
                                                <div className='under-letter d-flex mono px-1'>
                                                    {spaces}
                                                    {arrowVisibility && <>{letterIndicatorIcon}</>}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>}
                            </div>
                        </Col>
                        <Col className='col-3 pe-4 d-flex flex-column align-items-center mt-5'>
                            <img id='imggg' src={props.currentExercise.img} className='mb-5 tip-image border border-dark' />
                            {/*<h3 className='pt-2'>{props.currentExercise.word}</h3>*/}
                            <Row className="pt-1">
                                {correct && !completed &&
                                    <Correct setArrowVisibility={setArrowVisibility} lastOne={lastOne} setPoints={setPoints} setCurrentExercise={props.setCurrentExercise} setCorrect={setCorrect} setCompleted={setCompleted} />
                                }
                                {wrong && !completed &&
                                    <Wrong setWrong={setWrong} />
                                }
                            </Row>
                            {!loader &&
                                <div className="col d-flex flex-column justify-content-end">
                                    Our AI-system is detecting your signs. <br />
                                    <p>If something is not working please <a style={{color:"#415E39"}} className='' role='button' onClick={() => {
                                        setShowForm(true);
                                        setShow(false);
                                        setWrong(false);
                                    }}>fill this form</a>.</p>
                                </div>
                            }
                        </Col>
                    </Row>
                }
                {checkingAlphabet &&
                    <Row className='d-flex justify-content-start ms-5 ps-3 flex-grow-1'>
                        <Col className="d-flex col-7 justify-content-center flex-column">
                            <h3 className='py-2'>Choose the letter you don’t remember to see how to sign it:</h3>
                            <AlphabetLite setLetter={setLetter} letter={letter} />
                        </Col>
                        <Col className="d-flex col-5 justify-content-start flex-column">
                            <Video vidRef={vidRef} vid={letter.video} />
                            <div className='d-flex overlap justify-content-center'>
                                <Card className='hint-guessed'>
                                    <Card.Body>
                                        <h1>{letter.letter}</h1>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                }
            </Col>
        </>
    );
}

function Letter(props) {
    if (props.letter !== ' ')
        return (<><u className={props.state ? 'highlighted' : 'dull'}>{props.letter}</u>{!props.lastLetter ? '' : <>&nbsp;</>}</>);
    else
        return (<>{props.letter}</>);
}

export { GuessTheSignExercise, SignTheWordExercise, FingerspellTheWordExercise, Video, Revealed, Wrong }