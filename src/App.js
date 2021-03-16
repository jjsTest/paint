import React, {useEffect, useRef} from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null); 
  const pos = {
    x: -1,
    y: -1
  };

  useEffect(() => {
    if(canvasRef.current){
      const ct = canvasRef.current.getContext('2d');
      canvasRef.current.addEventListener("mousedown");
      canvasRef.current.addEventListener("mousemove");
      canvasRef.current.addEventListener("mouseup");
      canvasRef.current.addEventListener("mouseout");
    }
  },[canvasRef.current]);

  function mousedown(event){
    ct.beginPath();
  }
  return (
    <div className ="App">
      <canvas ref = {canvasRef} 
              style={{width="500", height="300"}}
              onMouseDown={} />

    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}


export default App;
