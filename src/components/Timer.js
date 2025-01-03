import React, { useState, useEffect } from "react";
import './Timer.css'

export default function Timer() {
  const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 0 }); // Initial time is 1:00:00
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [originalTime] = useState({ hours: 1, minutes: 0, seconds: 0 }); // Store original time

  const defaultBackgroundColor = "#e5edff"; 
  const pausedBackgroundColor = "#ffeed9"; 
  const defaultButtonColor = "#a3c5ff"; 
  const pausedButtonColor = "#ffcd6c"; 

  // Set the default background color and button color on mount
  useEffect(() => {
    document.body.style.backgroundColor = defaultBackgroundColor; // Set default background color
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.backgroundColor = defaultButtonColor; // Set default button color
    });
  }, []);

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          } else {
            // Timer ends
            setIsRunning(false);
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval); // Cleanup interval on unmount or pause
  }, [isRunning]);

  // Handle the time change in input fields
  const handleTimeChange = (unit, value) => {
    setTime((prevTime) => ({
      ...prevTime,
      [unit]: Math.max(0, value), // Ensure time is not negative
    }));
  };

  // Handle time increment buttons (+1:00, +0:30)
  const handleTimeIncrement = (unit, increment) => {
    setTime((prevTime) => {
      if (unit === 'hours') {
        return { ...prevTime, hours: prevTime.hours + increment };
      } else if (unit === 'minutes') {
        let newMinutes = prevTime.minutes + increment;
        let newHours = prevTime.hours;

        if (newMinutes >= 60) {
          newMinutes -= 60;
          newHours += 1;
        }
        return { ...prevTime, minutes: newMinutes, hours: newHours };
      } else if (unit === 'seconds') {
        let newSeconds = prevTime.seconds + increment;
        let newMinutes = prevTime.minutes;
        let newHours = prevTime.hours;

        if (newSeconds >= 60) {
          newSeconds -= 60;
          newMinutes += 1;
        }

        if (newMinutes >= 60) {
          newMinutes -= 60;
          newHours += 1;
        }
        return { ...prevTime, seconds: newSeconds, minutes: newMinutes, hours: newHours };
      }
      return prevTime;
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    document.body.style.backgroundColor = pausedBackgroundColor; // Change background color on pause

    // Change all button colors to pausedButtonColor
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.backgroundColor = pausedButtonColor; // Change button color
    });
  };

  const handleStart = () => {
    setIsRunning(true);
    document.body.style.backgroundColor = defaultBackgroundColor; // Reset background color on start

    // Reset all button colors to defaultButtonColor
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.backgroundColor = defaultButtonColor; // Reset button color
    });
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTime(originalTime); // Reset to original time
    document.body.style.backgroundColor = defaultBackgroundColor; // Reset background color

    // Reset all button colors to defaultButtonColor
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.backgroundColor = defaultButtonColor; // Reset button color
    });
  };

  return (
    <div style={{textAlign: 'center', marginTop: '100px'}}>
      <div>
        <input
          type="number"
          value={time.hours}
          onChange={(e) => handleTimeChange('hours', parseInt(e.target.value))}
          min="0"
        />
        <span>:</span>
        <input
          type="number"
          value={time.minutes}
          onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value))}
          min="0"
          max="59"
        />
        <span>:</span>
        <input
          type="number"
          value={time.seconds}
          onChange={(e) => handleTimeChange('seconds', parseInt(e.target.value))}
          min="0"
          max="59"
        />
      </div>
      <div>
        <button className="btn" style={{ fontSize: '12px', fontWeight: '600', padding: '10px 20px'}} onClick={() => handleTimeIncrement('hours', 1)}>+1:00:00</button>
        <button className="btn" style={{fontSize: '12px', fontWeight: '600', padding: '10px 20px'}} onClick={() => handleTimeIncrement('minutes', 1)}>+1:00</button>
        <button className="btn" style={{fontSize: '12px', fontWeight: '600', padding: '10px 20px'}} onClick={() => handleTimeIncrement('seconds', 30)}>+0:30</button>
      </div>
      <br/>
      <br/>
      <br/>
      <div>
        {!isRunning ? (
          <button className="btn start" style={{ width: '300px'}} onClick={handleStart}> <img height={15} src="./images/1.png"></img></button>
        ) : (
          <>
            <button className="btn" style={{ width: '200px'}} onClick={handlePause}> <img height={23} src="./images/3.png"></img></button>
            <button className="btn" style={{ width: '200px'}} onClick={handleRestart}> <img height={20} src="./images/2.png"></img></button>
          </>
        )}
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
};