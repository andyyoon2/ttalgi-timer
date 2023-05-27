import { createEffect, createSignal, onCleanup } from 'solid-js';
import ControlButtons from './ControlButtons';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TimerSelectors from './TimerSelectors/TimerSelectors';

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
  'POMO': 25 * 60,
  'SHORT_BREAK': 5 * 60,
  'LONG_BREAK': 10 * 60,
};

export default function Timer() {
  const [time, setTime] = createSignal(0);
  const [pomoCount, setPomoCount] = createSignal(0);
  const [timerId, setTimerId] = createSignal(null);

  const [timerType, setTimerType] = createSignal('POMO');
  const [timerState, setTimerState] = createSignal('READY');

  createEffect(() => {
    switch (timerState()) {
      case 'READY':
        stopTimer();
        setTime(COUNTDOWN_TIMES[timerType()]);
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
    // TODO: Calculate drift to get most accurate timer
    setTimerId(
      setTimeout(() => {
        setTime(time => time - 1);
        if (time() === 0) {
          setPomoCount(c => c + 1);
          setTimerState('STOP'); // TODO: Optional advance to next step in pomo cycle
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

  function resetTimer() {
    setTimerState('READY');
  }

  function toggleCountdown() {
    if (timerState() === 'COUNTDOWN') {
      setTimerState('STOP');
    } else {
      setTimerState('COUNTDOWN');
    }
  }

  function selectCountdownType(type) {
    if (type !== 'POMO' && type !== 'SHORT_BREAK' && type !== 'LONG_BREAK') {
      console.error('Error: Invalid timer type.');
      return;
    }
    setTimerType(type);
    setTimerState('READY');
  }

  return (
    <div>
      <TimerSelectors selectCountdownType={selectCountdownType} />
      <TimerDisplay time={time()} />
      <ControlButtons
        timerState={timerState()}
        toggleCountdown={toggleCountdown}
        resetTimer={resetTimer}
      />
      <p>pomos today: {pomoCount()}</p>
    </div>
  );
}
