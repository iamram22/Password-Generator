import React, { useEffect, useRef } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYzabcdefghijklmnopqrstuvwxy";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]`~";

    for (let i = 0; i < +length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    document.getElementById("copy").innerHTML = "Copied";
    document.getElementById("copy").style.backgroundColor = "green";

    window.navigator.clipboard.writeText(password);
  }, [password]);

  //useref Hook

  const passwordRef = useRef(null);

  return (
    <div class="body">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 my-20 text-orange-500 bg-stone-900 border-4 border-green-900">
        <h1 className="text-green-500 text-xl py-5 text-center pt-2">
          Password Generator (16 Character){" "}
        </h1>
        <div className="flex shadow text-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            id="copy"
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            COPY
          </button>
        </div>
        <div className="flex text-md gap-x-5">
          <div className="flex items-center gap-x-1 py-2">
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
