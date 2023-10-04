import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './components/Sidebar.js';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomepageRoute, LearnRoute, ExerciseRoute, ConversateRoute, WrongRoute, DefaultRoute } from './components/exerLISViews';
import { WordsRoute, TopicsRoute, AlphabetRoute } from './components/learnViews';
import { FingerspellTheWordRoute, SignTheWordRoute, GuessTheSignRoute, AllTogetherRoute, ChooseTopicsRoute } from './components/exerciseViews';
import { LetterRoute } from './components/alphabet';
import { ConversationRoute } from './components/conversate';

import { words, alphabet } from "./components/data.js";
import { TryToSign } from './components/TryToSign';

import { Word } from "./components/Word.js";

function App(props) {

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Sidebar expanded={expanded} setExpanded={setExpanded}></Sidebar>
        {
          expanded ?
            <div className="darkside" id="darkSide"></div>
            :
            <div className="darksideout" id="darkSideout"></div>
        }
        <Routes>
          <Route path='/' element={<DefaultRoute />}>
            <Route index element={<HomepageRoute />} />
            <Route path="/learn" element={<LearnRoute />} />
            <Route path="/learn/words" element={<WordsRoute />} />
            <Route path="/learn/topics" element={<TopicsRoute />} />
            <Route path="/learn/alphabet" element={<AlphabetRoute />} />
            <Route path="/exercise" element={<ExerciseRoute />} />
            <Route path="/exercise/choosetopics" element={<ChooseTopicsRoute />} />
            <Route path="/exercise/fingerspelltheword" element={<FingerspellTheWordRoute />} />
            <Route path="/exercise/signtheword" element={<SignTheWordRoute />} />
            <Route path="/exercise/guessthesign" element={<GuessTheSignRoute />} />
            <Route path="/exercise/alltogether" element={<AllTogetherRoute />} />
            <Route path="/conversate" element={<ConversateRoute />} />
            <Route path="/conversate/Avatar" element={<ConversationRoute username="Avatar" />} />
            {
              
            }
            <Route path="/alphabet" element={<AlphabetRoute />} />
            {
              alphabet.map((i) => {
                return (

                  <Route key={i.letter} path={"/learn/alphabet/".concat(i.letter)} element={<LetterRoute letter={i} />} />
                )
              })
            }
            {
              alphabet.map((i) => {
                return (

                  <Route key={i.letter + "A"} path={"/learn/alphabet/".concat(i.letter, "/try")} element={<TryToSign selectedWord={i} section="Alphabet" />} />
                )
              })
            }
            {
              words.map((i) => {
                return (

                  <Route key={"words-" + JSON.stringify(i.word)} path={"/learn/words/".concat(i.word)} element={<Word selectedWord={i} section="Words" />} />

                )
              })
            }
            {
              words.map((i) => {
                return (
                  <Route key={"topics-" + JSON.stringify(i.word)} path={"/learn/topics/".concat(i.word)} element={<Word selectedWord={i} section="Topics" />} />
                )
              })
            }
            {
              words.map((i) => {
                return (
                  <Route key={"words-" + JSON.stringify(i.word) + "-try"} path={"/learn/words/".concat(i.word).concat("/try")} element={<TryToSign selectedWord={i} section="Words" />} />

                )
              })
            }
            {
              words.map((i) => {
                return (
                  <Route key={"topics-" + JSON.stringify(i.word) + "-try"} path={"/learn/topics/".concat(i.word).concat("/try")} element={<TryToSign selectedWord={i} section="Topics"/>} />
                )
              })
            }
            <Route path='*' element={<WrongRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
