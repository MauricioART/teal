import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface TimeSelectorProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ time , setTime}) => {

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };
  
  useEffect(()=>{
    setTime(60 * minutes + seconds);
  },[minutes,seconds]);

  return (
    <div className='flex flex-col justify-center items-center mt-10 mb-10'>
      <div className='flex flex-col w-fit'>
        <div className='flex justify-evenly'>
          <div onClick={() => { if (minutes < 30) setMinutes(minutes + 1); }}>
            <KeyboardArrowUpIcon key={"minutesUp"} className='hover:pb-1' />
          </div>
          <div onClick={() => { if (seconds < 60) setSeconds(seconds + 1); }}>
            <KeyboardArrowUpIcon key={"secondsUp"} className='hover:pb-1' />
          </div>
        </div>
        <Typography variant="h3" className='border-2 border-dotted border-cyan-700 p-5 rounded-full col-span-2 w-fit'>{formatTime(time)}</Typography>
        <div className='flex justify-evenly'>
          <div onClick={() => { if (minutes > 0) setMinutes(minutes - 1); }}>
            <KeyboardArrowDownIcon key={"minutesDwn"} className='hover:pt-1' />
          </div>
          <div onClick={() => { if (seconds > 0) setSeconds(seconds - 1); }}>
            <KeyboardArrowDownIcon key={"secondsDwn"} className='hover:pt-1' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
