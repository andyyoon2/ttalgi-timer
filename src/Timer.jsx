import { createSignal } from 'solid-js';
import ControlButtons from './ControlButtons';
import TimerDisplay from './TimerDisplay';

/*
Timer states
POMO_READY
POMO_COUNTDOWN
BREAK_COUNTDOWN
PAUSE
SHORT_BREAK_READY
LONG_BREAK_READY
*/

export default function Timer() {
  const [time, setTime] = createSignal(0);
  const [pomoCount, setPomoCount] = createSignal(0);
  const [timerInterval, setTimerInterval] = createSignal(null);
  const [timerState, setTimerState] = createSignal('POMO_READY');

  function start() {
    let newTime;
    switch (timerState()) {
      case 'POMO_READY':
        newTime = 5 //25 * 60;
        setTimerState('POMO_COUNTDOWN');
        break;
      case 'SHORT_BREAK_READY':
        newTime = 2 //5 * 60;
        setTimerState('BREAK_COUNTDOWN');
        break;
      case 'LONG_BREAK_READY':
        newTime = 3 //10 * 60;
        setTimerState('BREAK_COUNTDOWN');
        break;
      default:
        return;
    }
    setTime(newTime);
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
          completeCountdown();
          return;
        }
        tick();
      }, 1000)
    );
  }

  function stopTimer() {
    clearTimeout(timerInterval());
    setTimerInterval(null);
  }

  function toggleCountdown() {
    if (timerState() === 'POMO_COUNTDOWN' || timerState() === 'BREAK_COUNTDOWN') {
      stopTimer();
      setTimerState('PAUSE');
    } else if (timerState() === 'PAUSE') {
      startTimer();
    } else {
      start();
    }
  }

  function resetTimer() {
    stopTimer();
    setTime(0);
    setTimerState('POMO_READY');
  }

  function completeCountdown() {
    stopTimer();
    if (timerState() === 'POMO_COUNTDOWN') {
      setPomoCount(pomoCount() + 1);
      if (pomoCount() % 4 === 0) {
        setTimerState('LONG_BREAK_READY');
      } else {
        setTimerState('SHORT_BREAK_READY');
      }
    } else {
      setTimerState('POMO_READY');
    }
  }

  return (
    <div>
      <TimerDisplay time={time()} />
      <ControlButtons
        timerState={timerState()}
        start={start}
        toggleCountdown={toggleCountdown}
        resetTimer={resetTimer}
      />
      <p>Pomos today: {pomoCount()}</p>
    </div>
  );
}
