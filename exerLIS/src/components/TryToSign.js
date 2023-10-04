import { Row, Col, Button, Card } from 'react-bootstrap';
import { bookIcon, wordsIcon, topicsIcon, wellDoneIcon, alphabetIcon, partyPopperLeft, partyPopperRight, correctAnim } from './icons';
import Webcam from "react-webcam";
import { useState } from 'react';
import { FirstTitle } from './exerLISViews.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { TryToSignButtons } from './Buttons';
import Spinner from 'react-bootstrap/Spinner';
import { Wrong } from "./exercises.js";
import { ModalError, ModalForm } from './Modal.js';
import {topics} from "./data.js";

function TryToSign(props) {
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [loader, setLoader] = useState(true);
    const [paused, setPaused] = useState(false);
    const [guessed, setGuessed] = useState(false);
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);

   // const [variant, setVariant] = useState(-1);

    const location = useLocation();

   /* if(location.state.variantIndex !== undefined){
        setVariant(location.state.variantIndex);
        console.log(variant);
    }*/

    const videoConstraints = {
        width: 750,
        height: 500,
        facingMode: "user"
    };

    
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);

        //VERY IMPORTANT
        return () => {
            document.removeEventListener("keydown", detectKeyDown, true);
        }
    }, [showForm]);


    let detectKeyDown = (e) => {
        //CORRECT
        if (e.key === "c" && !showForm) {
            setCorrect(true);
            setWrong(false);
            setGuessed(true);
        }
        //WRONG
        if (e.key === "w" && !showForm) {
            setWrong(true);
            setCorrect(false);
            setGuessed(false);
        }
        if (e.key === "e" && !showForm) {
            setShow(true);
        }
        //RESET
        if (e.key === "r" && !showForm) {
            setWrong(false);
            setCorrect(false);
            setGuessed(false);
            setShow(false);
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
            <Col className='col-12 d-flex flex-column prevent-y-scroll'>
                {props.section === "Words" && props.selectedWord.variant != null &&
                    <FirstTitle title="Learn" title2="Words" icon1={bookIcon} icon2={wordsIcon} buttons={<TryToSignButtons section="Words" variant={location.state.variantIndex} handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setWrong={setWrong} correct={correct} />} />
                }
                {props.section === "Words" && props.selectedWord.variant == null &&
                    <FirstTitle title="Learn" title2="Words" icon1={bookIcon} icon2={wordsIcon} buttons={<TryToSignButtons section="Words" handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setWrong={setWrong} correct={correct} />} />
                }
                {props.section === "Topics" && props.selectedWord.variant != null &&
                    <FirstTitle title="Learn" title2="Topics" icon1={bookIcon} icon2={topicsIcon} buttons={<TryToSignButtons section="Topics" variant={location.state.variantIndex} handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setWrong={setWrong} correct={correct} />} />
                }
                {props.section === "Topics" && props.selectedWord.variant == null &&
                    <FirstTitle title="Learn" title2="Topics" icon1={bookIcon} icon2={topicsIcon} buttons={<TryToSignButtons section="Topics" handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setWrong={setWrong} correct={correct} />} />
                }
                {props.section === "Alphabet" &&
                    <FirstTitle title="Learn" title2="Alphabet" icon1={bookIcon} icon2={alphabetIcon} buttons={<TryToSignButtons section="Alphabet" handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} setLoader={setLoader} setWrong={setWrong} correct={correct} />} />
                }
                <Row className='subtitle headerTitle'>
                    <Col className='d-flex justify-content-start py-3 ps-5 col-12'>
                        {props.section === "Topics" &&
                            <>
                            {/*<h4 className='my-auto pe-5 mx-5 rightBorder'>Topic: <b>{props.selectedWord.topic.toUpperCase()}</b></h4>
                                &nbsp;&nbsp;<h4 className='my-auto'>Word to sign: <b>{props.selectedWord.word.toUpperCase()}</b></h4>*/}

                                <h4 className='my-auto ms-5'>
                                Topic: <b>{props.selectedWord.topic.toUpperCase()}</b>
                            </h4>
                            <h4 className='my-auto mx-4'>
                                {topics.filter(i => i.topic === props.selectedWord.topic)[0].icon}
                            </h4>
                            <h4 className='my-auto'>
                                Word to sign: <b>{props.selectedWord.word.toUpperCase()}</b>&nbsp;&nbsp;
                            </h4>
                            {props.selectedWord.variant != null &&
                                <h4 className='my-auto'>
                                    -&nbsp;&nbsp;Variant: <b>{location.state.variantIndex + 2}</b>&nbsp;&nbsp;
                                </h4>
                            }&nbsp;&nbsp;
                            </>}
                        {props.section === "Words" && 
                        <>
                        <h4 className='my-auto ms-5 me-1'>Word to sign: <b>{props.selectedWord.word.toUpperCase()}</b></h4>
                        &nbsp;&nbsp;
                            {props.selectedWord.variant != null &&
                                <h4 className='my-auto'>
                                    -&nbsp;&nbsp;Variant: <b>{location.state.variantIndex + 2}</b>&nbsp;&nbsp;
                                </h4>
                            }&nbsp;&nbsp;
                        </>}
                        {props.section === "Alphabet" && <h4 className='my-auto mx-5'>Letter to sign: <b>{props.selectedWord.letter.toUpperCase()}</b></h4>}
                    </Col>
                </Row>
                <Row className='d-flex justify-content-end flex-grow-1'>
                    <Col className='col-3 ps-5 d-flex justify-content-end'>
                        <div className='d-flex align-items-center justify-content-center revealing-window-size'>
                         
                            { ((location.state == null) || (location.state!=null && location.state.variantIndex == -1)) &&
                             <video ref={vidRef} className="video-signs-small" src={props.selectedWord.video} type="video/mp4" autoPlay loop muted />}
                             {location.state != null && location.state.variantIndex != null && location.state.variantIndex !== -1 && 
                             <video ref={vidRef} className="video-signs-small" src={props.selectedWord.variant[location.state.variantIndex]} type="video/mp4" autoPlay loop muted />}
                            
                        </div>
                    </Col>
                    <Col className='col-6 d-flex justify-content-center flex-column'>
                        {loader && <Spinner className="align-self-center" animation="border" />}
                        <Webcam className='video-signs-conversate' onUserMedia={() => handleUserMedia()} mirrored={true} audio={false}
                            style={loader ? { display: "none" } : { display: "" }} />
                        <div className='d-flex overlap-conversate justify-content-center'>
                            {!loader && guessed &&
                                <Card className='hint-guessed'>
                                    <Card.Body>
                                        <h1>{props.section !== "Alphabet" ? props.selectedWord.word : props.selectedWord.letter}</h1>
                                    </Card.Body>
                                </Card>}
                            {!loader && !guessed &&
                                <Card className='hint-normal'>
                                    <Card.Body>
                                        <h1>{props.section !== "Alphabet" ? props.selectedWord.word : props.selectedWord.letter}</h1>
                                    </Card.Body>
                                </Card>}
                        </div>
                    </Col>
                    <Col className={props.section !== "Alphabet" ? 'col-3 pe-4 d-flex flex-column align-items-center mt-5 ' : 'col-3 pe-4 d-flex flex-column align-items-center pt-5 mt-5'}>
                        {props.section !== "Alphabet" &&
                            <>
                                <img src={props.selectedWord.img} className='mb-5 tip-image border border-dark ' />
                                {/*<h3 className='pt-2'>{props.selectedWord.word}</h3>*/}
                            </>
                        }
                        {props.section !== "Alphabet" &&
                            <Row className="pt-1">
                                {correct &&
                                    <CorrectSign section={props.section} setGuessed={setGuessed} setCurrentExercise={props.setCurrentExercise} setCorrect={setCorrect} />
                                }
                                {wrong &&
                                    <Wrong setWrong={setWrong} />
                                }
                            </Row>
                        }
                        {props.section === "Alphabet" &&
                            <>
                                {correct &&
                                    <Row className="pt-5">
                                        <CorrectSign section={props.section} setGuessed={setGuessed} setCurrentExercise={props.setCurrentExercise} setCorrect={setCorrect} />
                                    </Row>
                                }
                                {wrong &&
                                    <Row className="pt-5 mt-5">
                                        <Wrong setWrong={setWrong} />
                                    </Row>
                                }
                            </>
                        }

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
            </Col>
        </>
    );
}
/*
<Card.Title className='d-flex flex-row align-items-center justify-content-center' style={{fontWeight:'bold',color:'black'}}>
                    {partyPopperLeft}&nbsp;&nbsp;&nbsp;Well done!&nbsp;&nbsp;&nbsp;{partyPopperRight}
                </Card.Title>
                */
function CorrectSign(props) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Card className='feedback-welldone-try'>
            <Card.Body>
                <Card.Title className='d-flex flex-row align-items-center justify-content-center' style={{ fontWeight: 'bold'/*, color: 'black'*/ }}>
                    Well done!
                </Card.Title>
                <div className='d-flex justify-content-center' style={{"overflow": "hidden"}}>
                        {correctAnim}
                </div>
                <Card.Text>
                    <Button className='mt-2 correctCard'
                        /*style={{ color: 'black' }}*/
                        onClick={() => {
                            props.setCorrect(false);
                            props.setGuessed(false);
                        }}>Continue trying</Button>

                    <Button className='correctCard'
                        /*style={{ color: 'black' }}*/
                        onClick={() => {
                            props.setCorrect(false);
                            props.setGuessed(false);
                            navigate('/learn/'.concat(props.section));
                        }}>
                        {props.section === "Alphabet" ? <> Return to the {props.section.toLowerCase()} </> : <> Return to the {props.section.toLowerCase()} list </>}
                    </Button>

                </Card.Text>

            </Card.Body>
        </Card>
    )
}


export { TryToSign };