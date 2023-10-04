import { Accordion, Button, Row, Col } from 'react-bootstrap';
import { words, topics } from "./data.js";
import { useState } from 'react';
import { bookIcon, topicsIcon } from "./icons.js";
import { FirstTitle } from "./exerLISViews.js";
import {useNavigate} from "react-router-dom";
import "../styles/buttons.css";
import '../styles/ExpandableList.css';
import { searchIcon } from './icons.js';
import noResultFound from "../images/NoResultFound.png";

function ExpandableList() {
const [searching, setSearching] = useState("");

const handleSubmit = (event) => {
    event.preventDefault();
}
    const navigate=useNavigate();
  
        return (
            <Col className='col-12 background-main'>
            <FirstTitle title="Learn" title2="Topics" icon1={bookIcon} icon2={topicsIcon} />
            <Row className='subtitle py-3 headerTitle'>
                <Col className='d-flex justify-content-start ps-5 col-4'>
                    <h4 className='my-auto mx-5'>Choose a word form a topic</h4>
                </Col>
            </Row>
                <Row>  
                    <Col className='d-flex flex-column align-items-center my-5 col-12'> 
                    <form class="d-flex flex-column mb-3 col-5" onSubmit={handleSubmit}>
                        <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">{searchIcon}</span>
                        <input class="form-control" type="search" autocomplete="off" placeholder={"Search a topic..."} aria-label="Search" id="MySearchTopic"
                        value={searching}
                        onChange={ev => setSearching(ev.target.value)} required />
                        </div>
                    </form>
                            {topics.filter((t) => t.topic.toLowerCase().includes(searching.toLowerCase())).length === 0 ? 
                            <div >
                            <img src= {noResultFound} style={{height:'300px'}}/>
                            <h1 className='mt-3' style={{fontWeight:'bold'}}>
                                No results found</h1>
                                <h7 style={{marginTop:'1em'}}>We couldn't find what you searched for. 
                                </h7>
                                <div>
                                <h7>
                                    Try searching again.
                                    </h7>
                                    </div>
                                </div>   :
                             <Accordion className="d-flex flex-column col-5">  
                            {topics.filter((t) => t.topic.toLowerCase().includes(searching.toLowerCase())).sort((a,b)=>{
                                if(a.topic.toLowerCase().startsWith(searching.toLowerCase()) ){
                                    if(b.topic.toLowerCase().startsWith(searching.toLowerCase())){
                                     if (a.topic < b.topic) {
                                     return -1;
                                 }
                                 if (a.topic > b.topic) {
                                     return 1;
                                 }
                                 return 0;
                                 }
                                 else return -1;
                             }
                                 else if(b.topic.toLowerCase().startsWith(searching.toLowerCase()) ){
                                     if(a.topic.toLowerCase().startsWith(searching.toLowerCase())){
                                      if (a.topic < b.topic) {
                                      return -1;
                                  }
                                  if (a.topic > b.topic) {
                                      return 1;
                                  }
                                  return 0;
                                  }
                                  else return 1;
                             }  
                             return 0;   
                            }).map(topic => {
                                return (
                                    <Accordion.Item eventKey={topic.topic} className="my-2">
                                        <Accordion.Header className='d-flex'>
                                            <Row className='d-flex col-12 b'>
                                                <Col className='d-flex ps-3 '>
                                                    <Col className='col-3 '>
                                                    {topic.icon}
                                                    </Col>
                                                    <Col  className='d-flex col-6 justify-content-center '>
                                                        <div className="ms-4 my-auto" style={{fontSize:"1.3em"}}> {topic.topic} </div>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Accordion.Header>
                                        <Accordion.Body className='color-1'>
                                                <Col className='d-flex flex-column align-items-center'>
                                                    {words.filter(i => i.topic === topic.topic).map(j => {
                                                        return (
                                                            <Button className='main-button-color col-11' onClick={() => { navigate("/learn/topics/".concat(j.word)) }}>{j.word}</Button>
                                                        )
                                                    })}
                                                </Col>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )

                            })}
                        </Accordion>
}
                    </Col>
                </Row>
            </Col>
        )
}

export { ExpandableList }