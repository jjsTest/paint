import React, {useEffect, useRef, useState,useCallback} from 'react';
import {CirclePicker,HuePicker} from 'react-color';
//import reactDom from 'react-dom';
import './App.css';

function App() {
  const canvasRef = useRef(null); 
  const contextRef = useRef(null);
  const lineColorRef = useRef('#fff');
  let pos = {
    x: -1,
    y: -1
  };
  let context = null;
  let move = false;

  const [lineWidth, setLineWidth] = useState(1);  //선 굵기
  //const [bgColor,setBgColor] = useState('#ffffff');

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth/2}px`;
    canvas.style.height = `${window.innerHeight/2}px`;
    canvas.style.border= '2px solid black';
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseout", stopDraw);

    context = canvas.getContext('2d');
    context.scale(2, 2);
    //context.lineWidth = 1;
    //context.strokeStyle = {lineColor};
    context.strokeStyle = '#000000';
    //console.log("useEffect_lineColor:"+lineColor);
    context.fillStyle ='#000000';
    context.fillRect(0,0,context.width,context.height);
    contextRef.current = context;

  },[]);

  //reset
  const onReset =() => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.style.backgroundColor='#ffffff';
  }

  //download
  const onDownload =() => {
    console.log("ggggggggg:");
    const URI = canvasRef.current.toDataURL("image/png");
    var aTag = document.createElement("a");
    aTag.href=URI;
    aTag.download="image.png";
    aTag.click();
  
    //Router.push({URI});

  }

  //선 굵기 증가
  const onIncrease= useCallback(() => {
    setLineWidth(lineWidth=>lineWidth +5);
    contextRef.current.lineWidth = contextRef.current.lineWidth+5;
    console.log("onincrease_lnewidth:"+lineWidth);
    console.log("onincrease_context.linewidth:"+context.lineWidth);
  },[]);

  //선 굵기 감소
  const onDecrease= useCallback(() => {
   setLineWidth(lineWidth=>lineWidth-5);
   contextRef.current.lineWidth = contextRef.current.lineWidth-5;
    console.log("ondecrease_lnewidth:"+lineWidth);
    console.log("ondecrease_context.linewidth:"+context.lineWidth);
  },[]);

  //라인색 변경
  const onLineColorChange= (color) => {
    //console.log("lineColor:"+lineColor);
    console.log("colorHex:"+color.hex);
    //bgColor.current = color.hex;
    //setLineColor(color=>color.hex);
    //console.log("postbgcolor:"+lineColor);
    contextRef.current.strokeStyle=color.hex;
    lineColorRef.current=color.hex;
  };

  //지우기 기능
  const onCheckboxChange = (e) =>{
    console.log("e.target.checked:"+e.target.checked);
    if(e.target.checked == true){
      //console.log("context.strokeStyle_before:"+context.strokeStyle);
      contextRef.current.strokeStyle=canvasRef.current.style.backgroundColor;
      //console.log("context.strokeStyle_after:"+context.strokeStyle);
    }else{
      console.log("lineColorRef.current:"+lineColorRef.current);
      contextRef.current.strokeStyle=lineColorRef.current;
    }
  }

  //배경색 변경
  const onBgColorChange= (color) => {
    console.log("bgcolor:"+color.hex);
    //bgColor.current = color.hex;
    //setBgColor(color.hex);
    //context.fillStyle=color.hex;
    canvasRef.current.style.backgroundColor=color.hex
    //console.log("context.fillStyle:"+context.fillStyle);
    //context.fillRect(0,0,context.width,context.height);
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

  return (
    <div className="App" >
      <h1>Paint</h1>
      <button id ="reset" onClick={onReset}>reset</button>
      <button id ="download"  onClick={onDownload}>download</button> <br/><br/>
      <canvas ref = {canvasRef} />
              {/* style={{width:`${window.innerWidth}px`, 
                      height:`${window.innerHeight}px`, 
                      border: '1px solid black',
                      backgroundColor: '#fff' }}/> */}

      <h5>굵기</h5>
      <button onClick={onDecrease}>-</button>
      {lineWidth}
      <button onClick={onIncrease}>+</button>
      <h5>글자색</h5>
      <div className = "huePicker">
        <HuePicker color='#000000' onChangeComplete={onLineColorChange} /> 
      </div>
      <input type="checkbox" onChange={onCheckboxChange}/><h5>지우개</h5>
      <h5>배경색</h5>
      <div className = "circlePicker">
        {/* <CirclePicker color={bgColor} onChange={(color) => {setBgColor(color.hex)}} /> */}
        <CirclePicker color='#ffc0cb' onChangeComplete={onBgColorChange} />
      </div> 
    </div>

//위치정렬
  );
}

export default App;
