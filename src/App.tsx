import React, { useEffect, useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import Info from './components/Info';

function App() {

  const [color, setColor] = useState<Uint8ClampedArray | null>(null);
  const [position, setPosition] = useState<[number, number]>([0,0]);
  const [imgUrl, setImgUrl] = useState<string | null | ArrayBuffer>(null);


  function convertColorStr(color: Uint8ClampedArray | null) {
    if (color) {
      return "rgba(" + color.join(', ') + ')'
    }
    return "rgba(255, 255, 255, 255)"
  }



  return (
    <div className="App">
      <h1>try to find out the pixel color</h1>
      <div className='content'>
        <FileUploader
          setColor={setColor}
          setPosition={setPosition}
          id="img"
          className='img'
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        ></FileUploader>
        <Info
        color={convertColorStr(color)}
        position={position.map(num => Number(num.toFixed(2))) as [number, number]}
        ></Info>
      </div>
    </div>
  );
}

export default App;
