import { Icon } from '@iconify/react';
import { AiFillExclamationCircle } from "react-icons/ai";
import React from 'react'
import Lottie from 'lottie-react';
import revealed from "../Gif/revealed.json";
import correct from "../Gif/correct.json";
import wrong from "../Gif/wrong.json";

const backArrowIcon = <Icon icon="material-symbols:arrow-back" width="38" />
const homeIcon = <Icon icon="ant-design:home-outlined" width="40" style={{ "paddingBottom": "0.25em" }} />
const profileIcon = <Icon icon="mdi:user-circle" width="40" />
const settingsIcon = <Icon icon="material-symbols:settings" width="40" />;

const bookIcon = <Icon icon="material-symbols:menu-book-outline-rounded" width="40" />;
const exerciseIcon = <Icon icon="healthicons:exercise" width="40" />;
const conversateIcon = <Icon icon="bx:conversation" width="40" />;

const notFoundIcon = <Icon icon="heroicons:magnifying-glass-20-solid" width="40" />

const wordsIcon = <Icon icon="mdi:file-word-box-outline" width="40" />;
const littleWordsIcon = <Icon icon="mdi:file-word-box-outline" width="25" />;
const topicsIcon = <Icon icon="material-symbols:topic-outline" width="40" />;
const alphabetIcon = <Icon icon="mdi:alphabetical-variant" width="40" />;

const repeatIcon = <Icon icon="mdi:repeat-variant" width="25" />;
const playIcon = <Icon icon="material-symbols:play-arrow" width="25" />;
const pauseIcon = <Icon icon="material-symbols:pause-outline" width="25" />;
const previousIcon = <Icon icon="material-symbols:skip-previous" width="25" />;
const nextIcon = <Icon icon="ic:baseline-skip-next" width="25" />;
const littleBookIcon = <Icon icon="material-symbols:menu-book-outline-rounded" width="25" />;

const menuClosedIcon = <Icon icon="material-symbols:menu" width="40" />;
const menuOpenIcon = <Icon icon="material-symbols:menu-open" width="40" />;

const guessIcon = <Icon icon="mdi:file-sign" width="40" />;
const checkCorrectIcon = <Icon icon="icon-park-outline:check-correct" width="24" />
const signIcon = <Icon icon="material-symbols:sign-language-outline" width="40" />;
const fingerspellIcon = <Icon icon="fluent-mdl2:spelling" width="40" />;
const allIcon = <Icon icon="material-symbols:border-all-outline" width="40" />;
const warningIcon = <Icon icon="mdi:alert-circle" width="40" />;
const wrongIcon = <Icon icon="mdi:alpha-x-box" width="38" />
const wellDoneIcon = <Icon icon="mdi:checkbox-marked" width="38" />
const revealedIcon = <Icon icon="material-symbols:next-week" width="38" />
const wrongIconModal = <Icon icon="mdi:alert-circle" width="38" />
const endSessionIcon = <Icon icon="mdi:close-box-multiple" width="20" />
const letterIndicatorIcon = <Icon icon="material-symbols:arrow-circle-up-rounded" width="30" color='white' />
const littleExerciseIcon = <Icon icon="healthicons:exercise" width="28" />;
const littleAlphabetIcon = <Icon icon="mdi:alphabetical-variant" width="25" />;
const searchIcon = <Icon icon="material-symbols:search" width="25" />

const addFriendIcon = <Icon icon="material-symbols:add-circle-outline-rounded" width="25" />;
const translationOnIcon = <Icon icon="icon-park-outline:translation" width="22"  />
const callOnIcon = <Icon icon="material-symbols:call" width="25" />
const callOffIcon = <Icon icon="material-symbols:call-end" width="25" />
const translationOffIcon = <svg xmlns="http://www.w3.org/2000/svg"
    width="22px" height="22px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        <line x1="50" y1="0" x2="0" y2="50" style={{ strokeWidth: "6" }} />
        <path d="M17 32L19.1875 27M31 32L28.8125 27M19.1875 27L24 16L28.8125 27M19.1875 27H28.8125" />
        <path d="M43.1999 20C41.3468 10.871 33.2758 4 23.5999 4C13.9241 4 5.85308 10.871 4 20L10 18" />
        <path d="M4 28C5.85308 37.129 13.9241 44 23.5999 44C33.2758 44 41.3468 37.129 43.1999 28L38 30" />
    </g>
</svg>

const noFound = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--heroicons"
    width="60px" height="60px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 22 22">

    <line x1="5" y1="5" x2="15" y2="15" style={{ stroke: "black", strokeWidth: "1" }} />
    <line x1="5" y1="13" x2="14" y2="4" style={{ stroke: "black", strokeWidth: "1" }} />
    <path fill="currentColor" fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd">
    </path>

</svg>

const questionIcon = <Icon icon="radix-icons:question-mark-circled" width="42" color="rgb(25, 59, 25)" />
const questionIconModal = <Icon icon="mdi:question-mark-circle" width="35" color="rgb(25, 59, 25)" />
const errorIcon = <Icon icon="material-symbols:cancel" width="35" color="rgb(25, 59, 25)" />
/*const questionIcon=<svg stroke="black" fill="black" stroke-width="0" viewBox="0 0 1024 1024" 
height="40px" width="40px" xmlns="http://www.w3.org/2000/svg" style={{padding:'0',margin:'0'}}>
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 440 440 440 440-200.6 440-440S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-22.7a40.3 40.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-40.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z">
        </path></svg>*/

const partyPopperLeft = <Icon icon="lucide:party-popper" width="32" color="rgb(25, 59, 25)" />
const partyPopperRight = <Icon icon="lucide:party-popper" flip="horizontal" width="32" color="rgb(25, 59, 25)" />

const exclamationIconModal = <AiFillExclamationCircle size={35} />

const previousVariantIcon = <Icon icon="material-symbols:skip-previous-outline" width="25" />
const nextVariantIcon = <Icon icon="material-symbols:skip-next-outline" width="25" />
const tryToSignIcon = <Icon icon="material-symbols:sign-language-outline" width="25" />
const colorsIcon = <Icon icon="ic:baseline-color-lens" width="30" className="my-auto" />
const fruitsIcon = <Icon icon="game-icons:fruit-bowl" width="30" className="my-auto" />
const animalsIcon = <Icon icon="mdi:paw" width="30" className="my-auto" />
const jobsIcon = <Icon icon="material-symbols:work" width="30" className="my-auto" />
const daysIcon = <Icon icon="lucide:calendar-days" width="30" className="my-auto" />
const continentsIcon = <Icon icon="fluent-mdl2:world" width="30" className="my-auto" />

//animations
const correctAnim = <Lottie autoplay={true} loop={false} animationData={correct} style={{width:"7.5em", margin:"-2em", padding:'0em'}}/>
const revealedAnim=<Lottie autoplay={true} loop={false} animationData={revealed} style={{width:"6.5em", marginTop:"-1.5em", marginBottom:"-1em"}}/>
const wrongAnim=<Lottie autoplay={true} loop={false} animationData={wrong} style={{width:"4em"}}/>
export {
    backArrowIcon, bookIcon, exerciseIcon, conversateIcon, wordsIcon, topicsIcon, alphabetIcon, settingsIcon, repeatIcon, playIcon,
    pauseIcon, previousIcon, nextIcon, menuClosedIcon, menuOpenIcon, guessIcon, signIcon, fingerspellIcon, allIcon, warningIcon,
    wrongIcon, homeIcon, profileIcon, checkCorrectIcon, littleBookIcon, translationOnIcon, translationOffIcon, callOnIcon, callOffIcon,
    endSessionIcon, letterIndicatorIcon, littleExerciseIcon, searchIcon, littleWordsIcon, questionIcon, littleAlphabetIcon, previousVariantIcon,
    nextVariantIcon, tryToSignIcon, questionIconModal, exclamationIconModal, errorIcon
    , addFriendIcon, wrongIconModal, colorsIcon, fruitsIcon, animalsIcon, jobsIcon, daysIcon, continentsIcon
    , notFoundIcon, noFound, partyPopperLeft, partyPopperRight, wellDoneIcon, revealedIcon,
    correctAnim, revealedAnim, wrongAnim
};