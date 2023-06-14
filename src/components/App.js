// import React, { useRef, useState } from 'react'
// import '../styles/App.css';
// const App = () => {
//   const startTime = useRef(0);
//   const intervalRef = useRef(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [laps, setLaps] = useState([]);

//   return (
//     <div id="main">
//       <section>
//         <h1 className='seconds-elapsed'>Stopwatch Time</h1>
//         <section className='buttons'>
//           <button className="start-btn">START</button>
//           <button className="stop-btn">STOP</button>
//           <button className="lap-btn">LAP</button>
//           <button className="reset-btn">RESET</button>
//         </section>
//       </section>
//       <section className='lap-section'>
//         <h2>Laps</h2>
//         <section className='laps'>
//           <p>lap</p>
//           <p>lap</p>
//           <p>lap</p>
//         </section>
//       </section>
//     </div>
//   )
// }


// export default App;

import React, { useRef, useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isLapSectionVisible, setIsLapSectionVisible] = useState(false);

  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime((Date.now() - startTime.current) / 1000);
    };

    intervalRef.current = setInterval(updateTime, 10);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    if (intervalRef.current !== 0) {
      return; // Timer is already running, ignore the click
    }

    startTime.current = Date.now() - currentTime * 1000;

    intervalRef.current = setInterval(() => {
      setCurrentTime((Date.now() - startTime.current) / 1000);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };

  const handleLap = () => {
    const lapTime = currentTime.toFixed(3);
    setLaps((prevLaps) => [...prevLaps, lapTime]);
    setIsLapSectionVisible(true);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setLaps([]);
    setIsLapSectionVisible(false);
    startTime.current = Date.now();
  };

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">{currentTime.toFixed(3)}</h1>
        <section className="buttons">
          <button className="start-btn" onClick={handleStart}>
            START
          </button>
          <button className="stop-btn" onClick={handleStop}>
            STOP
          </button>
          <button className="lap-btn" onClick={handleLap}>
            LAP
          </button>
          <button className="reset-btn" onClick={handleReset}>
            RESET
          </button>
        </section>
      </section>
      {isLapSectionVisible && (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps.map((lap, index) => (
              <p key={index}>{lap}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  );
};

export default App;
