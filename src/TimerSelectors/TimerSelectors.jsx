import Button from '../Button/Button';
import './TimerSelectors.css';

export default function TimerSelectors(props) {
  return (
    <div>
      <Button onClick={() => props.startPomo()}>Pomodoro</Button>
      <Button>Short break</Button>
      <Button>Long break</Button>
    </div>
  );
}
