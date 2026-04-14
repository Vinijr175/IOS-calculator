import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [shouldReset, setShouldReset] = useState(false);

  const handleInput = (value) => {
    // 1. Clear Logic
    if (value === 'AC') {
      setDisplay("0");
      setEquation("");
      setShouldReset(false);
      return;
    }

    // 2. Equals/Calculation Logic
    if (value === '=') {
      try {
        const mathFormat = equation.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(mathFormat);

        // Standardize result display
        if (Math.abs(result) > 999999999) {
          result = result.toExponential(4);
        } else {
          result = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
        }

        setDisplay(String(result));
        setEquation(String(result));
        setShouldReset(true);
      } catch {
        setDisplay("Error");
      }
      return;
    }

    // 3. Operator Logic
    if (['+', '-', '×', '÷'].includes(value)) {
      setShouldReset(true);
      setEquation(prev => {
        const lastChar = prev.slice(-1);
        // Replace operator if user clicks a different one immediately
        if (['+', '-', '×', '÷'].includes(lastChar)) return prev.slice(0, -1) + value;
        return prev + value;
      });
      return;
    }

    // 4. Number Input Logic
    if (shouldReset) {
      setDisplay(value);
      setEquation(prev => {
        // If we just clicked '=', start fresh. If we clicked an operator, append.
        const lastChar = prev.slice(-1);
        return ['+', '-', '×', '÷'].includes(lastChar) ? prev + value : value;
      });
      setShouldReset(false);
    } else {
      setDisplay(prev => (prev === "0" ? value : prev + value));
      setEquation(prev => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <div className="calculator-wrapper">
      <div className="result-display">{display}</div>
      <div className="button-grid">
        <button className="button-gray" onClick={() => handleInput('AC')}>AC</button>
        <button className="button-gray" onClick={() => handleInput('+/-')}>+/-</button>
        <button className="button-gray" onClick={() => handleInput('%')}>%</button>
        <button className="button-orange" onClick={() => handleInput('÷')}>÷</button>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button className="button-orange" onClick={() => handleInput('×')}>×</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button className="button-orange" onClick={() => handleInput('-')}>-</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button className="button-orange" onClick={() => handleInput('+')}>+</button>
        <button className="button-zero" onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button className="button-orange" onClick={() => handleInput('=')}>=</button>
      </div>
    </div>
  );
}

export default App;
