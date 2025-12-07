import React, { useEffect, useState } from "react";
import "./App.css";

// Background images
import background1 from "./assets/bg1.jpg";
import background2 from "./assets/bg2.jpg";
import background3 from "./assets/bg3.jpg";
import background4 from "./assets/bg4.jpg";
import background5 from "./assets/bg5.jpg";
import background6 from "./assets/bg6.jpg";
import background7 from "./assets/bg7.jpg";

const bgImages = {
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7
};

export default function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState("default");
  const [bgImage, setBgImage] = useState("background1");

  // ✅ Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (!isNaN(e.key)) input(e.key);
      if (["+", "-", "*", "/"].includes(e.key)) input(e.key);
      if (e.key === "Enter") calculate();
      if (e.key === "Backspace") setDisplay(display.slice(0, -1) || "0");
      if (e.key.toLowerCase() === "c") clear();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [display]);

  // ✅ Touch vibration for mobile
  function vibrate() {
    if (navigator.vibrate) navigator.vibrate(40);
  }

  function input(value) {
    vibrate();
    setDisplay(display === "0" ? value : display + value);
  }

  function clear() {
    vibrate();
    setDisplay("0");
  }

  function calculate() {
    vibrate();
    try {
      const result = eval(display.replace("π", Math.PI).replace("e", Math.E));
      setHistory([{ exp: display, res: result }, ...history]);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  }

  function scientific(op) {
    vibrate();
    try {
      let x = eval(display);
      let result;

      if (op === "sin") result = Math.sin(x);
      if (op === "cos") result = Math.cos(x);
      if (op === "tan") result = Math.tan(x);
      if (op === "log") result = Math.log10(x);
      if (op === "sqrt") result = Math.sqrt(x);

      setHistory([{ exp: `${op}(${display})`, res: result }, ...history]);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  }

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${bgImages[bgImage]})` }}
    >
      {/* ✅ HEADER */}
      {/* HEADER */}
      <div className="app-header">
        <h1 className="logo-text">MiniCalc</h1>
        <div className="git-credit">
          <svg height="22" viewBox="0 0 16 16" width="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
            -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
            -3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
            2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04
            2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
            1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
            0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8
            c0-4.42-3.58-8-8-8Z"
            />
          </svg>
          <span>by shweta-todgire</span>
        </div>
      </div>

      {/* ✅ BACKGROUND BUTTONS */}
      <div className="bg-panel">
        {Object.keys(bgImages).map((key) => (
          <button
            key={key}
            onClick={() => {
              setBgImage(key);
              vibrate();
            }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ✅ CALCULATOR */}
      <div className={`calculator ${theme}`}>
        <div
          className="history-btn"
          onClick={() => setShowHistory(!showHistory)}
        >
          ↺
        </div>

        <div className="display">{display}</div>

        <div className="buttons">
          <button onClick={clear} className="op">C</button>
          <button onClick={() => scientific("sin")}>sin</button>
          <button onClick={() => scientific("cos")}>cos</button>
          <button onClick={() => scientific("tan")}>tan</button>
          <button onClick={() => input("/")}>÷</button>

          <button onClick={() => input("7")}>7</button>
          <button onClick={() => input("8")}>8</button>
          <button onClick={() => input("9")}>9</button>
          <button onClick={() => input("*")} className="op">×</button>
          <button onClick={() => scientific("log")}>log</button>

          <button onClick={() => input("4")}>4</button>
          <button onClick={() => input("5")}>5</button>
          <button onClick={() => input("6")}>6</button>
          <button onClick={() => input("-")} className="op">−</button>
          <button onClick={() => scientific("sqrt")}>√</button>

          <button onClick={() => input("1")}>1</button>
          <button onClick={() => input("2")}>2</button>
          <button onClick={() => input("3")}>3</button>
          <button onClick={() => input("+")} className="op">+</button>
          <button onClick={() => input("π")}>π</button>

          <button onClick={() => input("0")}>0</button>
          <button onClick={() => input(".")}>.</button>
          <button onClick={() => input("e")}>e</button>
          <button onClick={calculate} className="op">=</button>
          <button onClick={() => input("**")}>xʸ</button>
        </div>

        {/* ✅ HISTORY PANEL — ONLY RENDERS WHEN BUTTON CLICKED */}
        {showHistory && (
          <div className="history show">
            {history.length === 0
              ? "No History"
              : history.map((h, i) => (
                  <div key={i}>
                    {h.exp} = {h.res}
                  </div>
                ))}
          </div>
        )}
      </div>

      {/* ✅ THEME SELECT */}
      <div className="theme-panel">
        <select onChange={(e) => setTheme(e.target.value)}>
          <option value="default">Theme</option>
          <option value="dark">Dark</option>
          <option value="minimal">Minimal</option>
          <option value="pastel">Pastel</option>
          <option value="nature">Nature</option>
          <option value="retro">Retro</option>
          <option value="professional">Professional</option>
        </select>
      </div>
    </div>
  );
}