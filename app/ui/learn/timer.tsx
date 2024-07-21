import { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

interface TimerProps {
  start: boolean;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ start, time, setTime }) => {
  const [isRunning, setIsRunning] = useState(start);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else if (isRunning) {
        timerRef.current = setInterval(() => {
          setTime(prevTime => prevTime - 1);
        }, 1000);
      }
    };
    
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      document.addEventListener('visibilitychange', handleVisibilityChange);
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
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, time]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <Typography variant="h4" className='border-2 border-dotted border-cyan-700 p-5 rounded-full col-span-2 w-fit'>
        {formatTime(time)}
      </Typography>
    </div>
  );
};

export default Timer;
