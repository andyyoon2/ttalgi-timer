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
      <button onClick={() => props.resetTimer()}>Reset</button>
      <button onClick={() => props.toggleCountdown()}>{toggleLabel()}</button>
    </div>
  );
}
