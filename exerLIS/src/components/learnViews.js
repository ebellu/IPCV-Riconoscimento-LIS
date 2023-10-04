import { Row, Col } from 'react-bootstrap';
import Alphabet from './alphabet';
import { ExpandableList } from './ExpandableList';
import { bookIcon, alphabetIcon } from './icons';
import { Titles } from './exerLISViews.js';
import { Words } from "./WordList.js";

function TopicsRoute() {
    return (
        <ExpandableList />
    );
}

function WordsRoute() {
    return (
        <Words />
    );
}

function AlphabetRoute() {
    return (
        <Col className='col-12'>
            <Titles title="Learn" icon1={bookIcon} title2="Alphabet" icon2={alphabetIcon} subtitle="Choose a letter to see how to sign it" />
            <Row className='d-flex justify-content-center'>
                <Col className='d-flex justify-content-center my-5 col-7'>
                    <Alphabet />
                </Col>
            </Row>
        </Col>
    );
}

export { WordsRoute, TopicsRoute, AlphabetRoute };