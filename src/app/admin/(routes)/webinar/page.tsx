'use client';

import React, { ChangeEvent, useState } from 'react';

const TimePicker = () => {
  const [time, setTime] = useState('12:00');

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className='flex flex-col items-center mt-[200px]'>
      <label htmlFor='time' className='text-lg mb-2'>
        Select a time:
      </label>
      <input
        type='time'
        id='time'
        name='time'
        value={time}
        onChange={handleTimeChange}
        className='border rounded-md py-1 px-2'
      />
    </div>
  );
};

export default TimePicker;
