import { Row, Col, Button, Form, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { exerciseIcon, guessIcon, signIcon, fingerspellIcon, allIcon, searchIcon, playIcon } from './icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from 'react';
import { GuessTheSignExercise, SignTheWordExercise, FingerspellTheWordExercise } from './exercises';
import { words, topics } from './data.js';
import { FirstTitle } from './exerLISViews';
import noResultFound from "../images/NoResultFound.png";
import { useEffect } from 'react';
import "../styles/buttons.css";

function ChooseTopicsRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [number, setNumber] = useState(5);

    const [doneWords, setDoneWords] = useState([]);


    useEffect(() => {
        const getData = async () => {
            try {
                fetch("http://localhost:3001/donewords/")
                    .then(res => res.json())
                    .then(result =>
                        setDoneWords(result.map((json) => {
                            if (location.state.type === json.type) {
                                return json.word.toLowerCase()
                            }
                        }))
                    ).catch("Error " + console.log);
            } catch (error) {
                console.log("Error", error);
            }
        };

        getData();

    }, []);


    const play = (event) => {
        event.preventDefault();
        navigate("/exercise/" + location.state.type, { state: { exercises: getExercises(selectedTopics), numberOfExercises: number } });
    };

    const title = switchTitle(location.state.type);

    return (
        <Form onSubmit={play} className='background-main'>
            <Col className='col-12'>
                <FirstTitle title="Exercise" title2={title[0]} icon1={exerciseIcon} icon2={title[1]} />
                <Row className='subtitle headerTitle'>
                    <Col className='d-flex py-3 justify-content-start ps-5 col-6'>
                        <h4 className='my-auto mx-5'>Choose one or more topics</h4>
                    </Col>
                    <Col className='d-flex justify-content-end col-6 py-1'>
                        <Button disabled={selectedTopics.length === 0} type="submit" className="brownButton playButton d-flex align-items-center justify-content-center my-2">PLAY&nbsp;<>{playIcon}</>&nbsp;({selectedTopics.length} topic{selectedTopics.length === 1 ? '' : 's'} selected)</Button>
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col className='d-flex justify-content-center my-2 col-12 flex-column'>
                        <div className='d-flex flex-row justify-content-center align-items-baseline'>
                            <h5 className='py-4'>Select the number of exercises you want to do:</h5>
                            &nbsp;&nbsp;
                            <Dropdown className='d-flex'>
                                <Dropdown.Toggle id="dropdown-basic" className='main-button-color'>
                                    <span className='px-2'>{number} exercises</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item className='main-button-color-dropdown' onClick={() => setNumber(5)}>5 exercises</Dropdown.Item>
                                    <Dropdown.Item disabled onClick={() => setNumber(10)}>10 exercises</Dropdown.Item>
                                    <Dropdown.Item disabled onClick={() => setNumber(15)}>15 exercises</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <h5 className='h5-main'>Words will be randomly selected form the topics you choose and proposed to you in the following exercises</h5>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-md-center mb-5'> {/*align-items-center vh-100*/}
                    <Col className='col-5'>
                        <TopicsList doneWords={doneWords} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />
                    </Col>
                </Row>
            </Col>
        </Form>
    );
}

function TopicsList(props) {
    const location = useLocation();
    const [searching, setSearching] = useState("");
    const [allSelected, setAllSelected] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    let items = [];
    if (location.state.type === 'fingerspelltheword') {
        items = topics.filter((topic) => {
            if(topic.topic !== 'Continents'){
                return topic;
            }
        }).map((topic) => {
            let va = words.filter((word) => word.topic === topic.topic).length - words.filter((word) => word.topic === topic.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length < 5
            return { topic: topic.topic, icon: topic.icon, available: va ? 0 : 1 };
        });
    } else {
        items = topics.map((topic) => {
            let va = words.filter((word) => word.topic === topic.topic).length - words.filter((word) => word.topic === topic.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length < 5
            return { topic: topic.topic, icon: topic.icon, available: va ? 0 : 1 };
        });
    }

    //items = items.filter((topic) => props.selectedTopics.includes(topic.topic) || topic.topic.toLowerCase().startsWith(searching.toLowerCase()))

    //topics sorting with priority
    items = items.filter((topic) => props.selectedTopics.includes(topic.topic) ||
        topic.topic.toLowerCase().includes(searching.toLowerCase())).sort((a, b) => {
            if (a.topic.toLowerCase().startsWith(searching.toLowerCase())) {
                if (b.topic.toLowerCase().startsWith(searching.toLowerCase())) {
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
            else if (b.topic.toLowerCase().startsWith(searching.toLowerCase())) {
                if (a.topic.toLowerCase().startsWith(searching.toLowerCase())) {
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
        })

    let results = items.map((t, i) => <Topic doneWords={props.doneWords} topics={items} setAllSelected={setAllSelected} selectedTopics={props.selectedTopics} setSelectedTopics={props.setSelectedTopics} topic={t.topic} icon={t.icon} key={i} />)
    return (
        <>
            <div className="d-flex flex-row pb-2">
                <form class="d-flex col-6 py-1 ps-1 me-5" onSubmit={handleSubmit}>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">{searchIcon}</span>
                        <input class="form-control me-2 " type="search" autocomplete="off" placeholder={"Search a topic..."} aria-label="Search" id="MySearchWord"
                            value={searching}
                            onChange={ev => setSearching(ev.target.value)} required />
                    </div>
                </form>
                {searching === "" &&
                    <AllTopics selectedTopics={props.selectedTopics} allSelected={allSelected} setAllSelected={setAllSelected} topics={items} setSelectedTopics={props.setSelectedTopics} />
                }
            </div>
            <div className="d-grid gap-2">
                {results.length > 0 ? results :
                    <div style={{ margin: 'auto', padding: 'auto' }}>
                        <img src={noResultFound} style={{ height: '210px' }} />
                        <h2 className='mt-3' style={{ fontWeight: 'bold' }}>
                            No results found</h2>
                        <h7 style={{ marginTop: '1em' }}>We couldn't find what you searched for.
                        </h7>
                        <div>
                            <h7>
                                Try searching again.
                            </h7>
                        </div>
                    </div>
                }

            </div>
        </>
    );
}

function Topic(props) {

    return (
        <>
            {words.filter((word) => word.topic === props.topic).length - words.filter((word) => word.topic === props.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length < 5
                ?
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={notEnoughTooltip}>
                    <span className=''>
                        <Button className="py-3 d-flex col-12 custom-button main-button-color" size="lg"
                            disabled={
                                (words.filter((word) => word.topic === props.topic).length -
                                    words.filter((word) => word.topic === props.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length)
                                    < 5 ? true : false
                            }
                            onClick={() => {
                                if (props.selectedTopics.includes(props.topic)) {
                                    props.setSelectedTopics(oldList => {
                                        return oldList.filter(t => {
                                            if (t !== props.topic)
                                                return t;
                                        });
                                    })
                                }
                                else {
                                    props.setSelectedTopics(oldList => [...oldList, props.topic])
                                }
                                props.setAllSelected(false);
                            }}>
                            <div className="d-flex flex-row align-items-center col-12">
                                <div className="d-flex ms-2 col-1">
                                    <Form.Check
                                        type='checkbox'
                                        id={`elem-${props.i}`}
                                        checked={props.selectedTopics.includes(props.topic)}
                                    />
                                </div>

                                <div className='d-flex col-10 justify-content-center pe-5'>
                                    <div className="d-flex col-3 justify-content-end pe-5">
                                        {props.icon}
                                    </div>
                                    <div className="d-flex col-7 justify-content-center pe-5">
                                        {props.topic}
                                    </div>
                                </div>

                                <div className="d-flex col-1">
                                    {
                                        words.filter((word) => word.topic === props.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length
                                    }/{words.filter((word) => word.topic === props.topic).length}
                                </div>


                            </div>
                        </Button>
                    </span>
                </OverlayTrigger>
                :
                <Button className="py-3 d-flex col-12 custom-button main-button-color" size="lg"
                    disabled={
                        (words.filter((word) => word.topic === props.topic).length -
                            words.filter((word) => word.topic === props.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length)
                            < 5 ? true : false
                    }
                    onClick={() => {
                        if (props.selectedTopics.includes(props.topic)) {
                            props.setSelectedTopics(oldList => {
                                return oldList.filter(t => {
                                    if (t !== props.topic)
                                        return t;
                                });
                            })
                        }
                        else {
                            props.setSelectedTopics(oldList => [...oldList, props.topic])
                        }
                        props.setAllSelected(false);
                    }}>
                    <div className="d-flex flex-row align-items-center col-12">
                        <div className="d-flex ms-2 col-1">
                            <Form.Check
                                type='checkbox'
                                id={`elem-${props.i}`}
                                checked={props.selectedTopics.includes(props.topic)}
                            />
                        </div>

                        <div className='d-flex col-10 justify-content-center pe-5'>
                            <div className="d-flex col-3 justify-content-end pe-5">
                                {props.icon}
                            </div>
                            <div className="d-flex col-7 justify-content-center pe-5">
                                {props.topic}
                            </div>
                        </div>

                        <div className="d-flex col-1">
                            {
                                words.filter((word) => word.topic === props.topic).map((word) => word.word).filter((word) => props.doneWords.includes(word.toLowerCase())).length
                            }/{words.filter((word) => word.topic === props.topic).length}
                        </div>
                    </div>
                </Button>
            }
        </>
    )
}

function AllTopics(props) {

    return (
        <Button className="py-1 col-5 main-button-color" size="lg" onClick={() => {
            if (props.allSelected) {
                props.setSelectedTopics([]);
                props.setAllSelected(false);
            }
            else {
                props.setAllSelected(true);
                props.setSelectedTopics([...props.topics.filter(i => {
                    if (i.available)
                        return (i)
                }).map((i) => i.topic)]);
            }
        }}>
            <div className="d-flex flex-row">
                <div className="d-flex justify-self-start">
                    <Form.Check
                        type='checkbox'
                        id={`elem-${props.i}`}
                        checked={props.allSelected}
                    />
                </div>
                <div className="d-flex mx-auto">
                    {props.allSelected ?
                        <>All topics selected</>
                        :
                        <>Select all topics</>
                    }

                </div>
            </div>
        </Button>
    )
}

const notEnoughTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Not enough words left for an exercise session
    </Tooltip>
);

function switchTitle(location) {
    switch (location) {
        case 'guessthesign':
            return ['Guess the sign', guessIcon];
        case 'signtheword':
            return ['Sign the word', signIcon];
        case 'fingerspelltheword':
            return ['Fingerspell the word', fingerspellIcon];
        case 'alltogether':
            return ['All together', allIcon];
        default:
            return <></>
    }
}

const getExercises = (topics) => {
    let exercises = [];
    if (topics.length === 1) {
        exercises = words.filter((word) => {
            if (word.topic === topics[0])
                return word;
        }).map((word, i) => {
            return { ...word, number: i + 1 }
        });
    }
    else {
        exercises = words.filter((word) => {
            if (topics.includes(word.topic))
                return word;
        });
    }

    let randomFive = getRandomSubarray(exercises, 5);
    exercises = randomFive.map((word, i) => {
        return { ...word, number: i + 1 }
    });

    return exercises;
}

function GuessTheSignRoute() {
    const location = useLocation();
    const [currentExercise, setCurrentExercise] = useState(1);

    return (
        <GuessTheSignExercise numberOfExercises={location.state.numberOfExercises} setCurrentExercise={setCurrentExercise} currentExercise={location.state.exercises[currentExercise - 1]} />
    );
}

function SignTheWordRoute() {
    const location = useLocation();
    const [currentExercise, setCurrentExercise] = useState(1);

    return (
        <SignTheWordExercise numberOfExercises={location.state.numberOfExercises} setCurrentExercise={setCurrentExercise} currentExercise={location.state.exercises[currentExercise - 1]} />
    );
}

function FingerspellTheWordRoute() {
    const [currentExercise, setCurrentExercise] = useState(1);
    const location = useLocation();

    return (
        <FingerspellTheWordExercise numberOfExercises={location.state.numberOfExercises} setCurrentExercise={setCurrentExercise} currentExercise={location.state.exercises[currentExercise - 1]} />
    );
}

function AllTogetherRoute() {
    const location = useLocation();
    const [currentExercise, setCurrentExercise] = useState(1);
    //const [totalPoints, setTotalPoints] = useRef(0);

    const totalPoints = useRef(0);

    let currentExerciseType = Math.floor(Math.random() * 3);

    return (
        <>
            {(currentExerciseType === 0) &&
                <GuessTheSignExercise totalPoints={totalPoints} /*setTotalPoints={setTotalPoints}*/ numberOfExercises={location.state.numberOfExercises} setCurrentExercise={setCurrentExercise} currentExercise={location.state.exercises[currentExercise - 1]} />
            }
            {(currentExerciseType === 1) &&
                <SignTheWordExercise totalPoints={totalPoints} /*setTotalPoints={setTotalPoints}*/ numberOfExercises={location.state.numberOfExercises} setCurrentExercise={setCurrentExercise} currentExercise={location.state.exercises[currentExercise - 1]} />
            }
            {(currentExerciseType === 2) &&
                <FingerspellTheWordExercise totalPoints={totalPoints} /*setTotalPoints={setTotalPoints}*/ numberOfExercises={location.state.numberOfExercises} setCurrentExercise={setCurrentExercise} currentExercise={location.state.exercises[currentExercise - 1]} />
            }
        </>
    );
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

export { GuessTheSignRoute, SignTheWordRoute, FingerspellTheWordRoute, AllTogetherRoute, ChooseTopicsRoute };