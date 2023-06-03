import { createEffect, createSignal, onCleanup } from 'solid-js';
import ControlButtons from '../ControlButtons/ControlButtons';
import TimerDisplay from '../TimerDisplay/TimerDisplay';
import TimerSelectors from '../TimerSelectors/TimerSelectors';
import './Timer.css';

/*
TIMER TYPE
POMO
SHORT_BREAK
LONG_BREAK

TIMER STATE
READY
COUNTDOWN
STOP
*/

const COUNTDOWN_TIMES = {
  POMO: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 10 * 60,
};

export default function Timer() {
  // Time displayed in the UI
  const [timeRemaining, setTimeRemaining] = createSignal(0);

  // Internal counters to compensate for CPU drift
  const [startTime, setStartTime] = createSignal(0);
  const [elapsedTime, setElapsedTime] = createSignal(0);

  const [pomoCount, setPomoCount] = createSignal(0); // TODO: Use localStorage for total count?
  const [timerId, setTimerId] = createSignal(null);

  const [timerType, setTimerType] = createSignal('POMO');
  const [timerState, setTimerState] = createSignal('READY');

  createEffect(() => {
    switch (timerState()) {
      case 'READY':
        stopTimer();
        setTimeRemaining(COUNTDOWN_TIMES[timerType()]);
        break;
      case 'COUNTDOWN':
        startTimer();
        break;
      case 'STOP':
        stopTimer();
        break;
      default:
        console.error('Error: Invalid timer state.');
        return;
    }
  });

  onCleanup(() => clearTimeout(timerId()));

  function startTimer() {
    if (timerId()) {
      return;
    }
    tick();
  }

  function tick() {
    // Calculate drift to get most accurate timer
    const drift = new Date().getTime() - startTime() - elapsedTime();
    const id = setTimeout(() => {
      setTimeRemaining(time => time - 1);
      setElapsedTime(time => time + 1000);
      if (timeRemaining() === 0) {
        setPomoCount(c => c + 1);
        setTimerState('STOP'); // TODO: Optional advance to next step in pomo cycle
        return;
      }
      tick();
    }, 1000 - drift);
    setTimerId(id);
  }

  function stopTimer() {
    clearTimeout(timerId());
    setTimerId(null);
  }

  function resetTimer() {
    setTimerState('READY');
  }

  function prepTimerStart() {
    setStartTime(new Date().getTime());
    setElapsedTime(0);
  }

  function toggleCountdown() {
    switch (timerState()) {
      case 'COUNTDOWN':
        setTimerState('STOP');
        break;
      case 'READY':
        prepTimerStart();
        setTimerState('COUNTDOWN');
        break;
      case 'STOP':
        if (timeRemaining() === 0) {
          resetTimer();
          prepTimerStart();
        }
        setTimerState('COUNTDOWN');
        break;
      default:
        console.error('Error: Invalid timer state.');
    }

  }

  function selectTimerType(type) {
    if (type !== 'POMO' && type !== 'SHORT_BREAK' && type !== 'LONG_BREAK') {
      console.error('Error: Invalid timer type.');
      return;
    }
    setTimerType(type);
    setTimerState('READY');
  }

  return (
    <div>
      <TimerSelectors
        timerType={timerType()}
        selectTimerType={selectTimerType}
      />
      <TimerDisplay
        timerState={timerState()}
        time={timeRemaining()}
      />
      <ControlButtons
        timerState={timerState()}
        toggleCountdown={toggleCountdown}
        resetTimer={resetTimer}
      />
      <p class="pomo-count">pomodoros completed: {pomoCount()}</p>
    </div>
  );
}
