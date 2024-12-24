import React, { useState } from "react";
import PropTypes from "prop-types";

const toplevel = "qwertyuiop";
const midlevel = "asdfghjkl";
const lowerlevel = "zxcvbnm";
const sentence =
  "Here are 4 ways to split a word into an array of characters.  is the most common and more robust way. But with the addition of ES6, there are more tools in the JS arsenal to play with ";
const desc = [...sentence];

const toplevelarr = [...toplevel];
const midlevelarr = [...midlevel];
const lowerlevelarr = [...lowerlevel];

function App() {
  let c = 0;
  if (localStorage.getItem("counter") != null)
    c = parseInt(localStorage.getItem("counter"), 10);
  const [pressedKeys, setPressedKeys] = useState({});
  const [counter, setCounter] = useState(c);

  function reset() {
    setCounter(0);
    setPressedKeys({});
    localStorage.setItem("counter", 0);
  }

  function handleKeyPressed(e) {
    const { key } = e;
    if (key === desc[counter]) {
      setCounter((prev) => {
        const newCounter = prev + 1;
        localStorage.setItem("counter", newCounter);
        return newCounter;
      });
    }
    console.log(counter);
    setPressedKeys((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  }

  function handleKeyUp(e) {
    const { key } = e;
    setPressedKeys((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  }

  return (
    <div
      className="w-screen h-screen bg-brown-primary flex items-center flex-col pt-[100px] p-[100px]"
      onKeyDownCapture={handleKeyPressed}
      onKeyUpCapture={handleKeyUp}
      tabIndex="0"
    >
      <h1 className="text-[100px] text-emerald-300">Typing Test</h1>
      <TextArea desc={desc} counter={counter} />
      <Keyboard pressedKeys={pressedKeys} />
      <button
        className="bg-blue-500 text-white px-5 py-2.5 rounded-full cursor-pointer mt-10"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;

function TextArea({ desc, counter }) {
  return (
    <div className="mt-[100px] flex flex-wrap">
      {desc.map((elem, i) => (
        <p
          className={`text-2xl ${
            counter > i ? "text-emerald-400" : "text-brown-light"
          }`}
          key={i}
        >
          {elem === " " ? "_" : elem}
        </p>
      ))}
    </div>
  );
}

TextArea.propTypes = {
  desc: PropTypes.arrayOf(PropTypes.string).isRequired,
  counter: PropTypes.number.isRequired,
};

function Keyboard({ pressedKeys }) {
  return (
    <div className="flex flex-col items-center mt-10 border-2 p-4">
      <div className="flex gap-x-2 mt-6">
        {toplevelarr.map((elem, i) => (
          <Key temp={elem} key={i} isPressed={pressedKeys[elem]} />
        ))}
      </div>
      <div className="flex gap-x-2 mt-6">
        {midlevelarr.map((elem, i) => (
          <Key temp={elem} key={i} isPressed={pressedKeys[elem]} />
        ))}
      </div>
      <div className="flex gap-x-2 mt-6">
        {lowerlevelarr.map((elem, i) => (
          <Key temp={elem} key={i} isPressed={pressedKeys[elem]} />
        ))}
      </div>
    </div>
  );
}

function Key({ temp, isPressed }) {
  return (
    <div
      className={`w-[75px] h-[65px] ${
        isPressed ? "bg-slate-500" : "bg-slate-400"
      } border-4 border-red-400 text-3xl flex items-center justify-center`}
    >
      {temp}
    </div>
  );
}
