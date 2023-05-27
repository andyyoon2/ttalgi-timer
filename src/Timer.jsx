import { createSignal, createEffect } from 'solid-js';

/*
TODO: proper timer states
POMO_READY
COUNTDOWN
POMO_DONE
LONG_BREAK_READY
*/

export default function Timer() {
  const [time, setTime] = createSignal(0);
  const [timerInterval, setTimerInterval] = createSignal(null);
  const [timeDisplay, setTimeDisplay] = createSignal('Start');
  const [timerState, setTimerState] = createSignal('DONE');

  createEffect(() => {
    const min = Math.floor(time() / 60);
    const sec = time() % 60;
    setTimeDisplay(`${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`);
  });

  function start() {
    if (timerState === 'COUNTDOWN') {
      return;
    }
    setTimerState('COUNTDOWN');
    // setTime(25 * 60);
    setTime(5);
    startTimer();
  }

  function startTimer() {
    if (timerInterval()) {
      return;
    }
    tick();
  }

  function tick() {
    // TODO: Calculate drift to get most accurate timer
    setTimerInterval(
      setTimeout(() => {
        setTime(time() - 1);
        if (time() === 0) {
          resetTimer();
          return;
        }
        tick();
      }, 1000)
    );
  }

  function pauseTimer() {
    clearTimeout(timerInterval());
    setTimerInterval(null);
  }

  function resetTimer() {
    setTimerState('DONE');
    pauseTimer();
    setTime(0);
  }

  return (
    <div>
      <button onClick={start}>Start</button>
      <h2>{timeDisplay()}</h2>
      {/* <p>{timerState()}</p> */}
    </div>
  );
}
