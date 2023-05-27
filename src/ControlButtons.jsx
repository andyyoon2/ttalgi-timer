import Button from './Button/Button';

export default function ControlButtons(props) {
  const toggleLabel = () => {
    if (props.timerState === 'POMO_COUNTDOWN' || props.timerState === 'BREAK_COUNTDOWN') {
      return 'Pause';
    } else {
      return 'Start';
    }
  };

  return (
    <div>
      <Button onClick={() => props.resetTimer()}>Reset</Button>
      <Button onClick={() => props.toggleCountdown()}>{toggleLabel()}</Button>
    </div>
  );
}
