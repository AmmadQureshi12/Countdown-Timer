"use client"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Countdown() {

  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  //Function to Handle setting the duration of the countdoen 
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  //functio to start the coundown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };
  //Function to pause the countdown timeer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  //  Function  to reset the countdown timer
  const handleRest = (): void => {
    setIsActive(false)
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  //useEffect hok to mange the countown interval
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    // Return the formatted string
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  //Function to handle changes in the duration input failed
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");//update the duration state
  };
  //JSX return statment renderinf the countown UI
  return (
    //container div for centering the content
    <div className="flex flex-col item-center justify-center h-screen bg-gray-600 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/*Tittle of the count Down timer*/}
        <h1 className='text-2xl font-extrabold mb-4 text-gray-800 dark:text-gray-200 text-center'>
          CountDownTimer
        </h1>
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in second"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/*buttons to start, pause, and reset the timer*/}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className='text-gray-800 dark:text-gray-200'
          >
            {isPaused ? "Resume" : "start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className='text-gray-800 dark:text-gray-200'
          >
            pause
          </Button>
          <Button
            onClick={handleRest}
            variant="outline"
            className='text-gray-800 dark:text-gray-200'
          >
            Reset
          </Button>
        </div>
      </div>
    </div>

  );
};

