import './TimerDisplay.css';

export default function TimerDisplay(props) {
  const minDisplay = () => {
    const min = Math.floor(props.time / 60);
    return `${min < 10 ? '0' : ''}${min}`;
  }
  const secDisplay = () => {
    const sec = props.time % 60;
    return `${sec < 10 ? '0' : ''}${sec}`;
  }

  return (
    <div>
      <p class="display">
        <span>{minDisplay()}</span>
        <span class="skinny-colon">:</span>
        <span>{secDisplay()}</span>
      </p>
    </div>
  );
}
