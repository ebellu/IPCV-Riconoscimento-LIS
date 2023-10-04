import { Col, Row, Card, CardGroup, Button } from "react-bootstrap";
import "../styles/cards.css";
import { useNavigate } from "react-router-dom";
import { AlphabetButtons } from "./Buttons";
import { FirstTitle } from './exerLISViews.js';
import { bookIcon, alphabetIcon } from './icons';
import { useState, useEffect } from 'react';
import { ModalWebcam } from './Modal';
import { useRef } from 'react';
import { alphabet } from "./data";
import { tryToSignIcon } from "./icons.js";



function Alphabet() {
    const navigate = useNavigate();
    return (
        <CardGroup>
            {alphabet.map(i => {
                return (
                    <Col key={i.letter}>
                        <Card className="alphabetCard" role="button" onClick={() => { navigate('/learn/alphabet/'.concat(i.letter)) }}>
                            <Card.Header><b>{i.letter}</b></Card.Header>
                            <Card.Img src={i.img}></Card.Img>
                        </Card>
                    </Col>
                )
            })}
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
        </CardGroup>

    )
}

function LetterRoute(props) {
    const [show, setShow] = useState(false);
    const [paused, setPaused] = useState(false);

    const navigate = useNavigate();
    const [shouldShowModal, setShouldShowModal] = useState(true);

    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        if (paused)
            vidRef.current.play();
        else
            vidRef.current.pause();
    }

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
        <Col className='col-12 d-flex flex-column prevent-y-scroll'>
            {shouldShowModal ?
                <ModalWebcam setShow={setShow} show={show} navigateTo={'/learn/alphabet/' + props.letter.letter + '/try'} hasVariant={false} text={<>To let you do this exercise the system accesses your webcam to detect your signs and provide you a feedback.<br></br>Are you sure you want to continue?</>} />
                :
                <></>
            }
            <FirstTitle title="Learn" icon1={bookIcon} title2="Alphabet" icon2={alphabetIcon} buttons={<AlphabetButtons handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} currentLetter={props.letter.letter} />} />
            <Row className='subtitle py-2 headerTitle'>
                <Col className='col-6 ps-5 d-flex'>
                    <h4 className='my-auto ps-5'>Letter: <b>{props.letter.letter}</b></h4>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button className=" try-width brownButton" onClick={() => {
                        shouldShowModal ?
                            setShow(true)
                            :
                            navigate('/learn/alphabet/' + props.letter.letter + '/try')

                    }} > Try to sign! &nbsp; {tryToSignIcon}</Button>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center flex-grow-1'>
                <Col className='d-flex justify-content-center align-items-center flex-column'>
                    <div className="flex-grow-1">
                        <video ref={vidRef} className="video-signs-conversate" src={props.letter.video} type="video/mp4" autoPlay loop muted />
                    </div>
                    <div className='d-flex overlap-conversate justify-content-center'>
                        <Card className='hint-guessed'>
                            <Card.Body>
                                <h1>{props.letter.letter}</h1>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

function AlphabetLite(props) {
    return (
        <CardGroup>
            {alphabet.map(i => {
                return (
                    <Col key={i.letter}>
                        <Card role='button' className={props.letter === i ? "alphabetCardSelected" : "alphabetCard"} onClick={() => props.setLetter(i)}>
                            <Card.Header><b>{i.letter}</b></Card.Header>
                            <Card.Img src={i.img}></Card.Img>
                        </Card>
                    </Col>
                )
            })}
            <Col></Col>
        </CardGroup>

    )
}

export default Alphabet;
export { alphabet, LetterRoute, AlphabetLite };