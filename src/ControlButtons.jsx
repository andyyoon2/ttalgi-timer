import Button from './Button/Button';

export default function ControlButtons(props) {
  const toggleLabel = () => {
    if (props.timerState === 'COUNTDOWN') {
      return 'Pause';
    } else {
      return 'Start';
    }
  };

  return (
    <div>
      <Button class="fill" onClick={() => props.toggleCountdown()}>{toggleLabel()}</Button>
      <Button class="outline" onClick={() => props.resetTimer()}>Reset</Button>
    </div>
  );
}
