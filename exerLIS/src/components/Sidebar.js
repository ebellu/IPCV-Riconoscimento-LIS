import '../styles/sidebar.css';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '../styles/react-sidenav.css';
import { bookIcon, exerciseIcon, conversateIcon, homeIcon, profileIcon, settingsIcon, backArrowIcon } from './icons.js';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ModalEnd } from './Modal';
import { useState, useEffect } from 'react';
import { UserLevel } from './Buttons';

function Sidebar(props) {

    // ModalEnd data
    const [show, setShow] = useState(false);
    const [navigateTo, setNavigateTo] = useState("");

    // if is false asks to exit from an conversation
    // if is true asks to exit from an exercise
    const [confirmExercise, setConfirmExercise] = useState(false);

    useEffect(() => {
        // this is for detecting the click 
        document.body.addEventListener('click', closeSidebar);
        return () => {
            document.body.removeEventListener('click', closeSidebar);
        }
    });

    // states of learn, exercise, conversate NavItem
    const [isLearn, setLearn] = useState(false);
    const [isExercise, setExercise] = useState(false);
    const [isConversate, setConversate] = useState(false);

    // initialise react components
    const navigate = useNavigate();
    const location = useLocation();

    const expandSideBar = () => { props.setExpanded(!props.expanded) }
    const closeSideBarIfClickOutside = () => { props.setExpanded(false) }

    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
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
    });



    useEffect(() => {
        const actualLocation = window.location.pathname;
        const steps = actualLocation.split("/");
        // my actual main folder is steps[1]
        steps[1] === "learn" ? setLearn(true) : setLearn(false);
        steps[1] === "exercise" ? setExercise(true) : setExercise(false);
        steps[1] === "conversate" ? setConversate(true) : setConversate(false)
        // resetting to false the isBackButtonClicked
    }, [location.pathname]);

    const closeSidebar = (ev) => {
        var clickIsOutside = false;
        if (ev && ev.target && (ev.target.id === "darkSideout" || ev.target.id === "darkSide")) {
            clickIsOutside = true;
        }
        if (clickIsOutside) {
            closeSideBarIfClickOutside();
        }
    };

    const goBackFromPath = () => {
        // close sidebar
        props.setExpanded(false);
        // get the current path
        const currentPath = location.pathname;
        // devide the path and pop the last step

        // if we are inside a conversation, ask for confirmation
        var steps = currentPath.split("/")

        if (steps.length === 3 && steps[1] === "conversate") {
            // we were in a conversation
            // preparing ModalEnd to ask confirmation
            steps.pop();
            const newPathToGo = steps.join("/");
            setNavigateTo(newPathToGo)
            setConfirmExercise(false);
            setShow(true);
        }
        else {
            // if we are inside an exercise, ask for confirmation
            if (currentPath === "/exercise/guessthesign" || currentPath === "/exercise/signtheword" || currentPath === "/exercise/fingerspelltheword" || currentPath === "/exercise/alltogether") {
                setNavigateTo("/exercise")
                setConfirmExercise(true)
                setShow(true)
            }
            else {
                steps.pop();
                const newPathToGo = steps.join("/");
                navigate(newPathToGo);
            }
        }

    }

    const checkIfAsk = (pathToGoOnConfirmation) => {
        const currentPath = location.pathname;

        // if we are in a conversation and we are trying to go out
        var steps = currentPath.split("/")
        if (steps.length === 3 && steps[1] === "conversate") {
            // we were in a conversation
            // preparing ModalEnd to ask confirmation
            setNavigateTo(pathToGoOnConfirmation)
            setConfirmExercise(false);
            setShow(true);
        } else {
            // if we are inside an exercise, ask for confirmation
            if (currentPath === "/exercise/guessthesign" || currentPath === "/exercise/signtheword" || currentPath === "/exercise/fingerspelltheword" || currentPath === "/exercise/alltogether") {
                setNavigateTo(pathToGoOnConfirmation);
                setConfirmExercise(true)
                setShow(true)
            }
            else {
                navigate(pathToGoOnConfirmation);
            }
        }
    }

    return (
        <SideNav
            onSelect={selected => {
                if (selected !== undefined) {
                    if (selected === "back") {
                        goBackFromPath();
                    }
                    else {
                        checkIfAsk('/' + selected)
                        props.setExpanded(false);
                    }
                }
            }}
            className='mysidenav'
            expanded={props.expanded}
            onToggle={ev => { expandSideBar() }}

        >
            {confirmExercise ?
                <ModalEnd setShow={setShow} show={show} navigateTo={navigateTo} text={<>Are you sure you want to exit the exercise session?</>} />
                :
                <ModalEnd setShow={setShow} show={show} navigateTo={navigateTo} text={"Are you sure you want to end the conversation?"} />
            }
            {
                location.pathname === "/" ?
                    <SideNav.Nav defaultSelected="">
                        <NavItem className='navItemEmpty1' active={false} style={{ 'marginTop': '7px', 'marginBottom': '7px', "pointer-events": "none", "cursor": "unset" }}>
                            <NavIcon>
                                <div style={{ color: '#ecf7d5', opacity: '0.2' }} >{backArrowIcon}</div>
                                {/*<div style={{ color: '#CAD593' }}>{backArrowIcon}</div>*/}
                            </NavIcon>
                        </NavItem>
                    </SideNav.Nav>
                    :
                    <SideNav.Nav defaultSelected="" className='backbtn' onClick={() => goBackFromPath()} type="button">
                        <NavItem eventKey="back" style={{ 'marginTop': '7px', 'marginBottom': '7px', "pointer-events": "none", "cursor": "unset" }}>
                            <NavIcon>
                                <div style={{ color: '#ecf7d5' }}>{backArrowIcon}</div>
                            </NavIcon>
                        </NavItem>
                    </SideNav.Nav>
            }


            <SideNav.Toggle className='.sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02' />
            <SideNav.Nav defaultSelected="">
                <NavItem eventKey="">
                    <NavIcon>
                        {/* <div style={{ color: '#132A13' }}>{homeIcon}</div> */}
                        <div style={{ color: '#ecf7d5' }}>{homeIcon}</div>
                    </NavIcon>
                    <NavText style={{ 'paddingLeft': '70px' }}>
                        Home
                    </NavText>
                </NavItem>
                {props.expanded ?
                    <div style={{ 'paddingTop': '1.75em', 'paddingLeft': '0.23em', "width": "240px" }} >
                        <UserLevel userPoints={userPoints} inSidebar={true} />
                    </div>
                    :
                    <NavItem eventKey="profile" style={{ 'paddingTop': '1.33em', 'paddingBottom': '.3em', "pointer-events": "none", "cursor": "unset" }} className='navItemEmpty1' active={false} disabled={true}>
                        <NavIcon>
                            {/* <div style={{color: '#132A13' }}>{profileIcon}</div> */}
                            <div style={{ color: '#ecf7d5' }}>{profileIcon}</div>
                        </NavIcon>
                        <NavText style={{ 'paddingLeft': '70px' }}>
                            Profile
                        </NavText>
                    </NavItem>
                }

                {props.expanded ?
                    <NavItem className='navItemEmpty1' style={{ "pointer-events": "none", "cursor": "unset" }}></NavItem>
                    :
                    <NavItem className='navItemEmpty1' style={{ "paddingBottom": "3.3em", "pointer-events": "none", "cursor": "unset" }}></NavItem>
                }

                <NavItem eventKey="learn" active={isLearn} selected={isLearn}>
                    <NavIcon>
                        {/* <div style={{ color: '#132A13' }}>{bookIcon}</div> */}
                        <div style={{ color: '#ecf7d5' }}>{bookIcon}</div>
                    </NavIcon>
                    <NavText style={{ 'paddingLeft': '70px' }}>
                        Learn
                    </NavText>
                </NavItem>
                <NavItem eventKey="exercise" active={isExercise} selected={isExercise}>
                    <NavIcon>
                        {/* <div style={{color: '#132A13'}}>{exerciseIcon}</div> */}
                        <div style={{ color: '#ecf7d5' }}>{exerciseIcon}</div>
                    </NavIcon>
                    <NavText style={{ 'paddingLeft': '70px' }}>
                        Exercise
                    </NavText>
                </NavItem>
                <NavItem className="navItemEmpty1" style={{ "pointer-events": "none", "cursor": "unset" }}>
                    <NavIcon>
                        {/* <div style={{ color: '#132A13' }}>{conversateIcon}</div> */}
                        <div style={{ color: '#ecf7d5' }}>{conversateIcon}</div>
                    </NavIcon>
                    <NavText style={{ 'paddingLeft': '70px' }}>
                        Conversate
                    </NavText>
                </NavItem>

                <NavItem className="navItemEmpty1" style={{ "pointer-events": "none", "cursor": "unset" }}></NavItem>
                <NavItem className="navItemEmpty2" style={{ "pointer-events": "none", "cursor": "unset" }}></NavItem>
                <NavItem className="navItemEmpty3" style={{ "pointer-events": "none", "cursor": "unset" }}></NavItem>
                {/*
                            <NavItem className='navItemEmpty'></NavItem>
                            <NavItem className='navItemEmpty'></NavItem>
                            <NavItem className='navItemEmpty'></NavItem>
                            <NavItem className='navItemEmpty'></NavItem>
                            <NavItem className='navItemEmpty'></NavItem>*/}

                {/*<div style={{padding:'25%'}}></div>*/}

                <NavItem style={{ "pointer-events": "none", "cursor": "unset" }}>
                    <NavIcon>
                        {/* <div style={{ color: '#132A13' }}>{settingsIcon}</div> */}
                        <div style={{ color: '#ecf7d5' }}>{settingsIcon}</div>
                    </NavIcon>
                    <NavText style={{ 'paddingLeft': '70px' }}>
                        Settings
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav >
    );
}

export default Sidebar;