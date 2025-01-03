import React, { useState, useEffect } from "react";

export default function Stopwatch() {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const [isRunning, setIsRunning] = useState(false);

    const defaultBackgroundColor = "#e5edff"; 
    const pausedBackgroundColor = "#ffeed9"; 
    const defaultButtonColor = "#a3c5ff"; 
    const pausedButtonColor = "#ffcd6c"; 

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    let { hours, minutes, seconds, milliseconds } = prevTime;

                    milliseconds += 10; // Increment by 10 ms
                    if (milliseconds >= 1000) {
                        milliseconds = 0;
                        seconds += 1;
                    }
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes += 1;
                    }
                    if (minutes >= 60) {
                        minutes = 0;
                        hours += 1;
                    }

                    return { hours, minutes, seconds, milliseconds };
                });
            }, 10); // Update every 10 ms
        }

        return () => clearInterval(interval); // Cleanup interval on pause or unmount
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
        document.body.style.backgroundColor = defaultBackgroundColor; // Reset background color on start
    
        // Reset all button colors to defaultButtonColor
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          button.style.backgroundColor = defaultButtonColor; // Reset button color
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

    const handleReset = () => {
        setIsRunning(false);
        setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        document.body.style.backgroundColor = defaultBackgroundColor; // Reset background color
    
        // Reset all button colors to defaultButtonColor
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          button.style.backgroundColor = defaultButtonColor; // Reset button color
        });
    };

    const formatTime = (unit) => String(unit).padStart(2, "0"); // Add leading zeros

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ fontSize: "2rem", marginBottom: "20px" }}>
                {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}.
                {String(time.milliseconds).padStart(3, "0")}
            </div>
            <br />
            <br />
            <br />
            <div>
                {!isRunning ? (
                    <button className="btn start" style={{ width: '300px' }} onClick={handleStart}> <img height={15} src="./images/1.png"></img></button>
                ) : (
                    <>
                        <button className="btn" style={{ width: '200px' }} onClick={handlePause}><img height={23} src="./images/3.png"></img></button>
                        <button className="btn" style={{ width: '200px' }} onClick={handleReset}><img height={20} src="./images/2.png"></img></button>
                    </>
                )}
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};
