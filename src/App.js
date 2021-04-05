import React, {useEffect, useRef, useState,useCallback} from 'react';
import {CirclePicker} from 'react-color';
//import reactDom from 'react-dom';
import './App.css';

function App() {
  const canvasRef = useRef(null); 
  let pos = {
    x: -1,
    y: -1
  };
  let ct = null;
  let move = false;

  const [lineWidth, setLineWidth] = useState(1);  //선 굵기
  const [bgColor,setBgColor] = useState('#ff3399');

  //선 굵기 증가
  const onIncrease= useCallback(() => {
    setLineWidth(lineWidth=>lineWidth +5);
    ct.lineWidth = ct.lineWidth+5;
    console.log("onincrease_lnewidth:"+lineWidth);
    console.log("onincrease_ct.linewidth:"+ct.lineWidth);
  },[]);

  //선 굵기 감소
  const onDecrease= useCallback(() => {
   setLineWidth(lineWidth=>lineWidth-5);
    ct.lineWidth = ct.lineWidth-5;
    console.log("ondecrease_lnewidth:"+lineWidth);
    console.log("ondecrease_ct.linewidth:"+ct.lineWidth);
  },[]);

  //배경색 변경
  const onBgColorChange= (color) => {
    console.log("bgcolor:"+bgColor);
    //bgColor.current = color.hex;
    setBgColor(color.hex);
    console.log("postbgcolor:"+bgColor);
     ct.fillStyle=bgColor;
     ct.fillRect(0,0,ct.width,ct.height);
  };

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
    //ct.lineWidth = lineWidth;
    //console.log("startDraw_lineWidth:"+lineWidth);
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
      <button id ="redo" onClick={redo}>Redo</button>
      <button id ="undo" onClick=";">Undo</button>
      <button id ="save" onClick=";">Save</button> <br/><br/>
      <canvas ref = {canvasRef} 
              style={{width:"800", 
                      height:"500", 
                      border: '1px solid black', 
                      backgroundColor: bgColor}}/>

      <h5>굵기</h5>
      <button onClick={onDecrease}>-</button>
      {lineWidth}
      <button onClick={onIncrease}>+</button>
      <h5>글자색</h5>
      <div>
        {/* <FontColorPicker color={color} onchange={onchange} /> */}
      </div>
      <h5>배경색</h5>
      <div>
        {/* <CirclePicker color={bgColor} onChange={(color) => {setBgColor(color.hex)}} /> */}
        <CirclePicker color={bgColor} onChangeComplete={onBgColorChange} />
      </div> 
    </div>

  );
}

export default App;