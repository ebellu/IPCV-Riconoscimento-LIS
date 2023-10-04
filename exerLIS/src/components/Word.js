import { useState, useRef, useEffect } from "react";
import { ModalWebcam } from "./Modal";
import { WordButtons, TopicButtons, VariantButtons } from "./Buttons";
import { bookIcon, wordsIcon, topicsIcon, tryToSignIcon } from "./icons.js";
import { words } from "./data.js";
import { Button, Col, Row, Card } from 'react-bootstrap';
import { TryToSign } from "./TryToSign";

import { FirstTitle } from "./exerLISViews.js";
import { topics } from "./data.js";
import { useNavigate, useLocation} from "react-router-dom";



function Word(props) {
    const [show, setShow] = useState(false);
    const [paused, setPaused] = useState(false);

    //const [variant, setVariant]=useState(props.currentVIndex);
    const [video, setVideo] = useState(props.selectedWord.video);
    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        if (paused)
            vidRef.current.play();
        else
            vidRef.current.pause();
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [shouldShowModal, setShouldShowModal] = useState(true);

 

    const [variant, setVariant] = useState(()=>{if(location.state != null){
        return location.state.variantIndex
    }
else return -1});

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

    let topicWords = words.filter((word) => word.topic === props.selectedWord.topic);
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
        if (word.word === props.selectedWord.word) {
            return true;
        }
    });

    return (
        <Col className='col-12 d-flex flex-column prevent-y-scroll'>
        
            {props.section === "Words" &&
                <>
                    {(shouldShowModal && props.selectedWord.variant != null) ?
                        <ModalWebcam setShow={setShow} show={show} navigateTo={'/learn/words/' + props.selectedWord.word + '/try'} hasVariant={true}  type={{variantIndex: variant}} text={<>To let you do this exercise the system accesses your webcam to detect your signs and provide you a feedback.<br></br>Are you sure you want to continue?</>} />
                        :
                        <></>
                    }
                    {(shouldShowModal && props.selectedWord.variant == null) ?
                        <ModalWebcam setShow={setShow} show={show} navigateTo={'/learn/words/' + props.selectedWord.word + '/try'} hasVariant={false} text={<>To let you do this exercise the system accesses your webcam to detect your signs and provide you a feedback.<br></br>Are you sure you want to continue?</>} />
                        :
                        <></>
                    }
                    <FirstTitle title="Learn" title2="Words" icon1={bookIcon} icon2={wordsIcon} buttons={<WordButtons setVideo={setVideo} setVariant={setVariant} word={props.selectedWord.word} handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} />}
                    />
                </>}
            {props.section === "Topics" &&
                <>
                    {(shouldShowModal && props.selectedWord.variant != null) ?
                        <ModalWebcam setShow={setShow} show={show} navigateTo={'/learn/topics/' + props.selectedWord.word + '/try'} hasVariant={true} type={{variantIndex: variant}} text={<>To let you do this exercise the system accesses your webcam to detect your signs and provide you a feedback.<br></br>Are you sure you want to continue?</>} />
                        :
                        <></>
                    }
                    {(shouldShowModal && props.selectedWord.variant == null) ?
                        <ModalWebcam setShow={setShow} show={show} navigateTo={'/learn/topics/' + props.selectedWord.word + '/try'} hasVariant={false} text={<>To let you do this exercise the system accesses your webcam to detect your signs and provide you a feedback.<br></br>Are you sure you want to continue?</>} />
                        :
                        <></>
                    }
                    <FirstTitle title="Learn" title2="Topics" icon1={bookIcon} icon2={topicsIcon} buttons={<TopicButtons setVideo={setVideo} setVariant={setVariant} word={props.selectedWord.word} topic={props.selectedWord.topic} handlePlayVideo={handlePlayVideo} paused={paused} setPaused={setPaused} />}
                    />
                </>}
            <Row className='subtitle py-2 headerTitle'>
                <Col className='d-flex justify-content-start ps-5 col-9'>
                    {props.section === "Topics" &&
                        <>
                            <h4 className='my-auto ms-5'>
                                Topic: <b>{props.selectedWord.topic.toUpperCase()}</b>
                            </h4>
                            <h4 className='my-auto mx-4'>
                                {topics.filter(i => i.topic === props.selectedWord.topic)[0].icon}
                            </h4>
                            <h4 className='my-auto'>
                                Word: <b>{props.selectedWord.word.toUpperCase()}</b>
                            </h4>
                            &nbsp;&nbsp;
                            {props.selectedWord.variant != null &&
                                <h4 className='my-auto'>
                                    -&nbsp;&nbsp;Variant: <b>{variant + 2}</b>&nbsp;&nbsp;
                                </h4>
                            }&nbsp;&nbsp;

                        </>
                    }
                    {props.section === "Words" &&
                        <>
                            <h4 className='my-auto ms-5'>
                                Word: <b>{props.selectedWord.word.toUpperCase()}</b>
                            </h4>
                            &nbsp; &nbsp;
                            {props.selectedWord.variant != null &&
                                <h4 className='my-auto'>
                                    -&nbsp;&nbsp;Variant: <b>{variant + 2}</b>&nbsp;&nbsp;
                                </h4>
                            }
                        </>
                    }
                    {props.selectedWord.variant != null &&
                        <VariantButtons selectedWord={props.selectedWord} currentVariantIndex={variant} setVariant={setVariant} setVideo={setVideo} />}
                    {props.section === "Topics" &&
                        <Col className="my-auto d-flex justify-content-end">
                            <h4 className="my-auto"> Word {pos + 1} of {topicWords.length}</h4>
                        </Col>}
                </Col>
                <Col className='col-3 d-flex justify-content-end'>
                    <Button className=" try-width brownButton" onClick={() => {
                        if (shouldShowModal) {
                            setShow(true);
                        } else {
                            if (props.section === "Words"){
                                if(props.selectedWord.variant != null){
                                navigate('/learn/words/' + props.selectedWord.word + '/try', {state: {variantIndex: variant}})
                            }
                                else navigate('/learn/words/' + props.selectedWord.word + '/try')
                            }
                            if(props.section === "Topics"){
                            if(props.selectedWord.variant != null){
                                navigate('/learn/topics/' + props.selectedWord.word + '/try', {state: {variantIndex: variant}})}
                            else navigate('/learn/topics/' + props.selectedWord.word + '/try')}
                                /*if (props.section === "Words")
                                return (<TryToSign variantIndex={variant} selectedWord={props.selectedWord} section="Words"  />)
                            else
                                return (<TryToSign variantIndex={variant} selectedWord={props.selectedWord} section="Topics"  />)*/
                        }
                    }} > Try to sign! &nbsp; {tryToSignIcon}</Button>
                </Col>
            </Row>
            <Row className='d-flex justify-content-end flex-grow-1'>
                <Col className='col-6 d-flex justify-content-center align-items-center flex-column'>
                    <div className='flex-grow-1'>
                        <video ref={vidRef} className="video-signs-conversate" src={video} type="video/mp4" autoPlay loop muted />
                    </div>
                    <div className='d-flex overlap-conversate justify-content-center'>
                        <Card className='hint-guessed'>
                            <Card.Body>
                                <h1>{props.selectedWord.word}</h1>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Col className='col-3 pe-4 mt-5 d-flex flex-column align-items-center'>
                    <img src={props.selectedWord.img} className='tip-image border border-dark' />
                    {/*<h3 className='pt-2'>{props.selectedWord.word}</h3>*/}
                </Col>
            </Row>
        </Col>
    )
}

export { Word };