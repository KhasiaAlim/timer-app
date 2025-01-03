import React, { useState } from "react";
import './App.css';
import Timer from './components/Timer'
import Stopwatch from './components/Stopwatch'

function App() {
  const [activeTab, setActiveTab] = useState("timer"); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div id='btns'>
        <button id='timer-btn' style={{ marginRight: '15px'}}  onClick={() => handleTabClick('timer')}
          className={activeTab === 'timer' ? 'active-btn' : ''}
        >Timer</button>
        <button id='stopwatch-btn' onClick={() => handleTabClick('stopwatch')}
          className={activeTab === 'stopwatch' ? 'active-btn' : ''}
        >Stopwatch</button>
      </div>
      <div id='timer' style={{display: activeTab === 'timer' ? 'block' : 'none'}}>
        <br/>
      <Timer/>
      </div>
      <div id='stopwatch' style={{display: activeTab === 'stopwatch' ? 'block' : 'none',}} >
      <Stopwatch/>
      </div>
      <br/>
      <br/>
      <hr/>
      <div>
        <p>Made By Khasia Alim</p>
      </div>
    </div>
  );
}

export default App;
