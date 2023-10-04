
import { Col, Row, Card ,Button} from "react-bootstrap";
import { conversateIcon } from './icons.js';
import { ModalEnd } from './Modal.js';
import {FirstTitle} from './exerLISViews.js'
import Webcam from "react-webcam";
import { useState } from 'react';
import '../styles/conversate.css';
import Spinner from 'react-bootstrap/Spinner';
import { ConversateButtons } from "./Buttons";
import { useEffect } from 'react';



function ConversationRoute(props) {
    const [translation, setTranslation] = useState(false);
    const [loader, setLoader] = useState(true);
    const[contConv,setContConv]=useState(false);
    const[contConvYou,setContConvYou]=useState(false);
    const [show, setShow] = useState(false);
    const [text, setText] = useState("...");
    const [startConvYou, setStartConvYou] = useState(false);
    const[calling,setCalling]=useState(false);
    const [textYou, setTextYou] = useState("...");
    const [secondQuest,setSecondQuest]= useState(false);
    const [secondExcl,setSecondExcl]= useState(false);
    const [secondQuestYou,setSecondQuestYou]= useState(false);
    const[textUser,setTextUser]=useState("...");
    const[rispostaYou,setRispostaYou]=useState("false");
    const selectedUser=props.username;

    let handleUserMedia = () => {
        setLoader(false);
    };

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);

        //VERY IMPORTANT
        return () => {
            document.removeEventListener("keydown", detectKeyDown, true);
        }
    }, [props.currentExercise]);

    let detectKeyDown = (e) => {
        //
        if (e.key === "c") {
            setContConv(true);
            setText("What's the weather like?");
            setTextYou("...");
            setStartConvYou(false);
            setTextUser("You look good!");
          
        }
        
        if (e.key === "g") {
            setStartConvYou(false);
            setContConvYou(true);
            setTextYou("Today it's cloudy");
            setText("...");
        }
        if (e.key === "f") {
            setTextYou("...");
            setText("What's the date today?");
            setSecondQuest(true);
            setContConv(false);
            setStartConvYou(false);
        }
        if (e.key === "l") {
            setTextYou("Today is the 2nd of February");
            setText("...");
            setContConv(false);
            setStartConvYou(false);
            setSecondQuestYou(true);
        }
    
    if (e.key === "m") {
        setTextYou("...");
        setSecondExcl(true);
        setTextUser("See you later");
    }
    if (e.key === "a") {
        setCalling(true);
    }
    if (e.key === "t") {
        setRispostaYou(true);
        setTextYou("Thanks, you too!");
        setTextUser("...");
    }
    if (e.key === "v") {
        setRispostaYou(true);
        setTextYou("Ok, see you later");
        setTextUser("...");
    }
}
}

function TranslationOn(props) {

    return (
        <Card className='hint-guessed'>
            <Card.Body>
                <h1>{props.text}</h1>
            </Card.Body>
        </Card>


    )
}

function TranslationOnYou(props) {

    return (
        <Card className='hint-guessed'>
            <Card.Body>
                <h1>{props.textYou}</h1>
            </Card.Body>
        </Card>


    )
}


export { ConversationRoute};
