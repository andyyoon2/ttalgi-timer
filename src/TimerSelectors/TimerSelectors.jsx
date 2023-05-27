import Button from '../Button/Button';
import './TimerSelectors.css';

export default function TimerSelectors(props) {
  return (
    <div>
      <Button
        class={props.timerType === 'POMO' ? 'fill' : 'outline'}
        onClick={() => props.selectTimerType('POMO')}
      >
        Pomodoro
      </Button>
      <Button
        class={props.timerType === 'SHORT_BREAK' ? 'fill' : 'outline'}
        onClick={() => props.selectTimerType('SHORT_BREAK')}
      >
        Short break
      </Button>
      <Button
        class={props.timerType === 'LONG_BREAK' ? 'fill' : 'outline'}
        onClick={() => props.selectTimerType('LONG_BREAK')}
      >
        Long break
      </Button>
    </div>
  );
}
