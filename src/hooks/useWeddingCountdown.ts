"use client";

import { useEffect, useState } from "react";

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isMounted: boolean;
}

const INITIAL_STATE: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPast: false,
  isMounted: false,
};

function calculateCountdown(targetTimestamp: number): CountdownState {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0 || Number.isNaN(difference)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      isMounted: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    isMounted: true,
  };
}

/**
 * Live countdown hook synchronized to a target ISO date string.
 * Defers time calculation until mount to guarantee clean SSR hydration.
 */
export function useWeddingCountdown(targetDateIso: string): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>(INITIAL_STATE);

  useEffect(() => {
    const targetTimestamp = new Date(targetDateIso).getTime();

    const tick = () => {
      setCountdown(calculateCountdown(targetTimestamp));
    };

    const initialTimer = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [targetDateIso]);

  return countdown;
}
