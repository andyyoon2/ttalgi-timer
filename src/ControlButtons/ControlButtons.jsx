import Button from '../Button/Button';
import './ControlButtons.css';

export default function ControlButtons(props) {
  const toggleLabel = () => {
    if (props.timerState === 'COUNTDOWN') {
      return 'Pause';
    } else {
      return 'Start';
    }
  };

  return (
    <div class="control-buttons">
      <Button class="start-btn fill" onClick={() => props.toggleCountdown()}>{toggleLabel()}</Button>
      <Button class="reset-btn outline" onClick={() => props.resetTimer()}>Reset</Button>
    </div>
  );
}
