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
  const [timeDisplay, setTimeDisplay] = createSignal('Start');
  const [timerState, setTimerState] = createSignal('DONE');

  createEffect(() => {
    const min = Math.floor(time() / 60);
    const sec = time() % 60;
    setTimeDisplay(`${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`);
  });

  function start() {
    if (timerState === 'counting') {
      return;
    }
    setTimerState('counting');
    setTime(25 * 60);
  }

  return (
    <div>
      <button onClick={start}>Start</button>
      <h2>{timeDisplay()}</h2>
    </div>
  );
}
