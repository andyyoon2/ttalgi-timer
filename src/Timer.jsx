import { createSignal, onCleanup } from 'solid-js';
import ControlButtons from './ControlButtons';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TimerSelectors from './TimerSelectors/TimerSelectors';

/*
Timer states
POMO_READY
SHORT_BREAK_READY
LONG_BREAK_READY
POMO_COUNTDOWN
SHORT_BREAK_COUNTDOWN
LONG_BREAK_COUNTDOWN
POMO_PAUSE
SHORT_BREAK_PAUSE
LONG_BREAK_PAUSE
*/

const POMO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

export default function Timer() {
  const [time, setTime] = createSignal(25 * 60);
  const [pomoCount, setPomoCount] = createSignal(0);
  const [timerId, setTimerId] = createSignal(null);
  const [timerState, setTimerState] = createSignal('POMO_READY');

  onCleanup(() => clearTimeout(timerId()));

  function start() {
    let newTime;
    switch (timerState()) {
      case 'POMO_READY':
        newTime = POMO_TIME;
        setTimerState('POMO_COUNTDOWN');
        break;
      case 'SHORT_BREAK_READY':
        newTime = SHORT_BREAK_TIME;
        setTimerState('SHORT_BREAK_COUNTDOWN');
        break;
      case 'LONG_BREAK_READY':
        newTime = LONG_BREAK_TIME;
        setTimerState('LONG_BREAK_COUNTDOWN');
        break;
      default:
        return;
    }
    setTime(newTime);
    startTimer();
  }

  function startTimer() {
    if (timerId()) {
      return;
    }
    tick();
  }

  function tick() {
    // TODO: Calculate drift to get most accurate timer
    setTimerId(
      setTimeout(() => {
        setTime(time => time - 1);
        if (time() === 0) {
          completeCountdown();
          return;
        }
        tick();
      }, 1000)
    );
  }

  function stopTimer() {
    clearTimeout(timerId());
    setTimerId(null);
  }

  function toggleCountdown() {
    switch (timerState()) {
      case 'POMO_COUNTDOWN':
        stopTimer();
        setTimerState('POMO_PAUSE');
        break;
      case 'BREAK_COUNTDOWN':
        stopTimer();
        setTimerState('BREAK_PAUSE');
        break;
      case 'POMO_PAUSE':
        startTimer();
        setTimerState('POMO_COUNTDOWN');
        break;
      case 'BREAK_PAUSE':
        startTimer();
        setTimerState('BREAK_COUNTDOWN');
        break;
      default:
        start();
    }
  }

  function resetTimer() {
    if (timerState() !== 'POMO_COUNTDOWN' || timerState() !== 'BREAK_COUNTDOWN') {
      return;
    }
    stopTimer();
    if (timerState() === 'POMO_COUNTDOWN') {
      setTime(POMO_TIME);
      setTimerState('POMO_READY');
    } else {
      setTime(SHORT_BREAK_TIME);
      setTimerState('SHORT_BREAK_READY');
    }
  }

  function completeCountdown() {
    stopTimer();
    if (timerState() === 'POMO_COUNTDOWN') {
      setPomoCount(count => count + 1);
      if (pomoCount() % 4 === 0) {
        setTimerState('LONG_BREAK_READY');
      } else {
        setTimerState('SHORT_BREAK_READY');
      }
    } else {
      setTimerState('POMO_READY');
    }
  }

  function selectPomo() {
    stopTimer();
    setTimerState('POMO_READY');
    start();
  }

  function selectShortBreak() {
    stopTimer();
    setTimerState('SHORT_BREAK_READY');
    start();
  }

  function selectLongBreak() {
    stopTimer();
    setTimerState('LONG_BREAK_READY');
    start();
  }

  return (
    <div>
      <TimerSelectors
        timerState={timerState()}
        selectPomo={selectPomo}
        selectShortBreak={selectShortBreak}
        selectLongBreak={selectLongBreak}
      />
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
