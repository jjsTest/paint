import React, {useEffect, useRef, useState,useCallback} from 'react';
import {CirclePicker,HuePicker} from 'react-color';
import { Route, Link } from 'react-router-dom';
//import reactDom from 'react-dom';
import './App.css';

function App() {
  const canvasRef = useRef(null); 
  //const contextRef = useRef(null);
  let pos = {
    x: -1,
    y: -1
  };
  let context = null;
  let move = false;

  const [lineWidth, setLineWidth] = useState(1);  //선 굵기
  const [bgColor,setBgColor] = useState('#ffffff');
  const [lineColor,setLineColor] = useState('#ff3399');

  useEffect(() => {
    //canvasRef.current.width = window.innerWidth * 2;
    //canvasRef.current.height = window.innerHeight * 2;
    //canvasRef.current.style.width = `${window.innerWidth}px`;
    //canvasRef.current.style.height = `${window.innerHeight}px`;
    canvasRef.current.addEventListener("mousedown", startDraw);
    canvasRef.current.addEventListener("mousemove", drawing);
    canvasRef.current.addEventListener("mouseup", stopDraw);
    canvasRef.current.addEventListener("mouseout", stopDraw);

    context = canvasRef.current.getContext('2d');
    //context.lineWidth = 1;
    //context.strokeStyle = {lineColor};
    //context.fillStyle = {bgColor};
    //context.fillRect(0,0,context.width,context.height);
    //contextRef.current = context;

  },[]);

  //reset
  const onReset =() => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  //download
  const onDownload =() => {
    const URI = canvasRef.current.toDataURL("image_yyyymmdd/jpg");
    Router.push({URI});

  }

  //선 굵기 증가
  const onIncrease= useCallback(() => {
    setLineWidth(lineWidth=>lineWidth +5);
    context.lineWidth = context.lineWidth+5;
    console.log("onincrease_lnewidth:"+lineWidth);
    console.log("onincrease_context.linewidth:"+context.lineWidth);
  },[]);

  //선 굵기 감소
  const onDecrease= useCallback(() => {
   setLineWidth(lineWidth=>lineWidth-5);
   context.lineWidth = context.lineWidth-5;
    console.log("ondecrease_lnewidth:"+lineWidth);
    console.log("ondecrease_context.linewidth:"+context.lineWidth);
  },[]);

  //라인색 변경
  const onLineColorChange= (color) => {
    console.log("lineColor:"+lineColor);
    //bgColor.current = color.hex;
    setLineColor(color.hex);
    console.log("postbgcolor:"+lineColor);
    context.strokeStyle=lineColor;
  };


  //배경색 변경
  const onBgColorChange= (color) => {
    console.log("bgcolor:"+bgColor);
    //bgColor.current = color.hex;
    setBgColor(color.hex);
    console.log("postbgcolor:"+bgColor);
    context.fillStyle=bgColor;
    context.fillRect(0,0,context.width,context.height);
  };

  function getPos(event){
    return(
      { 
        x: event.offsetX,
        y: event.offsetY
      }
    );

  }

  //const startDraw = (event) => {
  function startDraw(event){
    move = true;
    context.beginPath();
    //context.lineWidth = lineWidth;
    //console.log("startDraw_lineWidth:"+lineWidth);
    pos = {...getPos(event)};
    //alert(('x:'+pos.x+',y:'+pos.y));
    context.moveTo(pos.x, pos.y);
  }

  function drawing(event){
    if(move){
   // pos ={...pos, ...getPos(event)};
    pos ={...getPos(event)};
    //onsole.log(('x:'+pos.x+',y:'+pos.y));
    context.lineTo(pos.x, pos.y);
    context.stroke();
    }
  }

  function stopDraw(event){
    move = false;
    pos = {
      x:-1,
      y:-1};
  }

  function redo(){
    context=null;
  }
  return (
    <div className="App" >
      <h1>Paint</h1>
      {/* <button id ="undo" onClick=";">Undo</button> */}
      <button id ="reset" onClick={onReset}>reset</button>
      <button id ="download"  onClick={onDownload}>download</button> <br/><br/>
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
        <HuePicker color={lineColor} onChangeComplete={onLineColorChange} /> 
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
