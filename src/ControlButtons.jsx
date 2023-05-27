export default function ControlButtons(props) {
  const toggleLabel = () => props.timerState === 'COUNTDOWN' ? 'Pause' : 'Start';

  return (
    <div>
      <button onClick={() => props.resetTimer()}>Reset</button>
      <button onClick={() => props.toggleCountdown()}>{toggleLabel()}</button>
    </div>
  );
}
