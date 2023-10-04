import { words } from "./data.js";
import { Button, Col, Row } from 'react-bootstrap';
import { bookIcon, wordsIcon, searchIcon } from "./icons.js";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import noResultFound from "../images/NoResultFound.png";
import { FirstTitle } from "./exerLISViews.js";

function Words() { 
    const navigate = useNavigate();

    const [searching, setSearching] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

        return (
            <Col className='col-12 background-main'>
                <FirstTitle title="Learn" title2="Words" icon1={bookIcon} icon2={wordsIcon} />
                <Row className='subtitle py-3 headerTitle'>
                    <Col className='d-flex justify-content-start ps-5 col-6'>
                        <h4 className='my-auto mx-5'>Choose a word in the vocabulary</h4>
                    </Col>
                </Row>
                <Row>
                <Col className='d-flex flex-column align-items-center my-5 col-12'>
                        <form class="d-flex flex-column mb-3 col-3" onSubmit={handleSubmit}>
                            <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">{searchIcon}</span>
                            <input class="form-control" type="search" autocomplete="off" placeholder={"Search a word..."} aria-label="Search" id="MySearchWord"
                            value={searching}
                            onChange={ev => setSearching(ev.target.value)} required />
                            </div>
                        </form>
                        {
                        words.filter((word) => word.word.toLowerCase().includes(searching.toLowerCase())).length === 0 ? 
                        <div>
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
                            </div>  : 
                            <Col className='mt-2 mb-5 col-3'>
                                {
                       words.sort(function (a, b) {
                            if (a.word < b.word) {
                                return -1;
                            }
                            if (a.word > b.word) {
                                return 1;
                            }
                            return 0;
                        }).filter((word) => word.word.toLowerCase().includes(searching.toLowerCase())).sort( (a,b)=>{
                                if(a.word.toLowerCase().startsWith(searching.toLowerCase()) ){
                                   if(b.word.toLowerCase().startsWith(searching.toLowerCase())){
                                    if (a.word < b.word) {
                                        console.log("done")
                                    return -1;
                                }
                                if (a.word > b.word) {
                                    console.log("fatto")
                                    return 1;
                                }
                                return 0;
                                }
                                else return -1;
                            }
                                else if(b.word.toLowerCase().startsWith(searching.toLowerCase()) ){
                                    if(a.word.toLowerCase().startsWith(searching.toLowerCase())){
                                     if (a.word < b.word) {
                                         console.log("done")
                                     return -1;
                                 }
                                 if (a.word > b.word) {
                                     console.log("fatto")
                                     return 1;
                                 }
                                 return 0;
                                 }
                                 else return 1;
                            }  
                            return 0;       
                        }).map(i => {
                            return (
                                <Button className='words-from-topic main-button-color' onClick={() => {
                                    navigate("/learn/words/".concat(i.word))
                                 }}> {i.word} </Button>
                            )
                        })
                        }
                    </Col>
                    }
                    </Col>
                </Row>
            </Col>

        )
}




export { Words, /*WordTopic*/ };