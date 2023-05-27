import './TimerDisplay.css';

export default function TimerDisplay(props) {
  const min = () => Math.floor(props.time / 60);
  const sec = () => props.time % 60;
  const display = () => `${min() < 10 ? '0' : ''}${min()}:${sec() < 10 ? '0' : ''}${sec()}`;

  return (
    <div>
      <p class="display">{display()}</p>
    </div>
  );
}
