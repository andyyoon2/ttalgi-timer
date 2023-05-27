import Button from '../Button/Button';
import './TimerSelectors.css';

export default function TimerSelectors(props) {
  return (
    <div>
      <Button onClick={() => props.selectCountdownType('POMO')}>
        Pomodoro
      </Button>
      <Button onClick={() => props.selectCountdownType('SHORT_BREAK')}>
        Short break
      </Button>
      <Button onClick={() => props.selectCountdownType('LONG_BREAK')}>
        Long break
      </Button>
    </div>
  );
}
