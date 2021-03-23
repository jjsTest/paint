import React, {useEffect, useRef} from 'react';
import reactDom from 'react-dom';
import './App.css';

function App() {
  const canvasRef = useRef(null); 
  let pos = {
    x: -1,
    y: -1
  };
  let ct = null;
  let move = false;

   useEffect(() => {
     ct = canvasRef.current.getContext('2d');
     canvasRef.current.addEventListener("mousedown", startDraw);
     canvasRef.current.addEventListener("mousemove", drawing);
     canvasRef.current.addEventListener("mouseup", stopDraw);
     canvasRef.current.addEventListener("mouseout", stopDraw);

   },[]);

  function getPos(event){
    return(
      { 
        x: event.offsetX,
        y: event.offsetY
      }
    );

  }

  function startDraw(event){
    move = true;
    ct.beginPath();
    pos = {...getPos(event)};
    //alert(('x:'+pos.x+',y:'+pos.y));
    ct.moveTo(pos.x, pos.y);
  }

  function drawing(event){
    if(move){
   // pos ={...pos, ...getPos(event)};
    pos ={...getPos(event)};
    //onsole.log(('x:'+pos.x+',y:'+pos.y));
    ct.lineTo(pos.x, pos.y);
    ct.stroke();
    }
  }

  function stopDraw(event){
    move = false;
    pos = {
      x:-1,
      y:-1};
  }

  function redo(){
    ct=null;
  }
  return (
    <div className="App" >
      <h1>Paint</h1>
      <button id ="redo" onclick={redo}>Redo</button>
      <button id ="undo" onclick=";">Undo</button>
      <button id ="save" onclick=";">Save</button> <br/><br/>
      <canvas ref = {canvasRef} 
              style={{width:"800", height:"500", border: '1px solid black'}}/>

     {/* 탭처럼 굵기, 색상(글자, 배경) + 도형? */}

    </div>

  );
}

export default App;
