import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface TimerProps {
    start: boolean;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
  }

  
const Timer: React.FC<TimerProps> = ({start,time,setTime}) => {
  const [isRunning, setIsRunning] = useState(start);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, time]);


  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
        <Typography variant="h4" className='border-2 border-dotted border-cyan-700 p-5 rounded-full col-span-2 w-fit'>{formatTime(time)}</Typography>
      {/*<Box mt={2}>
        {!isRunning ? (
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleStop}>
            Stop
          </Button>
        )}
        <Button variant="contained" onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset
        </Button>
      </Box>*/}
    </div>
  );
};

export default Timer;
