//Colors videos
import blackImg from "../images/black.jpg";
import blueImg from "../images/blue.jpg";
import greenImg from "../images/green.jpg";
import redImg from "../images/red.jpg";
import whiteImg from "../images/white.jpg";

//Animals - image
import birdImg from "../images/bird.jpg";
import catImg from "../images/cat.jpg";
import cowImg from "../images/cow.jpg";
import dogImg from "../images/dog.jpg";
import elephantImg from "../images/elephant.jpg";
import pigImg from "../images/pig.jpg";

//Jobs images
import butcherImg from "../images/butcher.jpg";
import engineerImg from "../images/engineer.jpg"; 
import priestImg from "../images/priest.jpeg";
import teacherImg from "../images/teacher.jpeg";
import barmanImg from "../images/barman.png";

//continents images
import africaImg from "../images/africa.png";
import asiaImg from "../images/asia.png";
import northamericaImg from "../images/northamerica.png";
import southamericaImg from "../images/southamerica.png";
import europeImg from "../images/europe.png";
import oceaniaImg from "../images/oceania.png";

//Days images
import mondayImg from "../images/monday.png";
import tuesdayImg from "../images/tuesday.png";
import wednesdayImg from "../images/wednesday.png";
import thursdayImg from "../images/thursday.png";
import fridayImg from "../images/friday.png";
import saturdayImg from "../images/saturday.png";
import sundayImg from "../images/sunday.png";

//Fruits images
import appleImg from "../images/apple.jpg";
import bananaImg from "../images/banana.jpg";
import orangeImg from "../images/orange.jpg";
import pearImg from "../images/pear.jpg";
import watermelonImg from "../images/watermelon.jpg";


import A from "../images/A.png";
import B from "../images/B.png";
import C from "../images/C.png";
import D from "../images/D.png";
import E from "../images/E.png";
import F from "../images/F.png";
import G from "../images/G.png";
import H from "../images/H.png";
import I from "../images/I.png";
import Jl from "../images/J.png";
import K from "../images/K.png";
import L from "../images/L.png";
import M from "../images/M.png";
import N from "../images/N.png";
import O from "../images/O.png";
import P from "../images/P.png";
import Q from "../images/Q.png";
import R from "../images/R.png";
import S from "../images/S.png";
import T from "../images/T.png";
import U from "../images/U.png";
import V from "../images/V.png";
import W from "../images/W.png";
import X from "../images/X.png";
import Y from "../images/Y.png";
import Z from "../images/Z.png";

import a from "../videos/a.mp4";
import b from "../videos/b.mp4";
import c from "../videos/c.mp4";
import d from "../videos/D.mp4";
import e from "../videos/E.mp4";
import f from "../videos/F.mp4";
import g from "../videos/G.mp4";
import h from "../videos/H.mp4";
import i from "../videos/I.mp4";
import j from "../videos/J.mp4";
import k from "../videos/K.mp4";
import l from "../videos/L.mp4";
import m from "../videos/M.mp4";
import n from "../videos/N.mp4";
import o from "../videos/O.mp4";
import p from "../videos/P.mp4";
import q from "../videos/Q.mp4";
import r from "../videos/R.mp4";
import s from "../videos/S.mp4";
import t from "../videos/T.mp4";
import u from "../videos/U.mp4";
import v from "../videos/V.mp4";
import w from "../videos/W.mp4";
import x from "../videos/X.mp4";
import y from "../videos/Y.mp4";
import z from "../videos/Z.mp4";

import { animalsIcon, fruitsIcon, daysIcon, colorsIcon, jobsIcon, continentsIcon } from "./icons";


const alphabet = [{ letter: 'A', img: A, video: a}, { letter: 'B', img: B, video: b }, { letter: 'C', img: C, video: c }, { letter: 'D', img: D, video: d},
{ letter: 'E', img: E, video: e }, { letter: 'F', img: F, video: f }, { letter: 'G', img: G, video: g }, { letter: 'H', img: H, video: h },
{ letter: 'I', img: I, video: i }, { letter: 'J', img: Jl, video: j }, { letter: 'K', img: K, video: k }, { letter: 'L', img: L, video: l },
{ letter: 'M', img: M, video: m }, { letter: 'N', img: N, video: n }, { letter: 'O', img: O, video: o }, { letter: 'P', img: P, video: p },
{ letter: 'Q', img: Q, video: q }, { letter: 'R', img: R, video: r }, { letter: 'S', img: S, video: s }, { letter: 'T', img: T, video: t },
{ letter: 'U', img: U, video: u }, { letter: 'V', img: V, video: v }, { letter: 'W', img: W, video: w }, { letter: 'X', img: X, video: x },
{ letter: 'Y', img: Y, video: y }, { letter: 'Z', img: Z, video: z }]

const topics=[{topic:"Animals", icon:animalsIcon}, {topic:"Colors", icon: colorsIcon}, {topic:"Continents", icon: continentsIcon}, {topic:"Days of the week", icon: daysIcon}, {topic:"Fruits", icon: fruitsIcon}, {topic:"Jobs", icon:jobsIcon}]

const words=[
    {word:"Black", topic:"Colors", img: blackImg},
    {word:"Blue", topic:"Colors", img: blueImg},
    {word:"Green", topic:"Colors", img: greenImg},
    {word:"Red", topic:"Colors", img: redImg},
    {word:"White", topic:"Colors", img: whiteImg},

    {word:"Bird", topic:"Animals", img: birdImg},
    {word:"Cat", topic:"Animals", img: catImg},
    {word:"Cow", topic:"Animals", img: cowImg},
    {word:"Dog", topic:"Animals", img: dogImg},
    {word:"Elephant", topic:"Animals", img: elephantImg},
    {word:"Pig", topic:"Animals", img: pigImg},

    {word:"Africa", topic:"Continents", img: africaImg},
    {word:"Asia", topic:"Continents", img: asiaImg},
    {word:"Europe", topic:"Continents", img: europeImg},
    {word:"North America", topic:"Continents", img: northamericaImg},
    {word:"Oceania", topic:"Continents", img: oceaniaImg},
    {word:"South America", topic:"Continents", img: southamericaImg},

    {word:"Sunday", topic:"Days of the week", img: sundayImg},
    {word:"Monday", topic:"Days of the week", img: mondayImg},
    {word:"Tuesday", topic:"Days of the week", img: tuesdayImg},
    {word:"Wednesday", topic:"Days of the week", img: wednesdayImg},
    {word:"Thursday", topic:"Days of the week", img: thursdayImg},
    {word:"Friday", topic:"Days of the week", img: fridayImg},
    {word:"Saturday", topic:"Days of the week", img: saturdayImg},

    {word:"Barman", topic:"Jobs", img: barmanImg},
    {word:"Butcher", topic:"Jobs", img: butcherImg},
    {word:"Engineer", topic:"Jobs", img: engineerImg},
    {word:"Priest", topic:"Jobs", img: priestImg},
    {word:"Teacher", topic:"Jobs", img: teacherImg},

    {word:"Apple", topic:"Fruits", img: appleImg},
    {word:"Banana", topic:"Fruits", img: bananaImg},
    {word:"Orange", topic:"Fruits", img: orangeImg},
    {word:"Pear", topic:"Fruits", img: pearImg},
    {word:"Watermelon", topic:"Fruits", img: watermelonImg},
    
]

export { words, topics, alphabet}